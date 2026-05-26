# merch/serializers.py
from rest_framework import serializers
from .models import Product, SKU, ProductImage
from core.utils import get_absolute_url


class ProductImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'display_order']

    def get_image(self, obj):
        return get_absolute_url(obj.image.url if obj.image else '')


class SKUSerializer(serializers.ModelSerializer):
    total_display = serializers.ReadOnlyField(source='__str__')

    class Meta:
        model = SKU
        fields = ['id', 'sku_code', 'display_name', 'price', 'stock', 'attributes', 'total_display']


class ProductSerializer(serializers.ModelSerializer):
    skus = SKUSerializer(many=True, read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    main_image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'category',
            'artist', 'main_image', 'skus', 'images', 'is_active'
        ]

    def get_main_image(self, obj):
        return get_absolute_url(obj.main_image)