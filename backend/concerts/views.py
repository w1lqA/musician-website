# concerts/views.py
from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from django.utils import timezone
from django.db.models import Count, Sum, Avg, Max, Min, Q
from .models import Concert, City
from .serializers import ConcertSerializer, TicketSerializer, CitySerializer
from core.permissions import IsAdminOrReadOnly


class CityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']


class ConcertViewSet(viewsets.ModelViewSet):
    queryset = Concert.objects.all().select_related('city').prefetch_related('tickets')
    serializer_class = ConcertSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['venue', 'city__name', 'country']
    ordering_fields = ['date', 'price', 'created_at']
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        queryset = Concert.objects.all().select_related('city').prefetch_related('tickets')

        if self.request.query_params.get('upcoming'):
            queryset = queryset.filter(date__gt=timezone.now())

        if self.request.query_params.get('past'):
            queryset = queryset.filter(date__lt=timezone.now())

        if self.request.query_params.get('exclude_cancelled'):
            queryset = queryset.exclude(status='cancelled')

        if self.request.query_params.get('city_id'):
            queryset = queryset.filter(city_id=self.request.query_params.get('city_id'))

        if self.request.query_params.get('city_slug'):
            queryset = queryset.filter(city__slug=self.request.query_params.get('city_slug'))

        if self.request.query_params.get('user_email'):
            if not self.request.user.is_staff:
                queryset = queryset.filter(tickets__user__email=self.request.user.email)
            else:
                queryset = queryset.filter(tickets__user__email=self.request.query_params.get('user_email'))

        if self.request.query_params.get('search'):
            search = self.request.query_params.get('search')
            queryset = queryset.filter(
                Q(venue__icontains=search) |
                Q(city__name__icontains=search) |
                Q(country__icontains=search)
            )

        queryset = queryset.annotate(
            tickets_sold=Count('tickets'),
            revenue=Sum('tickets__price_paid')
        )

        return queryset

    @action(detail=False, permission_classes=[IsAuthenticatedOrReadOnly])
    def stats(self, request):
        stats = Concert.objects.aggregate(
            avg_price=Avg('price'),
            max_price=Max('price'),
            min_price=Min('price'),
            total_concerts=Count('id'),
            upcoming_count=Count('id', filter=Q(date__gt=timezone.now()))
        )
        return Response(stats)

    @action(detail=True, permission_classes=[IsAuthenticatedOrReadOnly])
    def tickets(self, request, pk=None):
        concert = self.get_object()
        tickets = concert.tickets.select_related('user').all()

        if not request.user.is_staff:
            tickets = tickets.filter(user=request.user)

        serializer = TicketSerializer(tickets, many=True)
        return Response(serializer.data)

    @action(detail=False, permission_classes=[IsAuthenticatedOrReadOnly])
    def upcoming(self, request):
        queryset = Concert.objects.upcoming().select_related('city').prefetch_related('tickets')

        city_id = request.query_params.get('city_id')
        if city_id:
            queryset = queryset.filter(city_id=city_id)

        city_slug = request.query_params.get('city_slug')
        if city_slug:
            queryset = queryset.filter(city__slug=city_slug)

        queryset = queryset.annotate(
            tickets_sold=Count('tickets'),
            revenue=Sum('tickets__price_paid')
        )
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, permission_classes=[IsAuthenticatedOrReadOnly])
    def past(self, request):
        queryset = Concert.objects.past().select_related('city').prefetch_related('tickets')

        city_id = request.query_params.get('city_id')
        if city_id:
            queryset = queryset.filter(city_id=city_id)

        queryset = queryset.annotate(
            tickets_sold=Count('tickets'),
            revenue=Sum('tickets__price_paid')
        )
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)