FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Устанавливаем системные зависимости
RUN apt-get update && \
    apt-get install -y gcc libpq-dev && \
    apt-get clean

# Копируем requirements и устанавливаем Python-зависимости
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Копируем весь проект
COPY . /app/