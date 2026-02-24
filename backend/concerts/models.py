import uuid
import random
import string
from django.db import models
from django.conf import settings
from django.utils import timezone
from django.contrib import admin

class Concert(models.Model):
    STATUS_CHOICES = [
        ('upcoming', 'Предстоящий'),
        ('soldout', 'Все билеты проданы'),
        ('cancelled', 'Отменен'),
        ('completed', 'Прошел'),
    ]
    
    id = models.UUIDField(
        primary_key=True, 
        default=uuid.uuid4, 
        editable=False,
        verbose_name='ID'
    )
    venue = models.CharField(
        max_length=200,
        verbose_name='Площадка'
    )
    city = models.CharField(
        max_length=100,
        verbose_name='Город'
    )
    country = models.CharField(
        max_length=100, 
        default='Россия',
        verbose_name='Страна'
    )
    date = models.DateTimeField(
        verbose_name='Дата и время'
    )
    price = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        verbose_name='Цена билета'
    )
    ticket_url = models.URLField(
        max_length=500, 
        blank=True,
        verbose_name='URL покупки билетов'
    )
    status = models.CharField(
        max_length=20, 
        choices=STATUS_CHOICES, 
        default='upcoming',
        verbose_name='Статус'
    )
    total_tickets = models.IntegerField(
        default=100,
        verbose_name='Всего билетов'
    )
    sold_tickets = models.IntegerField(
        default=0,
        verbose_name='Продано билетов'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Дата создания'
    )
    
    class Meta:
        verbose_name = 'Концерт'
        verbose_name_plural = 'Концерты'
        ordering = ['date']
    
    def __str__(self):
        return f"{self.venue} - {self.city} ({self.date.strftime('%d.%m.%Y')})"
    
    @admin.display(description='Доступно билетов')
    def available_tickets(self):
        return self.total_tickets - self.sold_tickets
    
    @admin.display(description='Распродано', boolean=True)
    def is_sold_out(self):
        return self.available_tickets() <= 0


class Ticket(models.Model):
    id = models.UUIDField(
        primary_key=True, 
        default=uuid.uuid4, 
        editable=False,
        verbose_name='ID'
    )
    concert = models.ForeignKey(
        Concert, 
        on_delete=models.CASCADE, 
        related_name='tickets',
        verbose_name='Концерт'
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='tickets',
        verbose_name='Покупатель'
    )
    ticket_number = models.CharField(
        max_length=50, 
        unique=True,
        verbose_name='Номер билета'
    )
    price_paid = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        verbose_name='Цена покупки'
    )
    purchase_date = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Дата покупки'
    )
    is_used_for_discount = models.BooleanField(
        default=False,
        verbose_name='Использован для скидки'
    )
    
    class Meta:
        verbose_name = 'Билет'
        verbose_name_plural = 'Билеты'
        ordering = ['-purchase_date']
    
    def __str__(self):
        return f"Билет {self.ticket_number} на {self.concert}"
    
    def save(self, *args, **kwargs):
        if not self.ticket_number:
            city_code = self.concert.city[:3].upper()
            date_code = self.concert.date.strftime('%d%m')
            random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
            self.ticket_number = f"WLQ-{city_code}-{date_code}-{random_chars}"
        super().save(*args, **kwargs)