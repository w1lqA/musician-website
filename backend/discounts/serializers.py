from rest_framework import serializers
from .models import DiscountCode


class DiscountCodeSerializer(serializers.ModelSerializer):
    is_valid = serializers.BooleanField(read_only=True)
    ticket_number = serializers.CharField(source='ticket.ticket_number', read_only=True)
    user_email = serializers.EmailField(source='ticket.user.email', read_only=True)

    class Meta:
        model = DiscountCode
        fields = ['id', 'code', 'discount_percent', 'valid_until', 'is_active',
                  'is_valid', 'created_at', 'ticket', 'ticket_number', 'user_email']