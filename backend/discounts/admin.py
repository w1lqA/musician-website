from django.contrib import admin
from django.utils import timezone
from .models import DiscountCode

@admin.register(DiscountCode)
class DiscountCodeAdmin(admin.ModelAdmin):
    list_display = ('code', 'ticket', 'discount_percent', 'valid_until', 'is_active', 'is_valid')
    list_display_links = ('code',)
    list_filter = ('is_active', 'valid_until')
    search_fields = ('code', 'ticket__ticket_number', 'ticket__user__email')
    date_hierarchy = 'valid_until'
    raw_id_fields = ('ticket',)
    actions = ['activate', 'deactivate']
    readonly_fields = ('created_at', 'is_valid')
    
    fieldsets = (
        ('Код', {
            'fields': ('code', 'ticket', 'discount_percent')
        }),
        ('Срок действия', {
            'fields': ('valid_until', 'is_active', 'is_valid', 'created_at')
        }),
    )
    
    @admin.action(description='Активировать коды')
    def activate(self, request, queryset):
        queryset.update(is_active=True)
        self.message_user(request, f"{queryset.count()} кодов активировано")
    
    @admin.action(description='Деактивировать коды')
    def deactivate(self, request, queryset):
        queryset.update(is_active=False)
        self.message_user(request, f"{queryset.count()} кодов деактивировано")
    
    @admin.display(description='Действует сейчас', boolean=True)
    def is_valid(self, obj):
        return obj.is_valid()