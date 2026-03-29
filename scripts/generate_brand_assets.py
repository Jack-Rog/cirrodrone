from __future__ import annotations

import shutil
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "ChatGPT Image Mar 27, 2026, 03_29_37 PM.png"
BRAND_DIR = ROOT / "public" / "brand"
APP_DIR = ROOT / "app"

FULL_LOGO_NAME = "cirro-logo-full.png"
FULL_LOGO_INVERSE_NAME = "cirro-logo-full-inverse.png"
SOURCE_COPY_NAME = "cirro-logo-source.png"

ART_ALPHA_FLOOR = 96
PRIMARY_TEXT = (16, 34, 51, 255)
ICON_TOP = (16, 28, 42, 255)
ICON_BOTTOM = (36, 65, 94, 255)
ICON_GLOW = (102, 151, 193, 94)
ICON_MARK = (248, 251, 255, 255)
MARK_WHITE = (255, 255, 255, 255)


def threshold_alpha(image: Image.Image, threshold: int = ART_ALPHA_FLOOR) -> Image.Image:
    return image.getchannel("A").point(lambda value: 0 if value < threshold else value)


def extract_mark(source_image: Image.Image) -> Image.Image:
    cleaned = source_image.convert("RGBA").copy()
    alpha = threshold_alpha(cleaned)
    bbox = alpha.getbbox()

    if bbox is None:
        raise RuntimeError("Could not isolate visible artwork from source logo.")

    cleaned.putalpha(alpha)
    return cleaned.crop(bbox)


def fit_within(image: Image.Image, max_width: int, max_height: int) -> Image.Image:
    scale = min(max_width / image.width, max_height / image.height)
    width = max(1, round(image.width * scale))
    height = max(1, round(image.height * scale))
    return image.resize((width, height), Image.Resampling.LANCZOS)


def recolor(image: Image.Image, rgba: tuple[int, int, int, int]) -> Image.Image:
    recolored = Image.new("RGBA", image.size, rgba)
    recolored.putalpha(image.getchannel("A"))
    return recolored


def load_wordmark_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    font_candidates = (
        Path("C:/Windows/Fonts/segoeuib.ttf"),
        Path("C:/Windows/Fonts/arialbd.ttf"),
        Path("C:/Windows/Fonts/Arialbd.ttf"),
    )

    for candidate in font_candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size)

    try:
        return ImageFont.truetype("DejaVuSans-Bold.ttf", size)
    except OSError:
        return ImageFont.load_default()


def make_wordmark(
    mark: Image.Image,
    *,
    mark_color: tuple[int, int, int, int] | None,
    text_color: tuple[int, int, int, int],
) -> Image.Image:
    word = "Cirro"
    font = load_wordmark_font(188)
    scratch = Image.new("RGBA", (1, 1), (0, 0, 0, 0))
    draw = ImageDraw.Draw(scratch)
    text_bbox = draw.textbbox((0, 0), word, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]

    mark_image = recolor(mark, mark_color) if mark_color else mark.copy()
    mark_image = fit_within(mark_image, max_width=310, max_height=122)

    gap = 34
    padding_x = 24
    padding_y = 22
    baseline_height = max(mark_image.height, text_height)
    canvas_width = padding_x * 2 + mark_image.width + gap + text_width
    canvas_height = padding_y * 2 + baseline_height

    canvas = Image.new("RGBA", (canvas_width, canvas_height), (0, 0, 0, 0))
    mark_y = round((canvas_height - mark_image.height) * 0.5)
    canvas.alpha_composite(mark_image, (padding_x, mark_y))

    draw = ImageDraw.Draw(canvas)
    text_x = padding_x + mark_image.width + gap
    text_y = round((canvas_height - text_height) * 0.5) - text_bbox[1]
    draw.text((text_x, text_y), word, font=font, fill=text_color)

    return canvas


def make_lockup(wordmark: Image.Image, background: tuple[int, int, int, int]) -> Image.Image:
    canvas = Image.new("RGBA", (1400, 420), background)
    resized = fit_within(wordmark, max_width=1120, max_height=180)
    x = (canvas.width - resized.width) // 2
    y = (canvas.height - resized.height) // 2
    canvas.alpha_composite(resized, (x, y))
    return canvas


def make_mark_square(mark: Image.Image, size: int, *, color: tuple[int, int, int, int] | None = None) -> Image.Image:
    mark_image = recolor(mark, color) if color else mark.copy()
    mark_image = fit_within(mark_image, max_width=round(size * 0.9), max_height=round(size * 0.46))
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    x = (size - mark_image.width) // 2
    y = (size - mark_image.height) // 2
    canvas.alpha_composite(mark_image, (x, y))
    return canvas


def lerp_channel(start: int, end: int, t: float) -> int:
    return round(start + (end - start) * t)


