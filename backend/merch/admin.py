from django.contrib import admin
from django import forms
from .models import Product, SKU, ProductImage

class SKUInline(admin.TabularInline):
    model = SKU
    extra = 1
    fields = ('sku_code', 'display_name', 'price', 'stock', 'is_active')
    readonly_fields = ('sku_code',)
    raw_id_fields = ('product',)
    verbose_name = 'SKU'
    verbose_name_plural = 'SKU'
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('product')


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    fields = ('image_url', 'display_order', 'is_primary')
    ordering = ('display_order',)
    verbose_name = 'Изображение'
    verbose_name_plural = 'Изображения'


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'sku_count', 'is_active', 'created_at')
    list_display_links = ('name',)
    list_filter = ('category', 'is_active', 'created_at')
    search_fields = ('name', 'description', 'artist')
    list_editable = ('is_active',)
    date_hierarchy = 'created_at'
    inlines = [SKUInline, ProductImageInline]
    actions = ['activate', 'deactivate']
    readonly_fields = ('created_at', 'updated_at', 'sku_count')
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('name', 'description', 'category')
        }),
        ('Музыка', {
            'fields': ('artist', 'release_date'),
            'classes': ('collapse',),
            'description': 'Для винила и CD'
        }),
        ('Медиа', {
            'fields': ('main_image',)
        }),
        ('Статус', {
            'fields': ('is_active', 'created_at', 'updated_at')
        }),
    )
    
    @admin.display(description='Количество SKU')
    def sku_count(self, obj):
        return obj.skus.count()
    
    @admin.action(description='Активировать выбранные товары')
    def activate(self, request, queryset):
        queryset.update(is_active=True)
        self.message_user(request, f"{queryset.count()} товаров активировано")
    
    @admin.action(description='Деактивировать выбранные товары')
    def deactivate(self, request, queryset):
        queryset.update(is_active=False)
        self.message_user(request, f"{queryset.count()} товаров деактивировано")


class SKUForm(forms.ModelForm):
    class Meta:
        model = SKU
        fields = '__all__'
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Проверяем, есть ли поле в форме
        if 'sku_code' in self.fields:
            self.fields['sku_code'].required = False
        if 'display_name' in self.fields:
            self.fields['display_name'].required = False


@admin.register(SKU)
class SKUAdmin(admin.ModelAdmin):
    form = SKUForm
    list_display = ('sku_code', 'display_name', 'product', 'price', 'stock', 'is_active')
    list_display_links = ('sku_code', 'display_name')
    list_filter = ('is_active', 'product__category', 'created_at')
    search_fields = ('sku_code', 'display_name', 'product__name')
    list_editable = ('price', 'stock', 'is_active')
    date_hierarchy = 'created_at'
    raw_id_fields = ('product',)
    readonly_fields = ('sku_code', 'created_at', 'updated_at')
    autocomplete_fields = ['product']
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('product', 'sku_code', 'display_name')
        }),
        ('Характеристики', {
            'fields': ('attributes',)
        }),
        ('Цены и наличие', {
            'fields': ('price', 'compare_at_price', 'stock')
        }),
        ('Медиа', {
            'fields': ('image',)
        }),
        ('Статус', {
            'fields': ('is_active', 'created_at', 'updated_at')
        }),
    )


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ('product', 'display_order', 'is_primary')
    list_display_links = ('product',)
    list_filter = ('is_primary',)
    search_fields = ('product__name',)
    date_hierarchy = 'product__created_at'
    raw_id_fields = ('product',)
    list_editable = ('display_order', 'is_primary')