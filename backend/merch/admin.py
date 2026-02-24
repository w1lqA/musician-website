from django.contrib import admin
from .models import MerchItem, MerchVariant, MerchImage

class MerchVariantInline(admin.TabularInline):
    model = MerchVariant
    extra = 1
    fields = ('size', 'color', 'stock_quantity', 'price_adjustment')
    verbose_name = 'Вариант'
    verbose_name_plural = 'Варианты'

class MerchImageInline(admin.TabularInline):
    model = MerchImage
    extra = 1
    fields = ('image_url', 'display_order', 'is_primary')
    ordering = ('display_order',)
    verbose_name = 'Изображение'
    verbose_name_plural = 'Изображения'

@admin.register(MerchItem)
class MerchItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'stock_total', 'is_active', 'variant_count')
    list_display_links = ('name',)
    list_filter = ('category', 'is_active', 'created_at')
    search_fields = ('name', 'description')
    list_editable = ('price', 'stock_total', 'is_active')
    date_hierarchy = 'created_at'
    inlines = [MerchVariantInline, MerchImageInline]
    actions = ['activate', 'deactivate']
    readonly_fields = ('created_at', 'updated_at', 'variant_count')
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('name', 'description', 'category')
        }),
        ('Цены и наличие', {
            'fields': ('price', 'stock_total')
        }),
        ('Медиа', {
            'fields': ('main_image',)
        }),
        ('Статус', {
            'fields': ('is_active', 'created_at', 'updated_at')
        }),
    )
    
    @admin.action(description='Активировать товары')
    def activate(self, request, queryset):
        queryset.update(is_active=True)
        self.message_user(request, f"{queryset.count()} товаров активировано")
    
    @admin.action(description='Деактивировать товары')
    def deactivate(self, request, queryset):
        queryset.update(is_active=False)
        self.message_user(request, f"{queryset.count()} товаров деактивировано")
    
    @admin.display(description='Вариантов')
    def variant_count(self, obj):
        return obj.variants.count()

@admin.register(MerchVariant)
class MerchVariantAdmin(admin.ModelAdmin):
    list_display = ('merch_item', 'size', 'color', 'stock_quantity', 'price_adjustment')
    list_display_links = ('merch_item',)
    list_filter = ('size', 'color')
    search_fields = ('merch_item__name',)
    raw_id_fields = ('merch_item',)

@admin.register(MerchImage)
class MerchImageAdmin(admin.ModelAdmin):
    list_display = ('merch_item', 'display_order', 'is_primary')
    list_display_links = ('merch_item',)
    list_filter = ('is_primary',)
    search_fields = ('merch_item__name',)
    raw_id_fields = ('merch_item',)