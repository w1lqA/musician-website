# core/utils.py

def get_absolute_url(path):
    if not path:
        return ''
    return path