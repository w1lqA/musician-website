from rest_framework import serializers
from .models import Order, OrderItem, OrderDiscount

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = [
            'sku_code', 'product_name', 'sku_display_name',
            'unit_price', 'quantity', 'total', 'image_url'
        ]

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    # Прямое обращение к свойствам модели (Задание 3: агрегация/аннотация)
    subtotal = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    total = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'user', 'status',
            'items', 'subtotal', 'discount_total',
            'shipping_cost', 'total', 'created_at'
        ]