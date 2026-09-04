import os
import uuid
from PIL import Image
import io

UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

class StorageService:
    @staticmethod
    async def upload_image(file_bytes: bytes, filename: str = "crop.jpg") -> str:
        """
        Saves uploaded crop image locally and returns URL path.
        In production, this can seamlessly route to AWS S3 or Cloudflare R2.
        """
        file_id = str(uuid.uuid4())[:8]
        ext = filename.split(".")[-1] if "." in filename else "jpg"
        save_filename = f"{file_id}_{filename.replace(' ', '_')}"
        file_path = os.path.join(UPLOAD_DIR, save_filename)

        try:
            # Compress image to optimize for low-bandwidth mobile environments
            img = Image.open(io.BytesIO(file_bytes))
            img.thumbnail((1024, 1024))
            img.save(file_path, quality=85, optimize=True)
        except Exception:
            with open(file_path, "wb") as f:
                f.write(file_bytes)

        return f"/uploads/{save_filename}"
