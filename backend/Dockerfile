FROM python:3.11-slim

# Установка системных зависимостей для сборки psycopg2 и Pillow
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    libjpeg-dev \
    zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Отключаем буферизацию логов и генерацию pyc-файлов
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Установка зависимостей Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копирование исходного кода
COPY . .

# Собираем статику через whitenoise (требует секретный ключ, ставим временную заглушку)
RUN DJANGO_SECRET_KEY=temporary_key_for_build python manage.py collectstatic --noinput

# Открываем порт gunicorn
EXPOSE 8000

# Запуск бэкенда
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]
