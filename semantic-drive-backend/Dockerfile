FROM --platform=$BUILDPLATFORM python:3.10-slim-buster

RUN apt-get update && apt-get install -y \
    pkg-config \
    cmake

WORKDIR /app
RUN python -m pip install --upgrade pip
COPY requirements.txt /app
RUN pip3 install -U flask \
    flask_cors \
    requests \
    psycopg2-binary \
    python-dotenv \
    'transformers[torch]' \
    pillow \
    sentence_transformers

COPY . /app

ENTRYPOINT ["python3"]
CMD ["app.py"]
