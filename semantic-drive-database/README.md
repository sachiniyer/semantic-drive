# Database for Semantic Drive

Postgres database

# Usage

## Build

- `docker build .`

## Deploy

- `cp env.sample .env`
- `docker run --env-file .env -d -it -p 5432:5432 sachiyer/sembox-db:latest`
