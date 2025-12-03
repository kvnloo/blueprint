#!/bin/bash

# Website Extractor Setup and Run Script

set -e

echo "🔧 Setting up Website Extractor..."

# Install Python dependencies
pip install -r requirements.txt --break-system-packages -q

# Install Playwright browsers
playwright install chromium

echo "✅ Setup complete!"
echo ""

# Run the extractor
if [ -n "$1" ]; then
    URL="$1"
else
    URL="https://www.aura.build/share/lumina-video"
fi

if [ -n "$2" ]; then
    OUTPUT="$2"
else
    OUTPUT="extracted_site"
fi

echo "🚀 Extracting: $URL"
echo "📁 Output: $OUTPUT"
echo ""

python extract_website.py "$URL" "$OUTPUT"
