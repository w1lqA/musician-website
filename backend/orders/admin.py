from django.contrib import admin
from django.utils import timezone
from .models import Cart, CartItem, Order, OrderItem, OrderDiscount

class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0
    fields = ('merch_item', 'variant', 'quantity', 'total_price')
    readonly_fields = ('total_price',)
    raw_id_fields = ('merch_item', 'variant')
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
        return obj.items_count()
    
    @admin.display(description='Сумма')
    def total(self, obj):
        return obj.total()

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    fields = ('item_name', 'price', 'quantity', 'total')
    readonly_fields = ('item_name', 'price', 'quantity', 'variant_data', 'total')
    raw_id_fields = ('merch_item', 'variant')
    can_delete = False
    verbose_name = 'Товар в заказе'
    verbose_name_plural = 'Товары в заказе'

class OrderDiscountInline(admin.TabularInline):
    model = OrderDiscount
    extra = 0
    fields = ('discount_code', 'discount_amount', 'applied_at')
    readonly_fields = ('applied_at',)
    raw_id_fields = ('discount_code',)
    verbose_name = 'Примененная скидка'
    verbose_name_plural = 'Примененные скидки'

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_number', 'user', 'total', 'status', 'created_at', 'item_count')
    list_display_links = ('order_number',)
    list_filter = ('status', 'created_at')
    search_fields = ('order_number', 'user__email')
    list_editable = ('status',)
    date_hierarchy = 'created_at'
    raw_id_fields = ('user',)
    inlines = [OrderItemInline, OrderDiscountInline]
    readonly_fields = ('order_number', 'created_at', 'completed_at', 'item_count')
    actions = ['mark_as_paid', 'mark_as_shipped', 'mark_as_delivered']
    
    fieldsets = (
        ('Номер заказа', {
            'fields': ('order_number', 'user')
        }),
        ('Финансы', {
            'fields': ('subtotal', 'discount_total', 'shipping_cost', 'total')
        }),
        ('Статус', {
            'fields': ('status', 'created_at', 'completed_at')
        }),
        ('Данные скидок', {
            'fields': ('discount_data',),
            'classes': ('collapse',)
        }),
    )
    
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
    
    @admin.display(description='Позиций')
    def item_count(self, obj):
        return obj.item_count()

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'item_name', 'price', 'quantity', 'total')
    list_display_links = ('order',)
    list_filter = ('order__status',)
    search_fields = ('item_name', 'order__order_number')
    date_hierarchy = 'order__created_at'
    raw_id_fields = ('order', 'merch_item', 'variant')
    readonly_fields = ('item_name', 'price', 'quantity', 'variant_data')

@admin.register(OrderDiscount)
class OrderDiscountAdmin(admin.ModelAdmin):
    list_display = ('order', 'discount_code', 'discount_amount', 'applied_at')
    list_display_links = ('order',)
    list_filter = ('applied_at',)
    date_hierarchy = 'applied_at'
    raw_id_fields = ('order', 'discount_code')
    readonly_fields = ('applied_at',)