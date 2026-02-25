from django.contrib import admin
from django.utils import timezone
from .models import Cart, CartItem, Order, OrderItem, OrderDiscount


class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0
    fields = ('sku', 'quantity', 'total_price', 'added_at')
    readonly_fields = ('total_price', 'added_at')
    raw_id_fields = ('sku',)
    verbose_name = 'Товар в корзине'
    verbose_name_plural = 'Товары в корзине'

    @admin.display(description='Сумма')
    def total_price(self, obj):
        return obj.total_price


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('id_short', 'user', 'session_id', 'items_count', 'total', 'updated_at')
    list_display_links = ('id_short',)
    list_filter = ('created_at', 'updated_at')
    search_fields = ('user__email', 'session_id')
    date_hierarchy = 'created_at'
    raw_id_fields = ('user',)
    inlines = [CartItemInline]
    readonly_fields = ('created_at', 'updated_at', 'items_count', 'total')

    fieldsets = (
        (None, {
            'fields': ('user', 'session_id')
        }),
        ('Статистика', {
            'fields': ('items_count', 'total', 'created_at', 'updated_at')
        }),
    )

    @admin.display(description='ID')
    def id_short(self, obj):
        return str(obj.id)[:8]

    @admin.display(description='Товаров')
    def items_count(self, obj):
        return obj.items.count()

    @admin.display(description='Сумма')
    def total(self, obj):
        return obj.total


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    fields = ('sku_display_name', 'sku_code', 'unit_price', 'quantity', 'total')
    readonly_fields = ('sku_code', 'sku_display_name', 'unit_price', 'total')
    raw_id_fields = ('sku',)
    verbose_name = 'Товар в заказе'
    verbose_name_plural = 'Товары в заказе'
    can_delete = False

    @admin.display(description='Сумма')
    def total(self, obj):
        return obj.total


class OrderDiscountInline(admin.TabularInline):
    model = OrderDiscount
    extra = 0
    fields = ('discount_code', 'discount_amount', 'applied_at')
    readonly_fields = ('discount_amount', 'applied_at')
    raw_id_fields = ('discount_code',)
    verbose_name = 'Скидка'
    verbose_name_plural = 'Скидки'
    can_delete = False


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_number', 'user', 'total', 'status', 'created_at')
    list_display_links = ('order_number',)
    list_filter = ('status', 'created_at')
    search_fields = ('order_number', 'user__email')
    list_editable = ('status',)
    date_hierarchy = 'created_at'
    raw_id_fields = ('user',)
    inlines = [OrderItemInline, OrderDiscountInline]
    readonly_fields = ('order_number', 'created_at', 'completed_at', 'subtotal', 'total')
    actions = ['mark_as_paid', 'mark_as_shipped', 'mark_as_delivered', 'mark_as_cancelled']

    fieldsets = (
        ('Информация о заказе', {
            'fields': ('order_number', 'user', 'status')
        }),
        ('Финансы', {
            'fields': ('subtotal', 'discount_total', 'shipping_cost', 'total')
        }),
        ('Даты', {
            'fields': ('created_at', 'completed_at')
        }),
        ('Дополнительные данные', {
            'fields': ('discount_data',),
            'classes': ('collapse',)
        }),
    )

    def get_queryset(self, request):
        return super().get_queryset(request).select_related('user')

    @admin.display(description='Сумма товаров')
    def subtotal(self, obj):
        return obj.subtotal

    @admin.display(description='Итого')
    def total(self, obj):
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
        now = timezone.now()
        queryset.update(status='delivered', completed_at=now)
        self.message_user(request, f"{queryset.count()} заказов отмечено как доставленные")

    @admin.action(description='Отметить как отмененные')
    def mark_as_cancelled(self, request, queryset):
        queryset.update(status='cancelled')
        self.message_user(request, f"{queryset.count()} заказов отмечено как отмененные")


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'sku_display_name', 'unit_price', 'quantity', 'total', 'created_at')
    list_display_links = ('order',)
    list_filter = ('created_at',)
    search_fields = ('sku_display_name', 'order__order_number')
    date_hierarchy = 'created_at'
    raw_id_fields = ('order', 'sku')
    readonly_fields = ('sku_code', 'product_name', 'sku_display_name', 'attributes', 'unit_price', 'created_at',
                       'total')

    fieldsets = (
        ('Заказ', {
            'fields': ('order', 'sku')
        }),
        ('Снэпшот', {
            'fields': ('sku_code', 'product_name', 'sku_display_name', 'attributes', 'image_url')
        }),
        ('Цены и количество', {
            'fields': ('unit_price', 'quantity', 'total')
        }),
        ('Системное', {
            'fields': ('created_at',)
        }),
    )

    def get_queryset(self, request):
        return super().get_queryset(request).select_related('order', 'sku__product')

    @admin.display(description='Сумма')
    def total(self, obj):
        return obj.total


@admin.register(OrderDiscount)
class OrderDiscountAdmin(admin.ModelAdmin):
    list_display = ('order', 'discount_code', 'discount_amount', 'applied_at')
    list_display_links = ('order',)
    list_filter = ('applied_at',)
    search_fields = ('order__order_number', 'discount_code__code')
    date_hierarchy = 'applied_at'
    raw_id_fields = ('order', 'discount_code')
    readonly_fields = ('discount_amount', 'applied_at')

    fieldsets = (
        (None, {
            'fields': ('order', 'discount_code')
        }),
        ('Скидка', {
            'fields': ('discount_amount', 'applied_at')
        }),
    )

    def has_add_permission(self, request):
        # Скидки добавляются автоматически через применение кода
        return False