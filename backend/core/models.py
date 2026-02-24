import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email обязателен')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(
        primary_key=True, 
        default=uuid.uuid4, 
        editable=False,
        verbose_name='ID'
    )
    email = models.EmailField(
        unique=True,
        verbose_name='Email'
    )
    first_name = models.CharField(
        max_length=100, 
        blank=True,
        verbose_name='Имя'
    )
    last_name = models.CharField(
        max_length=100, 
        blank=True,
        verbose_name='Фамилия'
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name='Активен'
    )
    is_staff = models.BooleanField(
        default=False,
        verbose_name='Персонал'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Дата регистрации'
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='Дата обновления'
    )
    
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
        ordering = ['-created_at']
    
    def __str__(self):
        return self.email
    
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip()


class Subscriber(models.Model):
    id = models.UUIDField(
        primary_key=True, 
        default=uuid.uuid4, 
        editable=False,
        verbose_name='ID'
    )
    email = models.EmailField(
        unique=True,
        verbose_name='Email'
    )
    subscribed_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Дата подписки'
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name='Активен'
    )
    unsubscribed_at = models.DateTimeField(
        null=True, 
        blank=True,
        verbose_name='Дата отписки'
    )
    
    class Meta:
        verbose_name = 'Подписчик'
        verbose_name_plural = 'Подписчики'
        ordering = ['-subscribed_at']
    
    def __str__(self):
        return self.email
    
    def unsubscribe(self):
        self.is_active = False
        self.unsubscribed_at = timezone.now()
        self.save()