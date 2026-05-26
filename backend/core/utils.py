# core/utils.py
from django.conf import settings

def get_absolute_url(path):
    """возвращает абсолютный url для медиафайлов"""
    if not path:
        return ''
    if path.startswith('http://') or path.startswith('https://'):
        return path
    return f"{settings.BASE_URL}{path}"
