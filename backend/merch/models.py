import uuid
import random
import string
from django.db import models
from django.core.validators import MinValueValidator

class ActiveProductManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_active=True)

    def in_stock(self):
        return self.get_queryset().filter(skus__stock__gt=0).distinct()

class Product(models.Model):
    """Товар (абстрактный)"""
    CATEGORIES = [
        ('clothing', 'Одежда'),
        ('accessories', 'Аксессуары'),
        ('vinyl', 'Винил'),
        ('cd', 'CD'),
        ('other', 'Другое'),
    ]

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        verbose_name='ID'
    )
    name = models.CharField(
        max_length=200,
        db_index=True,
        verbose_name='Название'
    )
    description = models.TextField(
        blank=True,
        verbose_name='Описание'
    )
    category = models.CharField(
        max_length=20,
        choices=CATEGORIES,
        default='clothing',
        verbose_name='Категория'
    )
    main_image = models.URLField(
        max_length=500,
        blank=True,
        verbose_name='Главное фото'
    )
    artist = models.CharField(
        max_length=200,
        blank=True,
        verbose_name='Исполнитель'
    )
    release_date = models.DateField(
        null=True,
        blank=True,
        verbose_name='Дата релиза'
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name='Активен'
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
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'
        ordering = ['-created_at']

    objects = models.Manager()
    active = ActiveProductManager()

    def __str__(self):
        return self.name


class SKU(models.Model):
    """Товарная позиция (SKU)"""
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        verbose_name='ID'
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='skus',
        verbose_name='Товар'
    )
    sku_code = models.CharField(
        max_length=50,
        unique=True,
        editable=False,
        verbose_name='Артикул'
    )
    display_name = models.CharField(
        max_length=200,
        editable=False,
        verbose_name='Отображаемое название'
    )
    attributes = models.JSONField(
        default=dict,
        verbose_name='Характеристики',
        help_text='{"size": "M", "color": "Black", "material": "cotton"}'
    )
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)],
        verbose_name='Цена'
    )
    compare_at_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name='Старая цена'
    )
    stock = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0)],
        verbose_name='Остаток'
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name='Активен'
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
        verbose_name = 'Товарная позиция (SKU)'
        verbose_name_plural = 'Товарные позиции (SKU)'
        unique_together = [['product', 'attributes']]
        ordering = ['product__name', 'price']

    def __str__(self):
        return self.display_name or self.sku_code

    def save(self, *args, **kwargs):
        if not self.sku_code:
            self.sku_code = self._generate_sku_code()
        if not self.display_name:
            self.display_name = self._generate_display_name()
        super().save(*args, **kwargs)

    def _generate_sku_code(self):
        """Генерация артикула на основе категории и характеристик"""
        prefix = {
            'clothing': 'CLTH',
            'accessories': 'ACCS',
            'vinyl': 'VINL',
            'cd': 'CD',
            'other': 'OTH'
        }.get(self.product.category, 'ITEM')

        # Берем первые буквы характеристик
        attrs = self.attributes
        color_code = attrs.get('color', '')[:3].upper() if attrs.get('color') else 'STD'
        size_code = attrs.get('size', '').upper() if attrs.get('size') else 'NOS'

        # Уникальный суффикс
        suffix = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))

        return f"{prefix}-{color_code}-{size_code}-{suffix}"

    def _generate_display_name(self):
        """Генерация отображаемого названия из товара и характеристик"""
        parts = [self.product.name]

        if self.attributes:
            color = self.attributes.get('color')
            size = self.attributes.get('size')
            material = self.attributes.get('material')

            if color:
                parts.append(color)
            if size:
                parts.append(f"размер {size}")
            if material:
                parts.append(material)

        return " - ".join(parts)


class ProductImage(models.Model):
    """Дополнительные изображения товара"""
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        verbose_name='ID'
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='images',
        verbose_name='Товар'
    )
    image_url = models.URLField(
        max_length=500,
        verbose_name='URL изображения'
    )
    display_order = models.PositiveIntegerField(
        default=0,
        verbose_name='Порядок отображения'
    )

    class Meta:
        verbose_name = 'Изображение товара'
        verbose_name_plural = 'Изображения товаров'
        ordering = ['display_order']

    def __str__(self):
        return f"Изображение {self.display_order} для {self.product.name}"
