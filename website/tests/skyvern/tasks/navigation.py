"""Navigation flow tests using Skyvern AI automation."""
import asyncio
from skyvern import Skyvern

import sys
sys.path.insert(0, str(__file__.parent.parent))
from config import BASE_URL, TIMEOUT


async def test_navigate_to_research_hub():
    """Test navigating to the Research Hub section."""
    skyvern = Skyvern()

    task = await skyvern.run_task(
        url=BASE_URL,
        prompt="""
        Navigate to the Research Hub section of this website.
        Look for a link or button that says "Research", "Research Hub", or similar.
        Click on it and confirm you have reached the Research Hub page.
        """,
        timeout=TIMEOUT,
    )

    return task


async def test_navigate_menu_items():
    """Test clicking through all main menu items."""
    skyvern = Skyvern()

    task = await skyvern.run_task(
        url=BASE_URL,
        prompt="""
        Find the main navigation menu on this website.
        Click through each menu item one by one.
        For each item, wait for the page to load and verify the navigation worked.
        Report which menu items you found and clicked.
        """,
        timeout=TIMEOUT * 2,
        data_extraction_schema={
            "type": "object",
            "properties": {
                "menu_items": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "List of menu items found and clicked"
                },
                "navigation_successful": {
                    "type": "boolean",
                    "description": "Whether all navigations were successful"
                }
            }
        }
    )

    return task


async def test_scroll_navigation():
    """Test scroll-based navigation and section anchors."""
    skyvern = Skyvern()

    task = await skyvern.run_task(
        url=BASE_URL,
        prompt="""
        Scroll down through the entire home page.
        Identify all the main sections as you scroll.
        If there are any anchor links that scroll to sections, test them.
        Report what sections you found.
        """,
        timeout=TIMEOUT,
        data_extraction_schema={
            "type": "object",
            "properties": {
                "sections_found": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "List of page sections identified"
                }
            }
        }
    )

    return task


if __name__ == "__main__":
    # Run tests directly
    asyncio.run(test_navigate_to_research_hub())
