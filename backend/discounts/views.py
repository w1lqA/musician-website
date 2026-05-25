# discounts/views.py
from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from django.utils import timezone
from django.db.models import Q, Count, Avg
from .models import DiscountCode
from .serializers import DiscountCodeSerializer
from core.permissions import IsAdminOrReadOnly


class DiscountCodeViewSet(viewsets.ModelViewSet):
    queryset = DiscountCode.objects.all().select_related('ticket__user')
    serializer_class = DiscountCodeSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['code', 'ticket__ticket_number', 'ticket__user__email']
    ordering_fields = ['created_at', 'valid_until', 'discount_percent']
    permission_classes = [IsAdminOrReadOnly]  # Только админы могут управлять промокодами

    def get_queryset(self):
        queryset = DiscountCode.objects.all().select_related('ticket__user')

        # Обычные пользователи видят только свои промокоды
        if not self.request.user.is_staff:
            queryset = queryset.filter(ticket__user=self.request.user)

        if self.request.query_params.get('active'):
            queryset = queryset.filter(is_active=True)

        if self.request.query_params.get('valid'):
            queryset = queryset.filter(
                is_active=True,
                valid_until__gte=timezone.now().date()
            )

        if self.request.query_params.get('expired'):
            queryset = queryset.filter(
                valid_until__lt=timezone.now().date()
            )

        if self.request.query_params.get('min_percent'):
            queryset = queryset.filter(
                discount_percent__gte=self.request.query_params.get('min_percent')
            )

        return queryset

    @action(detail=False, permission_classes=[IsAdminUser])
    def stats(self, request):
        now = timezone.now().date()
        stats = DiscountCode.objects.aggregate(
            total=Count('id'),
            active=Count('id', filter=Q(is_active=True)),
            valid=Count('id', filter=Q(is_active=True, valid_until__gte=now)),
            expired=Count('id', filter=Q(valid_until__lt=now)),
            avg_percent=Avg('discount_percent')
        )
        return Response(stats)

    @action(detail=True, methods=['post'], permission_classes=[IsAdminUser])
    def extend(self, request, pk=None):
        code = self.get_object()
        days = request.data.get('days', 30)
        code.valid_until = code.valid_until + timezone.timedelta(days=days)
        code.save()
        serializer = self.get_serializer(code)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], permission_classes=[IsAdminUser])
    def toggle_active(self, request, pk=None):
        code = self.get_object()
        code.is_active = not code.is_active
        code.save()
        serializer = self.get_serializer(code)
        return Response(serializer.data)