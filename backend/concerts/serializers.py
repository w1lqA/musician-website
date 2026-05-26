# concerts/serializers.py
from rest_framework import serializers
from .models import Concert, Ticket, City
from core.utils import get_absolute_url


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['id', 'name', 'slug']


class TicketSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = Ticket
        fields = ['id', 'ticket_number', 'price_paid', 'purchase_date', 'is_used_for_discount', 'user_email']


class ConcertSerializer(serializers.ModelSerializer):
    tickets_sold = serializers.IntegerField(read_only=True)
    revenue = serializers.DecimalField(read_only=True, max_digits=12, decimal_places=2)
    available_tickets = serializers.IntegerField(read_only=True)
    detail_url = serializers.SerializerMethodField()
    city_name = serializers.CharField(source='city.name', read_only=True)
    city_slug = serializers.CharField(source='city.slug', read_only=True)

    class Meta:
        model = Concert
        fields = ['id', 'venue', 'city', 'city_name', 'city_slug', 'country', 'date', 'price', 'status',
                  'total_tickets', 'sold_tickets', 'available_tickets',
                  'tickets_sold', 'revenue', 'detail_url']

    def get_detail_url(self, obj):
        return f"/concerts/{obj.id}/"