import uuid
import random
import string
from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator
from django.utils import timezone

class Cart(models.Model):
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
    
    @admin.display(description='Товаров')
    def items_count(self):
        return self.items.count()
    
    @admin.display(description='Сумма')
    def total(self):
        return sum(item.total_price() for item in self.items.all())


class CartItem(models.Model):
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
    merch_item = models.ForeignKey(
        'merch.MerchItem', 
        on_delete=models.CASCADE,
        verbose_name='Товар'
    )
    variant = models.ForeignKey(
        'merch.MerchVariant', 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        verbose_name='Вариант'
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
        verbose_name = 'Элемент корзины'
        verbose_name_plural = 'Элементы корзины'
        unique_together = ['cart', 'merch_item', 'variant']
    
    def __str__(self):
        return f"{self.quantity}x {self.merch_item.name}"
    
    @admin.display(description='Сумма')
    def total_price(self):
        price = self.merch_item.price
        if self.variant:
            price += self.variant.price_adjustment
        return price * self.quantity


class Order(models.Model):
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
    subtotal = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        verbose_name='Сумма без скидки'
    )
    discount_total = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        default=0,
        verbose_name='Скидка'
    )
    shipping_cost = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        default=0,
        verbose_name='Доставка'
    )
    total = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        verbose_name='Итого'
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
        help_text="Информация о примененных скидках",
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
    
    @admin.display(description='Позиций')
    def item_count(self):
        return self.items.count()


class OrderItem(models.Model):
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
    merch_item = models.ForeignKey(
        'merch.MerchItem', 
        on_delete=models.SET_NULL, 
        null=True,
        verbose_name='Товар'
    )
    variant = models.ForeignKey(
        'merch.MerchVariant', 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        verbose_name='Вариант'
    )
    item_name = models.CharField(
        max_length=200, 
        help_text="Название товара на момент покупки",
        verbose_name='Название товара'
    )
    price = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        help_text="Цена на момент покупки",
        verbose_name='Цена'
    )
    quantity = models.IntegerField(
        verbose_name='Количество'
    )
    variant_data = models.JSONField(
        default=dict, 
        blank=True, 
        help_text="Информация о варианте на момент покупки",
        verbose_name='Данные варианта'
    )
    
    class Meta:
        verbose_name = 'Элемент заказа'
        verbose_name_plural = 'Элементы заказа'
    
    def __str__(self):
        return f"{self.quantity}x {self.item_name}"
    
    @admin.display(description='Сумма')
    def total(self):
        return self.price * self.quantity


class OrderDiscount(models.Model):
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
        max_digits=10, 
        decimal_places=2,
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