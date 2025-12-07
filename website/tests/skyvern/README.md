# Skyvern E2E Testing

AI-powered browser automation tests using [Skyvern](https://github.com/Skyvern-AI/skyvern) with Ollama for local LLM inference.

## Prerequisites

- Python 3.11+
- [Ollama](https://ollama.ai/) installed
- ~8GB RAM for LLM inference

## Setup

### 1. Install Ollama

```bash
# macOS
brew install ollama

# Linux
curl -fsSL https://ollama.ai/install.sh | sh
```

### 2. Pull the LLM Model

```bash
ollama pull llama3.1
```

### 3. Start Ollama Server

```bash
ollama serve
```

### 4. Install Skyvern

```bash
pip install skyvern python-dotenv
skyvern quickstart
```

### 5. Start Skyvern

```bash
# Start both server and UI
skyvern run all

# Or just the server
skyvern run server
```

Access the UI at http://localhost:8080

## Running Tests

### Start the Website First

```bash
cd ../src
npm run dev
```

### Run Individual Tests

```bash
# From tests/skyvern directory
python tasks/navigation.py
python tasks/user_journeys.py
```

### Run All Tests with Pytest

```bash
pip install pytest pytest-asyncio
cd tests/skyvern
python -m pytest tasks/ -v
```

## Test Files

| File | Description |
|------|-------------|
| `tasks/navigation.py` | Tests menu navigation, page transitions, scroll behavior |
| `tasks/user_journeys.py` | Tests complete user workflows like browsing articles |

## Configuration

Edit `.env` to customize:

```bash
# LLM Settings
OLLAMA_MODEL=llama3.1  # Or llama3.2, mistral, etc.

# Website
BASE_URL=http://localhost:3000
TIMEOUT=30
```

## How It Works

Skyvern uses AI to:
1. Understand natural language test instructions
2. Identify UI elements visually (not just by selectors)
3. Navigate and interact with the website
4. Extract structured data from the results

This complements Playwright tests by handling:
- Dynamic content that's hard to select
- Visual/layout-based interactions
- Exploratory testing scenarios

## Writing New Tests

```python
from skyvern import Skyvern

async def test_example():
    skyvern = Skyvern()

    task = await skyvern.run_task(
        url="http://localhost:3000",
        prompt="Navigate to the About page and find the team section",
        timeout=30,
        data_extraction_schema={
            "type": "object",
            "properties": {
                "team_members": {
                    "type": "array",
                    "items": {"type": "string"}
                }
            }
        }
    )

    return task
```

## Troubleshooting

### Ollama not responding
```bash
# Check if running
curl http://localhost:11434/api/tags

# Restart
ollama serve
```

### Skyvern connection issues
```bash
# Check status
skyvern status

# Restart
skyvern stop all
skyvern run all
```

### Low memory
Use a smaller model:
```bash
ollama pull llama3.2:3b
# Update .env: OLLAMA_MODEL=llama3.2:3b
```
