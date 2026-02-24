import uuid
from django.db import models
from django.conf import settings
from django.contrib import admin 

class Release(models.Model):
    RELEASE_TYPES = [
        ('album', 'Альбом'),
        ('single', 'Сингл'),
        ('ep', 'EP'),
    ]
    
    id = models.UUIDField(
        primary_key=True, 
        default=uuid.uuid4, 
        editable=False,
        verbose_name='ID'
    )
    title = models.CharField(
        max_length=200,
        verbose_name='Название'
    )
    artist = models.CharField(
        max_length=100, 
        default='ẃ1lq',
        verbose_name='Исполнитель'
    )
    release_date = models.DateField(
        verbose_name='Дата релиза'
    )
    cover_url = models.URLField(
        max_length=500, 
        blank=True,
        verbose_name='URL обложки'
    )
    description = models.TextField(
        blank=True,
        verbose_name='Описание'
    )
    type = models.CharField(
        max_length=10, 
        choices=RELEASE_TYPES, 
        default='single',
        verbose_name='Тип'
    )
    is_featured = models.BooleanField(
        default=False,
        verbose_name='В рекомендациях'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Дата добавления'
    )
    
    class Meta:
        verbose_name = 'Релиз'
        verbose_name_plural = 'Релизы'
        ordering = ['-release_date']
    
    def __str__(self):
        return f"{self.artist} - {self.title}"
    
    @admin.display(description='Количество треков')
    def track_count(self):
        return self.tracks.count()


class Track(models.Model):
    id = models.UUIDField(
        primary_key=True, 
        default=uuid.uuid4, 
        editable=False,
        verbose_name='ID'
    )
    release = models.ForeignKey(
        Release, 
        on_delete=models.CASCADE, 
        related_name='tracks',
        verbose_name='Релиз'
    )
    title = models.CharField(
        max_length=200,
        verbose_name='Название'
    )
    duration_seconds = models.IntegerField(
        help_text="Длина трека в секундах",
        verbose_name='Длительность (сек)'
    )
    audio_url = models.URLField(
        max_length=500, 
        blank=True,
        verbose_name='URL аудио'
    )
    track_number = models.IntegerField(
        verbose_name='Номер трека'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Дата добавления'
    )
    
    class Meta:
        verbose_name = 'Трек'
        verbose_name_plural = 'Треки'
        ordering = ['track_number']
        unique_together = ['release', 'track_number']
    
    def __str__(self):
        return f"{self.track_number}. {self.title}"
    
    @admin.display(description='Длительность')
    def duration_formatted(self):
        if not self.duration_seconds:
            return "--:--"
        minutes = self.duration_seconds // 60
        seconds = self.duration_seconds % 60
        return f"{minutes}:{seconds:02d}"


class Favorite(models.Model):
    id = models.UUIDField(
        primary_key=True, 
        default=uuid.uuid4, 
        editable=False,
        verbose_name='ID'
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='favorite_releases',
        verbose_name='Пользователь'
    )
    release = models.ForeignKey(
        Release, 
        on_delete=models.CASCADE, 
        related_name='favorited_by',
        verbose_name='Релиз'
    )
    added_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Дата добавления'
    )
    
    class Meta:
        verbose_name = 'Избранное'
        verbose_name_plural = 'Избранные релизы'
        unique_together = ['user', 'release']
    
    def __str__(self):
        return f"{self.user.email} ❤️ {self.release.title}"