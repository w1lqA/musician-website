from django.contrib import admin
from django.utils import timezone
from .models import Concert, Ticket

class TicketInline(admin.TabularInline):
    model = Ticket
    extra = 0
    fields = ('ticket_number', 'user', 'price_paid', 'purchase_date', 'is_used_for_discount')
    readonly_fields = ('ticket_number', 'purchase_date')
    raw_id_fields = ('user',)
    can_delete = False
    verbose_name = 'Билет'
    verbose_name_plural = 'Билеты'

@admin.register(Concert)
class ConcertAdmin(admin.ModelAdmin):
    list_display = ('venue', 'city', 'date', 'price', 'status', 'sold_tickets', 'available_tickets', 'is_sold_out')
    list_display_links = ('venue',)
    list_filter = ('status', 'city', 'country', 'date')
    search_fields = ('venue', 'city', 'country')
    list_editable = ('status', 'price')
    date_hierarchy = 'date'
    inlines = [TicketInline]
    actions = ['mark_as_soldout', 'mark_as_upcoming']
    readonly_fields = ('created_at', 'available_tickets', 'is_sold_out')
    
    fieldsets = (
        ('Место проведения', {
            'fields': ('venue', 'city', 'country')
        }),
        ('Дата и время', {
            'fields': ('date',)
        }),
        ('Билеты', {
            'fields': ('price', 'ticket_url', 'total_tickets', 'sold_tickets', 'available_tickets', 'is_sold_out')
        }),
        ('Статус', {
            'fields': ('status', 'created_at')
        }),
    )
    
    @admin.action(description='Отметить как soldout')
    def mark_as_soldout(self, request, queryset):
        queryset.update(status='soldout')
        self.message_user(request, f"{queryset.count()} концертов отмечено как soldout")
    
    @admin.action(description='Отметить как upcoming')
    def mark_as_upcoming(self, request, queryset):
        queryset.update(status='upcoming')
        self.message_user(request, f"{queryset.count()} концертов отмечено как upcoming")
    
    @admin.display(description='Доступно билетов')
    def available_tickets(self, obj):
        return obj.available_tickets()
    
    @admin.display(description='Распродано', boolean=True)
    def is_sold_out(self, obj):
        return obj.is_sold_out()
    
    def save_model(self, request, obj, form, change):
        if obj.sold_tickets >= obj.total_tickets:
            obj.status = 'soldout'
        super().save_model(request, obj, form, change)

@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    list_display = ('ticket_number', 'concert', 'user', 'purchase_date', 'price_paid', 'is_used_for_discount')
    list_display_links = ('ticket_number',)
    list_filter = ('is_used_for_discount', 'purchase_date', 'concert')
    search_fields = ('ticket_number', 'user__email', 'concert__venue')
    date_hierarchy = 'purchase_date'
    raw_id_fields = ('concert', 'user')
    readonly_fields = ('ticket_number', 'purchase_date')