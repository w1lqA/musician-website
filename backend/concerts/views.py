from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from django.db.models import Count, Sum, Avg, Max, Min, Q
from .models import Concert
from .serializers import ConcertSerializer, TicketSerializer

class ConcertViewSet(viewsets.ModelViewSet):
    queryset = Concert.objects.all()
    serializer_class = ConcertSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['venue', 'city', 'country']
    ordering_fields = ['date', 'price', 'created_at']

    def get_queryset(self):
        queryset = Concert.objects.all()

        if self.request.query_params.get('upcoming'):
            queryset = queryset.filter(date__gt=timezone.now())

        if self.request.query_params.get('past'):
            queryset = queryset.filter(date__lt=timezone.now())

        if self.request.query_params.get('exclude_cancelled'):
            queryset = queryset.exclude(status='cancelled')

        if self.request.query_params.get('city'):
            queryset = queryset.filter(city__iexact=self.request.query_params.get('city'))

        if self.request.query_params.get('user_email'):
            queryset = queryset.filter(tickets__user__email=self.request.query_params.get('user_email'))

        queryset = queryset.annotate(
            tickets_sold=Count('tickets'),
            revenue=Sum('tickets__price_paid')
        )

        return queryset

    @action(detail=False)
    def stats(self, request):
        stats = Concert.objects.aggregate(
            avg_price=Avg('price'),
            max_price=Max('price'),
            min_price=Min('price'),
            total_concerts=Count('id'),
            upcoming_count=Count('id', filter=Q(date__gt=timezone.now()))
        )
        return Response(stats)

    @action(detail=True)
    def tickets(self, request, pk=None):
        concert = self.get_object()
        tickets = concert.tickets.select_related('user').all()
        serializer = TicketSerializer(tickets, many=True)
        return Response(serializer.data)

    @action(detail=False)
    def upcoming(self, request):
        concerts = Concert.objects.upcoming().annotate(
            tickets_sold=Count('tickets'),
            revenue=Sum('tickets__price_paid')
        )
        serializer = self.get_serializer(concerts, many=True)
        return Response(serializer.data)

    @action(detail=False)
    def past(self, request):
        concerts = Concert.objects.past().annotate(
            tickets_sold=Count('tickets'),
            revenue=Sum('tickets__price_paid')
        )
        serializer = self.get_serializer(concerts, many=True)
        return Response(serializer.data)

    @action(detail=False)
    def by_city(self, request):
        city = request.query_params.get('city')
        if not city:
            return Response({'error': 'city parameter required'}, status=400)
        concerts = Concert.objects.in_city(city).annotate(
            tickets_sold=Count('tickets'),
            revenue=Sum('tickets__price_paid')
        )
        serializer = self.get_serializer(concerts, many=True)
        return Response(serializer.data)

    @action(detail=False)
    def cities(self, request):
        cities = Concert.objects.values_list('city', flat=True).distinct()
        return Response(list(cities))

    @action(detail=False)
    def summary(self, request):
        has_upcoming = Concert.objects.filter(date__gt=timezone.now()).exists()
        total = Concert.objects.count()
        return Response({
            'total_concerts': total,
            'has_upcoming': has_upcoming
        })