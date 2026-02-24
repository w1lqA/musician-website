import uuid
import random
import string
from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator
from django.utils import timezone
from django.core.exceptions import ValidationError

class Cart(models.Model):
    """Корзина пользователя"""
    id = models.UUIDField(
        primary_key=True, 
        default=uuid.uuid4, 
        editable=False,
        verbose_name='ID'
    )
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        null=True, 
        blank=True, 
        related_name='cart',
        verbose_name='Пользователь'
    )
    session_id = models.CharField(
        max_length=100, 
        null=True, 
        blank=True,
        verbose_name='ID сессии'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Дата создания'
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='Дата обновления'
    )
    
    class Meta:
        verbose_name = 'Корзина'
        verbose_name_plural = 'Корзины'
    
    def __str__(self):
        if self.user:
            return f"Корзина {self.user.email}"
        return f"Корзина {self.session_id}"
    
    @property
    def total(self):
        return sum(item.total_price for item in self.items.all())


class CartItem(models.Model):
    """Позиция в корзине"""
    id = models.UUIDField(
        primary_key=True, 
        default=uuid.uuid4, 
        editable=False,
        verbose_name='ID'
    )
    cart = models.ForeignKey(
        Cart, 
        on_delete=models.CASCADE, 
        related_name='items',
        verbose_name='Корзина'
    )
    sku = models.ForeignKey(
        'merch.SKU', 
        on_delete=models.CASCADE,
        verbose_name='Товар (SKU)'
    )
    quantity = models.IntegerField(
        default=1, 
        validators=[MinValueValidator(1)],
        verbose_name='Количество'
    )
    added_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Дата добавления'
    )
    
    class Meta:
        verbose_name = 'Позиция корзины'
        verbose_name_plural = 'Позиции корзины'
        unique_together = ['cart', 'sku']
    
    def __str__(self):
        return f"{self.quantity}x {self.sku.display_name}"
    
    @property
    def total_price(self):
        return self.sku.price * self.quantity


class Order(models.Model):
    """Заказ"""
    STATUS_CHOICES = [
        ('pending', 'Ожидает оплаты'),
        ('paid', 'Оплачен'),
        ('shipped', 'Отправлен'),
        ('delivered', 'Доставлен'),
        ('cancelled', 'Отменен'),
    ]
    
    id = models.UUIDField(
        primary_key=True, 
        default=uuid.uuid4, 
        editable=False,
        verbose_name='ID'
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL, 
        null=True, 
        related_name='orders',
        verbose_name='Пользователь'
    )
    order_number = models.CharField(
        max_length=50, 
        unique=True,
        verbose_name='Номер заказа'
    )
    shipping_cost = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        default=0,
        verbose_name='Доставка'
    )
    discount_total = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        default=0,
        verbose_name='Скидка'
    )
    status = models.CharField(
        max_length=20, 
        choices=STATUS_CHOICES, 
        default='pending',
        verbose_name='Статус'
    )
    discount_data = models.JSONField(
        default=dict, 
        blank=True, 
        verbose_name='Данные скидок'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Дата создания'
    )
    completed_at = models.DateTimeField(
        null=True, 
        blank=True,
        verbose_name='Дата завершения'
    )
    
    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Заказ {self.order_number}"
    
    def save(self, *args, **kwargs):
        if not self.order_number:
            date_prefix = timezone.now().strftime('%Y%m%d')
            random_suffix = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
            self.order_number = f"WLQ-{date_prefix}-{random_suffix}"
        super().save(*args, **kwargs)
    
    @property
    def subtotal(self):
        return sum(item.total for item in self.items.all())
    
    @property
    def total(self):
        return self.subtotal + self.shipping_cost - self.discount_total


class OrderItem(models.Model):
    """Позиция в заказе (со снэпшотом)"""
    id = models.UUIDField(
        primary_key=True, 
        default=uuid.uuid4, 
        editable=False,
        verbose_name='ID'
    )
    order = models.ForeignKey(
        Order, 
        on_delete=models.CASCADE, 
        related_name='items',
        verbose_name='Заказ'
    )
    sku = models.ForeignKey(
        'merch.SKU', 
        on_delete=models.SET_NULL, 
        null=True,
        verbose_name='SKU'
    )
    c
    # Снэпшот
    sku_code = models.CharField(
        max_length=50,
        verbose_name='Артикул'
    )
    product_name = models.CharField(
        max_length=200,
        verbose_name='Название товара'
    )
    sku_display_name = models.CharField(
        max_length=200,
        verbose_name='Название SKU'
    )
    attributes = models.JSONField(
        default=dict,
        verbose_name='Характеристики'
    )
    unit_price = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        verbose_name='Цена за единицу'
    )
    quantity = models.IntegerField(
        validators=[MinValueValidator(1)],
        verbose_name='Количество'
    )
    image_url = models.URLField(
        max_length=500, 
        blank=True,
        verbose_name='Изображение'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Дата добавления'
    )
    
    class Meta:
        verbose_name = 'Позиция заказа'
        verbose_name_plural = 'Позиции заказа'
    
    def __str__(self):
        return f"{self.quantity}x {self.sku_display_name}"
    
    @property
    def total(self):
        """Общая стоимость позиции"""
        if self.unit_price is None or self.quantity is None:
            return 0
        return self.unit_price * self.quantity
    
    def save(self, *args, **kwargs):
        # Всегда заполняем данные из SKU, если они есть
        if self.sku:
            self.sku_code = self.sku.sku_code
            self.product_name = self.sku.product.name
            self.sku_display_name = self.sku.display_name
            self.attributes = self.sku.attributes
            self.unit_price = self.sku.price
            self.image_url = self.sku.image or self.sku.product.main_image
        
        # Проверка, что цена есть
        if not self.unit_price:
            raise ValueError("unit_price cannot be null")
            
        super().save(*args, **kwargs)


class OrderDiscount(models.Model):
    """Примененная к заказу скидка"""
    id = models.UUIDField(
        primary_key=True, 
        default=uuid.uuid4, 
        editable=False,
        verbose_name='ID'
    )
    order = models.ForeignKey(
        Order, 
        on_delete=models.CASCADE, 
        related_name='applied_discounts',
        verbose_name='Заказ'
    )
    discount_code = models.ForeignKey(
        'discounts.DiscountCode', 
        on_delete=models.SET_NULL, 
        null=True,
        verbose_name='Промо-код'
    )
    discount_amount = models.DecimalField(
        editable=False, 
        decimal_places=2,
        max_digits=10,
        verbose_name='Сумма скидки'
    )
    applied_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Дата применения'
    )
    
    class Meta:
        verbose_name = 'Скидка на заказ'
        verbose_name_plural = 'Скидки на заказы'
        unique_together = ['order', 'discount_code']
    
    def __str__(self):
        return f"Скидка {self.discount_amount} для {self.order.order_number}"
    def save(self, *args, **kwargs):
        if self.discount_code and self.order:
            percent = self.discount_code.discount_percent
            self.discount_amount = (self.order.subtotal * percent) / 100
        super().save(*args, **kwargs)