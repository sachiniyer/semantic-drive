FROM python:3.9-slim-buster

RUN apt-get update && apt-get install -y \
    pkg-config \
    cmake \
    ffmpeg

WORKDIR /app
RUN python -m pip install --upgrade pip
COPY requirements.txt /app

RUN pip install -r requirements.txt
COPY . /app
RUN mkdir /app/files

ENTRYPOINT ["python3"]
CMD ["app.py"]
