import uuid
from django.db import models
from django.core.validators import MinValueValidator

class MerchItem(models.Model):
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
        verbose_name='Название'
    )
    description = models.TextField(
        blank=True,
        verbose_name='Описание'
    )
    price = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        validators=[MinValueValidator(0)],
        verbose_name='Цена'
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
    stock_total = models.IntegerField(
        default=0, 
        help_text="Общий остаток на складе",
        verbose_name='Общий остаток'
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
    
    def __str__(self):
        return f"{self.name} - {self.price}₽"
    
    @admin.display(description='Вариантов')
    def variant_count(self):
        return self.variants.count()


class MerchVariant(models.Model):
    id = models.UUIDField(
        primary_key=True, 
        default=uuid.uuid4, 
        editable=False,
        verbose_name='ID'
    )
    merch_item = models.ForeignKey(
        MerchItem, 
        on_delete=models.CASCADE, 
        related_name='variants',
        verbose_name='Товар'
    )
    size = models.CharField(
        max_length=20, 
        blank=True, 
        help_text="S, M, L, XL или пусто для аксессуаров",
        verbose_name='Размер'
    )
    color = models.CharField(
        max_length=50, 
        blank=True,
        verbose_name='Цвет'
    )
    stock_quantity = models.IntegerField(
        default=0,
        verbose_name='Остаток'
    )
    price_adjustment = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        default=0,
        verbose_name='Корректировка цены'
    )
    
    class Meta:
        verbose_name = 'Вариант товара'
        verbose_name_plural = 'Варианты товаров'
        unique_together = ['merch_item', 'size', 'color']
    
    def __str__(self):
        parts = [self.merch_item.name]
        if self.color:
            parts.append(self.color)
        if self.size:
            parts.append(f"Size {self.size}")
        return " - ".join(parts)


class MerchImage(models.Model):
    id = models.UUIDField(
        primary_key=True, 
        default=uuid.uuid4, 
        editable=False,
        verbose_name='ID'
    )
    merch_item = models.ForeignKey(
        MerchItem, 
        on_delete=models.CASCADE, 
        related_name='images',
        verbose_name='Товар'
    )
    image_url = models.URLField(
        max_length=500,
        verbose_name='URL изображения'
    )
    display_order = models.IntegerField(
        default=0,
        verbose_name='Порядок отображения'
    )
    is_primary = models.BooleanField(
        default=False,
        verbose_name='Главное'
    )
    
    class Meta:
        verbose_name = 'Изображение'
        verbose_name_plural = 'Изображения'
        ordering = ['display_order']
    
    def __str__(self):
        return f"Image for {self.merch_item.name}"