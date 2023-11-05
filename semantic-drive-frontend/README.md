# Frontend for Semantic Drive

Nextjs app with MUI stylings

# Usage

### Warnings

- Use node v20

## Development

- `cp env.sample .env` and modify values
- `npm run dev`

## Build

### Locally

- `cp env.sample .env` and modify values
- `npm run build`

### Docker image

- `docker build .` (this builds the app on startup to include env vars)

## Deploy

- `cp env.sample .env` and modify values
- `docker run --env-file .env -d -it -p 3000:3000 sachiyer/sembox-site:latest`
