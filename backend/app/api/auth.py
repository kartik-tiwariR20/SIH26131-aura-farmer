from fastapi import APIRouter, Depends, HTTPException, status, Header
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models import User
from app.schemas import UserRegister, UserLogin, TokenPair, UserOut
from app.utils.auth import get_password_hash, verify_password, create_access_token, create_refresh_token, decode_token
from app.utils.response import success_response, error_response

router = APIRouter()


async def get_current_user(
    authorization: str = Header(None),
    db: AsyncSession = Depends(get_db)
) -> User:
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")
    scheme, _, token = authorization.partition(" ")
    if scheme.lower() != "bearer":
        raise HTTPException(status_code=401, detail="Invalid authentication scheme")
    payload = decode_token(token)
    if not payload or payload.get("type") != "access":
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    user_id = payload.get("sub")
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user


def require_role(*roles):
    async def role_checker(current_user: User = Depends(get_current_user)):
        if current_user.role.value not in roles:
            raise HTTPException(status_code=403, detail="Insufficient permissions")
        return current_user
    return role_checker


@router.post("/register")
async def register(payload: UserRegister, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == payload.email))
    existing = result.scalar_one_or_none()
    if existing:
        return error_response("EMAIL_EXISTS", "An account with this email already exists.", 409)

    user = User(
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        password_hash=get_password_hash(payload.password),
        role=payload.role,
        language=payload.language,
    )
    db.add(user)
    await db.flush()
    await db.refresh(user)

    access_token = create_access_token({"sub": str(user.id), "role": user.role.value})
    refresh_token = create_refresh_token({"sub": str(user.id)})

    return success_response(
        data={
            "user": UserOut.model_validate(user).model_dump(),
            "tokens": {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"},
        },
        message="Registration successful",
        status_code=201,
    )


@router.post("/login")
async def login(payload: UserLogin, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == payload.email))
    user = result.scalar_one_or_none()
    if not user or not verify_password(payload.password, user.password_hash):
        return error_response("INVALID_CREDENTIALS", "Invalid email or password.", 401)

    access_token = create_access_token({"sub": str(user.id), "role": user.role.value})
    refresh_token = create_refresh_token({"sub": str(user.id)})

    return success_response(
        data={
            "user": UserOut.model_validate(user).model_dump(),
            "tokens": {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"},
        },
        message="Login successful",
    )


@router.post("/refresh")
async def refresh_token(refresh_token: str, db: AsyncSession = Depends(get_db)):
    payload = decode_token(refresh_token)
    if not payload or payload.get("type") != "refresh":
        return error_response("INVALID_TOKEN", "Invalid or expired refresh token.", 401)

    user_id = payload.get("sub")
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        return error_response("USER_NOT_FOUND", "User not found.", 404)

    access_token = create_access_token({"sub": str(user.id), "role": user.role.value})
    new_refresh_token = create_refresh_token({"sub": str(user.id)})

    return success_response(
        data={"access_token": access_token, "refresh_token": new_refresh_token, "token_type": "bearer"},
    )


@router.get("/me")
async def get_me(current_user: User = Depends(get_current_user)):
    return success_response(data=UserOut.model_validate(current_user).model_dump())
