from django.contrib import admin
from django.utils import timezone
from django import forms
from .models import Cart, CartItem, Order, OrderItem, OrderDiscount
from merch.models import SKU

class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0
    fields = ('sku', 'quantity', 'total_price')
    readonly_fields = ('total_price',)
    raw_id_fields = ('sku',)
    verbose_name = 'Товар в корзине'
    verbose_name_plural = 'Товары в корзине'


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'session_id', 'created_at', 'items_count', 'total')
    list_display_links = ('id',)
    list_filter = ('created_at',)
    search_fields = ('user__email', 'session_id')
    date_hierarchy = 'created_at'
    raw_id_fields = ('user',)
    inlines = [CartItemInline]
    readonly_fields = ('created_at', 'updated_at', 'items_count', 'total')
    
    @admin.display(description='Товаров')
    def items_count(self, obj):
        return obj.items.count()
    
    @admin.display(description='Сумма')
    def total(self, obj):
        return obj.total


# ⚠️ ВАЖНО: OrderItemInline должен быть объявлен до OrderAdmin
class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1
    min_num = 1
    fields = ('sku', 'sku_display_name', 'unit_price', 'quantity', 'total_display')
    readonly_fields = ('sku_display_name', 'total_display', 'sku_code', 'product_name')
    raw_id_fields = ('sku',)
    verbose_name = 'Товар в заказе'
    verbose_name_plural = 'Товары в заказе'
    
    @admin.display(description='Сумма')
    def total_display(self, obj):
        if not obj.pk:
            return '—'
        return obj.total
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('sku', 'sku__product')


class OrderDiscountInline(admin.TabularInline):
    model = OrderDiscount
    extra = 0
    fields = ('discount_code', 'applied_at')
    readonly_fields = ('applied_at', 'discount_amount')
    raw_id_fields = ('discount_code',)
    verbose_name = 'Скидка'
    verbose_name_plural = 'Скидки'


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_number', 'user', 'total_display', 'status', 'created_at', 'item_count')
    list_display_links = ('order_number',)
    list_filter = ('status', 'created_at')
    search_fields = ('order_number', 'user__email')
    list_editable = ('status',)
    date_hierarchy = 'created_at'
    raw_id_fields = ('user',)
    inlines = [OrderItemInline, OrderDiscountInline]  # теперь OrderItemInline определен
    readonly_fields = ('order_number', 'created_at', 'completed_at', 'item_count', 'subtotal_display', 'total_display')
    actions = ['mark_as_paid', 'mark_as_shipped', 'mark_as_delivered']
    
    fieldsets = (
        ('Номер заказа', {
            'fields': ('order_number', 'user')
        }),
        ('Финансы', {
            'fields': ('subtotal_display', 'discount_total', 'shipping_cost', 'total_display')
        }),
        ('Статус', {
            'fields': ('status', 'created_at', 'completed_at')
        }),
        ('Данные скидок', {
            'fields': ('discount_data',),
            'classes': ('collapse',)
        }),
    )
    
    @admin.display(description='Позиций')
    def item_count(self, obj):
        return obj.items.count()
    
    @admin.display(description='Сумма без скидки')
    def subtotal_display(self, obj):
        return obj.subtotal
    
    @admin.display(description='Итого')
    def total_display(self, obj):
        return obj.total
    
    @admin.action(description='Отметить как оплаченные')
    def mark_as_paid(self, request, queryset):
        queryset.update(status='paid')
        self.message_user(request, f"{queryset.count()} заказов отмечено как оплаченные")
    
    @admin.action(description='Отметить как отправленные')
    def mark_as_shipped(self, request, queryset):
        queryset.update(status='shipped')
        self.message_user(request, f"{queryset.count()} заказов отмечено как отправленные")
    
    @admin.action(description='Отметить как доставленные')
    def mark_as_delivered(self, request, queryset):
        queryset.update(status='delivered', completed_at=timezone.now())
        self.message_user(request, f"{queryset.count()} заказов отмечено как доставленные")


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'sku_display_name', 'unit_price', 'quantity', 'total')
    list_display_links = ('order',)
    list_filter = ('order__status', 'created_at')
    search_fields = ('sku_display_name', 'order__order_number')
    date_hierarchy = 'created_at'
    raw_id_fields = ('order', 'sku')
    readonly_fields = ('sku_code', 'product_name', 'sku_display_name', 'attributes', 'created_at')


@admin.register(OrderDiscount)
class OrderDiscountAdmin(admin.ModelAdmin):
    list_display = ('order', 'discount_code', 'discount_amount', 'applied_at')
    list_display_links = ('order',)
    list_filter = ('applied_at',)
    date_hierarchy = 'applied_at'
    raw_id_fields = ('order', 'discount_code')
    readonly_fields = ('applied_at',)