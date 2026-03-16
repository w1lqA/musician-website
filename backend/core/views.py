from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Count
from .models import User, Subscriber
from .serializers import UserSerializer, SubscriberSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().prefetch_related('tickets', 'orders', 'favorite_releases')
    serializer_class = UserSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['email', 'first_name', 'last_name']
    ordering_fields = ['created_at', 'email']

    def get_queryset(self):
        queryset = User.objects.all()

        if self.request.query_params.get('active'):
            queryset = queryset.filter(is_active=True)

        if self.request.query_params.get('staff'):
            queryset = queryset.filter(is_staff=True)

        queryset = queryset.annotate(
            tickets_count=Count('tickets', distinct=True),
            orders_count=Count('orders', distinct=True)
        )

        return queryset

    @action(detail=False)
    def stats(self, request):
        from django.db.models import Count, Q
        stats = User.objects.aggregate(
            total_users=Count('id'),
            active_users=Count('id', filter=Q(is_active=True)),
            staff_users=Count('id', filter=Q(is_staff=True))
        )
        return Response(stats)


class SubscriberViewSet(viewsets.ModelViewSet):
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['email']
    ordering_fields = ['subscribed_at']

    def get_queryset(self):
        queryset = Subscriber.objects.all()

        if self.request.query_params.get('active'):
            queryset = queryset.filter(is_active=True)

        return queryset

    @action(detail=False)
    def stats(self, request):
        from django.db.models import Count, Q
        stats = Subscriber.objects.aggregate(
            total=Count('id'),
            active=Count('id', filter=Q(is_active=True))
        )
        return Response(stats)

    @action(detail=True, methods=['post'])
    def unsubscribe(self, request, pk=None):
        subscriber = self.get_object()
        subscriber.unsubscribe()
        serializer = self.get_serializer(subscriber)
        return Response(serializer.data)