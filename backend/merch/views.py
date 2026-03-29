from rest_framework import viewsets, filters
from .models import Product, SKU
from .serializers import ProductSerializer, SKUSerializer


class ProductViewSet(viewsets.ModelViewSet):
    # Используем твой кастомный менеджер .active (Задание 3)
    queryset = Product.active.all().prefetch_related('skus', 'images')
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'artist', 'description']

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category=category)

        # Пример order_by (Задание 3)
        if self.request.query_params.get('sort') == 'new':
            queryset = queryset.order_by('-created_at')
        return queryset


class SKUViewSet(viewsets.ReadOnlyModelViewSet):
    # select_related для оптимизации (Задание 4)
    queryset = SKU.objects.select_related('product').filter(is_active=True)
    serializer_class = SKUSerializer