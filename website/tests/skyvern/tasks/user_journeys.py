"""User journey tests using Skyvern AI automation."""
import asyncio
from skyvern import Skyvern

import sys
sys.path.insert(0, str(__file__.parent.parent))
from config import BASE_URL, TIMEOUT


async def test_browse_and_read_article():
    """Test the complete journey of browsing and reading an article."""
    skyvern = Skyvern()

    task = await skyvern.run_task(
        url=BASE_URL,
        prompt="""
        Complete this user journey:
        1. Navigate to the Research Hub or articles section
        2. Find and click on any article
        3. Read through the article (scroll to see content)
        4. Look for any interactive elements like visualizations or diagrams
        5. Navigate back to the article list

        Report on the article you read and what you found.
        """,
        timeout=TIMEOUT * 3,
        data_extraction_schema={
            "type": "object",
            "properties": {
                "article_title": {
                    "type": "string",
                    "description": "Title of the article read"
                },
                "has_visualizations": {
                    "type": "boolean",
                    "description": "Whether the article had interactive visualizations"
                },
                "navigation_successful": {
                    "type": "boolean",
                    "description": "Whether back navigation worked"
                }
            }
        }
    )

    return task


async def test_explore_services():
    """Test exploring the services/offerings section."""
    skyvern = Skyvern()

    task = await skyvern.run_task(
        url=BASE_URL,
        prompt="""
        Explore the services or offerings on this website:
        1. Find the section that describes what services or products are offered
        2. Click on any "Learn More" or detail links
        3. Review the information provided
        4. Return to the main page

        Summarize what services you found.
        """,
        timeout=TIMEOUT * 2,
        data_extraction_schema={
            "type": "object",
            "properties": {
                "services_found": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "List of services/offerings identified"
                }
            }
        }
    )

    return task


async def test_mobile_experience():
    """Test the website experience at mobile viewport."""
    skyvern = Skyvern()

    task = await skyvern.run_task(
        url=BASE_URL,
        prompt="""
        Test this website as if on a mobile device:
        1. Look for a mobile menu (hamburger icon)
        2. Open the mobile menu if present
        3. Navigate to a few sections
        4. Scroll through content
        5. Check if content is readable and accessible

        Report on the mobile experience.
        """,
        timeout=TIMEOUT * 2,
        viewport={"width": 375, "height": 812},  # iPhone X dimensions
        data_extraction_schema={
            "type": "object",
            "properties": {
                "has_mobile_menu": {
                    "type": "boolean",
                    "description": "Whether a mobile menu was found"
                },
                "mobile_navigation_works": {
                    "type": "boolean",
                    "description": "Whether mobile navigation functions correctly"
                },
                "content_readable": {
                    "type": "boolean",
                    "description": "Whether content is readable on mobile"
                }
            }
        }
    )

    return task


async def test_full_site_exploration():
    """Comprehensive test exploring all major site sections."""
    skyvern = Skyvern()

    task = await skyvern.run_task(
        url=BASE_URL,
        prompt="""
        Perform a comprehensive exploration of this website:
        1. Start at the home page and identify the main purpose of the site
        2. Navigate to each major section
        3. Look for any forms, interactive elements, or CTAs
        4. Check the footer for additional links
        5. Note any issues or broken elements you find

        Provide a summary of your exploration.
        """,
        timeout=TIMEOUT * 4,
        data_extraction_schema={
            "type": "object",
            "properties": {
                "site_purpose": {
                    "type": "string",
                    "description": "Main purpose of the website"
                },
                "major_sections": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "List of major sections found"
                },
                "interactive_elements": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "Interactive elements found"
                },
                "issues_found": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "Any issues or broken elements"
                }
            }
        }
    )

    return task


if __name__ == "__main__":
    # Run a specific test
    asyncio.run(test_browse_and_read_article())
