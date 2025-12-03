#!/bin/bash

# Website Cloner - Comprehensive site capture tool
# Usage: ./clone_website.sh <url> [output_dir]

set -e

URL="${1:-https://www.aura.build/share/lumina-video}"
OUTPUT_DIR="${2:-cloned_site}"

echo "======================================"
echo "  Comprehensive Website Cloner"
echo "======================================"
echo ""
echo "Target URL: $URL"
echo "Output Dir: $OUTPUT_DIR"
echo ""

# Check for Python
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is required"
    exit 1
fi

# Install dependencies
echo "[1/3] Installing dependencies..."
pip install playwright aiohttp --quiet --break-system-packages 2>/dev/null || pip install playwright aiohttp --quiet

# Install Playwright browsers
echo "[2/3] Installing Playwright browsers..."
python3 -m playwright install chromium --quiet 2>/dev/null || python3 -m playwright install chromium

# Run the cloner
echo "[3/3] Starting website clone..."
echo ""
python3 website_cloner.py "$URL" "$OUTPUT_DIR"

echo ""
echo "======================================"
echo "  Clone Complete!"
echo "======================================"
echo ""
echo "Key files:"
echo "  - $OUTPUT_DIR/index.html"
echo "  - $OUTPUT_DIR/screenshot_full.png"
echo "  - $OUTPUT_DIR/data/design_tokens.json"
echo "  - $OUTPUT_DIR/data/asset_manifest.json"
echo "  - $OUTPUT_DIR/ANALYSIS_REPORT.md"
echo ""
