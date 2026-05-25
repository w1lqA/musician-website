# orders/views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db import transaction

from . import serializers
from .models import Order, OrderItem, Cart
from .serializers import OrderSerializer
from core.permissions import IsOwnerOrAdmin


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.select_related('user').prefetch_related('items').all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]  # Только авторизованные

    def get_queryset(self):
        queryset = Order.objects.select_related('user').prefetch_related('items').all()

        # Не-админы видят только свои заказы
        if not self.request.user.is_staff:
            queryset = queryset.filter(user=self.request.user)

        return queryset

    def create(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"error": "Login required"}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            cart = Cart.objects.get(user=request.user)
            if not cart.items.exists():
                return Response({"error": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)
        except Cart.DoesNotExist:
            return Response({"error": "No cart found"}, status=status.HTTP_404_NOT_FOUND)

        with transaction.atomic():
            order = Order.objects.create(
                user=request.user,
                status='pending',
                shipping_cost=500.00
            )

            for cart_item in cart.items.all():
                sku = cart_item.sku

                if sku.stock < cart_item.quantity:
                    raise serializers.ValidationError(f"Not enough stock for {sku.display_name}")

                OrderItem.objects.create(
                    order=order,
                    sku=sku,
                    quantity=cart_item.quantity,
                    unit_price=sku.price,
                    product_name=sku.product.name,
                    sku_display_name=sku.display_name
                )

                sku.stock -= cart_item.quantity
                sku.save()

            cart.items.all().delete()

        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        order = self.get_object()

        if order.user != request.user and not request.user.is_staff:
            return Response({"error": "Cannot cancel another user's order"}, status=403)

        if order.status in ['shipped', 'delivered']:
            return Response({"error": "Cannot cancel shipped order"}, status=400)

        order.status = 'cancelled'
        order.save()
        return Response({"status": "order cancelled"})