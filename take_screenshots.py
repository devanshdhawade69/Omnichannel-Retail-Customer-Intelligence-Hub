import asyncio
from playwright.async_api import async_playwright
import os

ARTIFACT_DIR = "C:/Users/devan/.gemini/antigravity/brain/8a0fe10b-41c4-4f83-8ea4-6bdb984d2525"
BASE_URL = "http://localhost:5174"

pages_to_capture = [
    {"path": "/", "name": "home_page"},
    {"path": "/admin", "name": "admin_overview"},
    {"path": "/admin/regression", "name": "regression_engine"},
    {"path": "/admin/clustering", "name": "clustering_engine"},
    {"path": "/admin/classification", "name": "classification_engine"},
    {"path": "/admin/association", "name": "association_engine"},
]

async def take_screenshots():
    print("Starting browser...")
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1280, "height": 800})
        
        for item in pages_to_capture:
            url = f"{BASE_URL}{item['path']}"
            print(f"Navigating to {url}...")
            await page.goto(url, wait_until="load", timeout=60000)
            
            # Wait a little bit for any animations or data fetching
            await page.wait_for_timeout(5000)
            
            filename = os.path.join(ARTIFACT_DIR, f"{item['name']}.png")
            print(f"Saving screenshot to {filename}...")
            await page.screenshot(path=filename, full_page=True)
            
        await browser.close()
    print("Done!")

if __name__ == "__main__":
    asyncio.run(take_screenshots())
