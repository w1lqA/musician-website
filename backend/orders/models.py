import uuid
import random
import string
from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator
from django.utils import timezone


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
        db_index=True,
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
        """Общая сумма корзины"""
        return sum(item.total_price for item in self.items.all())

    @property
    def items_count(self):
        """Количество товаров"""
        return self.items.count()


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
    quantity = models.PositiveIntegerField(
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
        unique_together = [['cart', 'sku']]

    def __str__(self):
        return f"{self.quantity}x {self.sku.display_name}"

    @property
    def total_price(self):
        """Общая стоимость позиции"""
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
        editable=False,
        verbose_name='Номер заказа'
    )
    shipping_cost = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        verbose_name='Стоимость доставки'
    )
    discount_total = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        verbose_name='Сумма скидки'
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending',
        db_index=True,
        verbose_name='Статус'
    )
    discount_data = models.JSONField(
        default=dict,
        blank=True,
        verbose_name='Данные скидок'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        db_index=True,
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
            self.order_number = self._generate_order_number()
        super().save(*args, **kwargs)

    def _generate_order_number(self):
        """Генерация номера заказа"""
        date_prefix = timezone.now().strftime('%Y%m%d')
        random_suffix = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
        return f"WLQ-{date_prefix}-{random_suffix}"

    @property
    def subtotal(self):
        """Сумма товаров без скидки"""
        return sum(item.total for item in self.items.all())

    @property
    def total(self):
        """Итоговая сумма"""
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
    # Снэпшот данных на момент покупки
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
    quantity = models.PositiveIntegerField(
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
        return self.unit_price * self.quantity

    def save(self, *args, **kwargs):
        # Заполняем снэпшот из SKU при создании
        if self.sku and not self.sku_code:
            self.sku_code = self.sku.sku_code
            self.product_name = self.sku.product.name
            self.sku_display_name = self.sku.display_name
            self.attributes = self.sku.attributes
            self.unit_price = self.sku.price
            self.image_url = self.sku.image or self.sku.product.main_image
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
        max_digits=10,
        decimal_places=2,
        editable=False,
        verbose_name='Сумма скидки'
    )
    applied_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Дата применения'
    )

    class Meta:
        verbose_name = 'Скидка на заказ'
        verbose_name_plural = 'Скидки на заказы'
        unique_together = [['order', 'discount_code']]

    def __str__(self):
        return f"Скидка {self.discount_amount} для заказа {self.order.order_number}"

    def save(self, *args, **kwargs):
        # Автоматически рассчитываем сумму скидки
        if self.discount_code and self.order and not self.discount_amount:
            percent = self.discount_code.discount_percent
            self.discount_amount = (self.order.subtotal * percent) / 100
        super().save(*args, **kwargs)