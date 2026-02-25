import uuid
from django.db import models
from django.conf import settings
from django.urls import reverse


class Release(models.Model):
    """Музыкальный релиз"""
    RELEASE_TYPES = [
        ('album', 'Альбом'),
        ('single', 'Сингл'),
        ('ep', 'EP'),
        ('live', 'Концертный альбом'),
        ('compilation', 'Сборник'),
    ]

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        verbose_name='ID'
    )
    title = models.CharField(
        max_length=200,
        db_index=True,
        verbose_name='Название'
    )
    artist = models.CharField(
        max_length=200,
        db_index=True,
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
        max_length=20,
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
        indexes = [
            models.Index(fields=['artist', 'release_date']),
        ]

    def get_absolute_url(self):
        return reverse('music:release_detail', args=[str(self.id)])

    def get_favorite_url(self):
        return reverse('music:add_to_favorites', args=[str(self.id)])

    def __str__(self):
        return f"{self.artist} - {self.title}"


class Track(models.Model):
    """Трек в релизе"""
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
        verbose_name='Длительность (секунд)'
    )
    audio_url = models.URLField(
        max_length=500,
        blank=True,
        verbose_name='URL аудио'
    )
    track_number = models.PositiveIntegerField(
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
        unique_together = [['release', 'track_number']]

    def __str__(self):
        return f"{self.track_number}. {self.title}"

    @property
    def duration_formatted(self):
        """Форматированная длительность (MM:SS)"""
        minutes = self.duration_seconds // 60
        seconds = self.duration_seconds % 60
        return f"{minutes}:{seconds:02d}"


class Favorite(models.Model):
    """Избранные релизы пользователя (связь многие-ко-многим)"""
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
        unique_together = [['user', 'release']]
        ordering = ['-added_at']

    def __str__(self):
        return f"{self.user.email} → {self.release.title}"