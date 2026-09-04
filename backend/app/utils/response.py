from typing import Any, Optional
from fastapi.responses import JSONResponse


def success_response(data: Any = None, message: Optional[str] = None, status_code: int = 200):
    return JSONResponse(
        status_code=status_code,
        content={"success": True, "data": data, "message": message}
    )


def error_response(error_code: str, message: str, status_code: int = 400):
    return JSONResponse(
        status_code=status_code,
        content={"success": False, "error": {"code": error_code, "message": message}}
    )
