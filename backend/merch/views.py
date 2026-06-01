# merch/views.py
from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.pagination import PageNumberPagination
from .models import Product, SKU
from .serializers import ProductSerializer, SKUSerializer
from core.permissions import IsAdminOrReadOnly


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'limit'
    max_page_size = 100


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.active.all().prefetch_related('skus', 'images')
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'artist', 'description']
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = StandardResultsSetPagination  # добавляем пагинацию

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category=category)

        if self.request.query_params.get('sort') == 'new':
            queryset = queryset.order_by('-created_at')
        return queryset


class SKUViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SKU.objects.select_related('product').filter(is_active=True)
    serializer_class = SKUSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]