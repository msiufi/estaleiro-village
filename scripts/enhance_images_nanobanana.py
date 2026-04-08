import base64
import mimetypes
import os
import shutil
from pathlib import Path

from PIL import Image

from nanobanana_mcp_server.config.settings import GeminiConfig, ServerConfig
from nanobanana_mcp_server.services import (
    get_image_service,
    get_nb2_image_service,
    get_pro_image_service,
    initialize_services,
)

ROOT = Path(r"C:\Maxi\EV\estaleiro-village")
IMAGES_DIR = ROOT / "public" / "assets" / "images"
BACKUP_DIR = IMAGES_DIR / ".backup-originals"
TEMP_DIR = IMAGES_DIR / ".nanobanana-tmp"

INSTRUCTION = (
    "Enhance this hotel website photo for production web quality. "
    "Increase perceived sharpness, reduce compression artifacts and noise, "
    "improve local contrast, and upscale resolution while preserving the exact "
    "composition, camera angle, scene layout, colors, and subject identity. "
    "Do not add or remove objects, text, logos, people, or architectural elements."
)

VALID_EXTS = {".jpg", ".jpeg", ".png", ".webp"}


def image_files() -> list[Path]:
    files = [
        p for p in sorted(IMAGES_DIR.iterdir()) if p.is_file() and p.suffix.lower() in VALID_EXTS
    ]
    return files


def save_converted(src_generated: Path, dest_original: Path) -> tuple[int, int]:
    with Image.open(src_generated) as im:
        width, height = im.size

        if dest_original.suffix.lower() in {".jpg", ".jpeg"}:
            rgb = im.convert("RGB")
            rgb.save(dest_original, format="JPEG", quality=92, optimize=True, progressive=True)
        elif dest_original.suffix.lower() == ".png":
            im.save(dest_original, format="PNG", optimize=True)
        elif dest_original.suffix.lower() == ".webp":
            im.save(dest_original, format="WEBP", quality=90, method=6)
        else:
            im.save(dest_original)

    return width, height


def main() -> None:
    if not os.getenv("GEMINI_API_KEY") and not os.getenv("GOOGLE_API_KEY"):
        raise RuntimeError("Set GEMINI_API_KEY or GOOGLE_API_KEY before running this script.")

    BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    TEMP_DIR.mkdir(parents=True, exist_ok=True)

    server_config = ServerConfig.from_env()
    gemini_config = GeminiConfig()
    initialize_services(server_config, gemini_config)
    requested_model = os.getenv("NANOBANANA_MODEL", "nb2").strip().lower()
    if requested_model == "flash":
        service = get_image_service()
    elif requested_model == "pro":
        service = get_pro_image_service()
    else:
        service = get_nb2_image_service()

    files = image_files()
    print(f"Found {len(files)} images in {IMAGES_DIR}")

    for i, path in enumerate(files, start=1):
        print(f"[{i}/{len(files)}] Enhancing {path.name} ...")
        backup_path = BACKUP_DIR / path.name
        if not backup_path.exists():
            shutil.copy2(path, backup_path)

        mime_type, _ = mimetypes.guess_type(path.name)
        if not mime_type:
            mime_type = "image/jpeg"

        with path.open("rb") as f:
            b64 = base64.b64encode(f.read()).decode("utf-8")

        temp_output = TEMP_DIR / f"{path.stem}.png"

        if requested_model == "flash":
            _images, metadata = service.edit_image(
                INSTRUCTION,
                base_image_b64=b64,
                mime_type=mime_type,
            )
        else:
            _images, metadata = service.edit_images(
                INSTRUCTION,
                base_image_b64=b64,
                mime_type=mime_type,
                output_path=str(temp_output),
                use_storage=False,
            )

        if not metadata:
            raise RuntimeError(f"No output metadata returned for {path.name}")

        full_path = metadata[0].get("full_path")
        if not full_path:
            raise RuntimeError(f"No full_path in metadata for {path.name}")

        generated_path = Path(full_path)
        if not generated_path.exists():
            raise FileNotFoundError(f"Generated file not found: {generated_path}")

        new_w, new_h = save_converted(generated_path, path)
        print(f"  -> replaced {path.name} ({new_w}x{new_h})")

    print("Done. Originals backed up in:", BACKUP_DIR)


if __name__ == "__main__":
    main()