def make_app_icon(mark: Image.Image, size: int = 512) -> Image.Image:
    gradient = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    pixels = gradient.load()

    for y in range(size):
        t = y / max(size - 1, 1)
        r = lerp_channel(ICON_TOP[0], ICON_BOTTOM[0], t)
        g = lerp_channel(ICON_TOP[1], ICON_BOTTOM[1], t)
        b = lerp_channel(ICON_TOP[2], ICON_BOTTOM[2], t)
        for x in range(size):
            pixels[x, y] = (r, g, b, 255)

    rounded_mask = Image.new("L", (size, size), 0)
    mask_draw = ImageDraw.Draw(rounded_mask)
    inset = round(size * 0.06)
    mask_draw.rounded_rectangle(
        (inset, inset, size - inset, size - inset),
        radius=round(size * 0.24),
        fill=255,
    )

    icon = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    icon.paste(gradient, mask=rounded_mask)

    glow = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.ellipse(
        (round(size * 0.16), round(size * 0.12), round(size * 0.86), round(size * 0.76)),
        fill=ICON_GLOW,
    )
    glow = glow.filter(ImageFilter.GaussianBlur(radius=round(size * 0.05)))
    icon.alpha_composite(glow)

    mark_image = fit_within(recolor(mark, ICON_MARK), max_width=round(size * 0.86), max_height=round(size * 0.45))
    shadow = recolor(mark_image, (66, 118, 168, 255))
    shadow.putalpha(shadow.getchannel("A").point(lambda value: round(value * 0.36)))
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=max(1, round(size * 0.015))))

    x = (size - mark_image.width) // 2
    y = (size - mark_image.height) // 2
    icon.alpha_composite(shadow, (x, y + round(size * 0.016)))
    icon.alpha_composite(mark_image, (x, y))

    highlight = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    highlight_draw = ImageDraw.Draw(highlight)
    highlight_draw.ellipse(
        (round(size * 0.12), round(size * 0.08), round(size * 0.58), round(size * 0.48)),
        fill=(255, 255, 255, 18),
    )
    highlight = highlight.filter(ImageFilter.GaussianBlur(radius=round(size * 0.015)))
    icon.alpha_composite(highlight)

    return icon


def save_png(image: Image.Image, path: Path) -> None:
    image.save(path, format="PNG")


def generate() -> None:
    if not SOURCE.exists():
        raise FileNotFoundError(f"Source logo not found: {SOURCE}")

    BRAND_DIR.mkdir(parents=True, exist_ok=True)

    source_image = Image.open(SOURCE).convert("RGBA")
    mark = extract_mark(source_image)
    wordmark_primary = make_wordmark(mark, mark_color=None, text_color=PRIMARY_TEXT)
    wordmark_inverse = make_wordmark(mark, mark_color=MARK_WHITE, text_color=MARK_WHITE)
    mark_square = make_mark_square(mark, 512)
    mark_square_white = make_mark_square(mark, 512, color=MARK_WHITE)
    app_icon = make_app_icon(mark, 512)

    shutil.copyfile(SOURCE, BRAND_DIR / SOURCE_COPY_NAME)

    save_png(wordmark_primary, BRAND_DIR / FULL_LOGO_NAME)
    save_png(fit_within(wordmark_primary, 1024, 340), BRAND_DIR / "cirro-logo-full-1024.png")
    save_png(fit_within(wordmark_primary, 512, 190), BRAND_DIR / "cirro-logo-full-512.png")
    save_png(wordmark_inverse, BRAND_DIR / FULL_LOGO_INVERSE_NAME)
    save_png(make_lockup(wordmark_primary, (255, 255, 255, 255)), BRAND_DIR / "cirro-logo-lockup-light.png")
    save_png(make_lockup(wordmark_inverse, (15, 31, 47, 255)), BRAND_DIR / "cirro-logo-lockup-dark.png")

    save_png(mark_square, BRAND_DIR / "cirro-mark-512.png")
    save_png(mark_square_white, BRAND_DIR / "cirro-mark-white.png")

    for size in (192, 180, 96, 48, 32, 16):
        save_png(mark_square.resize((size, size), Image.Resampling.LANCZOS), BRAND_DIR / f"cirro-mark-{size}.png")

    save_png(app_icon, BRAND_DIR / "cirro-app-icon-512.png")
    save_png(app_icon.resize((512, 512), Image.Resampling.LANCZOS), BRAND_DIR / "android-chrome-512x512.png")
    save_png(app_icon.resize((192, 192), Image.Resampling.LANCZOS), BRAND_DIR / "android-chrome-192x192.png")
    save_png(app_icon.resize((180, 180), Image.Resampling.LANCZOS), BRAND_DIR / "apple-touch-icon.png")
    save_png(app_icon.resize((32, 32), Image.Resampling.LANCZOS), BRAND_DIR / "favicon-32x32.png")
    save_png(app_icon.resize((16, 16), Image.Resampling.LANCZOS), BRAND_DIR / "favicon-16x16.png")

    app_icon.save(
        APP_DIR / "favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
    )

    print("Generated brand assets:")
    for path in sorted(BRAND_DIR.iterdir()):
        print(f"- {path.relative_to(ROOT)}")
    print(f"- {(APP_DIR / 'favicon.ico').relative_to(ROOT)}")


if __name__ == "__main__":
    generate()
