"""Skyvern configuration for Blueprint website testing."""
import os
from pathlib import Path

# Load environment from .env file
from dotenv import load_dotenv
load_dotenv(Path(__file__).parent / ".env")

# Website configuration
BASE_URL = os.getenv("BASE_URL", "http://localhost:3000")
TIMEOUT = int(os.getenv("TIMEOUT", "30"))  # seconds

# Test output directory
OUTPUT_DIR = Path(__file__).parent / "results"
OUTPUT_DIR.mkdir(exist_ok=True)

# Skyvern settings
SKYVERN_API_URL = os.getenv("SKYVERN_API_URL", "http://localhost:8080")
