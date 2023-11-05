# Backend for Semantic drive

Flask app, which uses huggingface transformers

- Search: msmarco embeddings with consine similarity of temrs vs summaries
- Summary text: bart
- Summary image: blip
- Summary audio: openai whisper, then bart

# Usage

## Development

### Warnings

- Use python 3.9
- Deploy the db first

### Instructions

- `pip install -r requirements.txt`
- `cp env.sample .env` and modify values
- `python app.py`

## Build

- `docker build .`

## Deploy

- `cp env.sample .env` and modify values
- `docker run --env-file .env -d -it -p 8000:8000 sachiyer/sembox-api:latest`
