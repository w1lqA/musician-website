import uuid
from django.db import models
from django.utils import timezone
from datetime import timedelta

class DiscountCode(models.Model):
    id = models.UUIDField(
        primary_key=True, 
        default=uuid.uuid4, 
        editable=False,
        verbose_name='ID'
    )
    ticket = models.OneToOneField(
        'concerts.Ticket', 
        on_delete=models.CASCADE, 
        related_name='discount_code',
        verbose_name='Билет'
    )
    code = models.CharField(
        max_length=50, 
        unique=True,
        verbose_name='Промо-код'
    )
    discount_percent = models.IntegerField(
        default=15, 
        help_text="Процент скидки",
        verbose_name='Процент скидки'
    )
    valid_until = models.DateField(
        verbose_name='Действителен до'
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name='Активен'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Дата создания'
    )
    
    class Meta:
        verbose_name = 'Промо-код'
        verbose_name_plural = 'Промо-коды'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.code} - {self.discount_percent}%"
    
    def save(self, *args, **kwargs):
        if not self.code:
            self.code = self.ticket.ticket_number
        if not self.valid_until:
            self.valid_until = timezone.now().date() + timedelta(days=365)
        super().save(*args, **kwargs)
    
    @admin.display(description='Действует сейчас', boolean=True)
    def is_valid(self):
        return self.is_active and self.valid_until >= timezone.now().date()