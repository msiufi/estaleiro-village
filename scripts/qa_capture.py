import sys
from playwright.sync_api import sync_playwright

SCREENSHOTS_DIR = r"C:\Maxi\EV\estaleiro-village\screenshots"

PAGES = [
    # (url, filename, viewport_width, viewport_height, full_page)
    ("http://localhost:3000/a-pousada",                    "a-pousada-desktop.png",    1920, 1080, True),
    ("http://localhost:3000/a-pousada",                    "a-pousada-mobile.png",      375,  812, True),
    ("http://localhost:3000/acomodacoes",                  "acomodacoes-desktop.png",  1920, 1080, True),
    ("http://localhost:3000/acomodacoes/suite-jardim",     "suite-jardim-desktop.png", 1920, 1080, True),
    ("http://localhost:3000/acomodacoes/torre-oceano",     "torre-oceano-desktop.png", 1920, 1080, True),
    ("http://localhost:3000/galeria",                      "galeria-desktop.png",      1920, 1080, True),
]

def main():
    import os
    os.makedirs(SCREENSHOTS_DIR, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for url, filename, w, h, full_page in PAGES:
            output_path = os.path.join(SCREENSHOTS_DIR, filename)
            print(f"Capturing {url} at {w}x{h} -> {output_path}")
            try:
                page = browser.new_page(viewport={'width': w, 'height': h})
                page.goto(url, wait_until='networkidle', timeout=30000)
                page.wait_for_timeout(2000)
                page.screenshot(path=output_path, full_page=full_page)
                page.close()
                print(f"  OK: {output_path}")
            except Exception as e:
                print(f"  ERROR: {e}")
        browser.close()
    print("Done.")

if __name__ == "__main__":
    main()
