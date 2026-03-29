from rest_framework import serializers
from .models import Product, SKU, ProductImage


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'display_order']


class SKUSerializer(serializers.ModelSerializer):
    total_display = serializers.ReadOnlyField(source='__str__')

    class Meta:
        model = SKU
        fields = ['id', 'sku_code', 'display_name', 'price', 'stock', 'attributes', 'total_display']


class ProductSerializer(serializers.ModelSerializer):
    skus = SKUSerializer(many=True, read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'category',
            'artist', 'main_image', 'skus', 'images', 'is_active'
        ]