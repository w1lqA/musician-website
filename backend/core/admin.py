from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from .models import User, Subscriber

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('email', 'first_name', 'last_name', 'is_staff', 'is_active', 'created_at')
    list_display_links = ('email',)
    list_filter = ('is_staff', 'is_active', 'created_at')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)
    date_hierarchy = 'created_at'
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'created_at', 'updated_at')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'first_name', 'last_name', 'is_staff', 'is_active'),
        }),
    )
    
    readonly_fields = ('created_at', 'updated_at', 'last_login')
    filter_horizontal = ('groups', 'user_permissions')
    
    @admin.display(description='Полное имя')
    def get_full_name(self, obj):
        return obj.full_name

@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'subscribed_at', 'is_active')
    list_display_links = ('email',)
    list_filter = ('is_active', 'subscribed_at')
    search_fields = ('email',)
    date_hierarchy = 'subscribed_at'
    readonly_fields = ('subscribed_at', 'unsubscribed_at')
    actions = ['unsubscribe_selected']
    
    @admin.action(description='Отписать выбранных подписчиков')
    def unsubscribe_selected(self, request, queryset):
        for subscriber in queryset:
            subscriber.unsubscribe()
        self.message_user(request, f"{queryset.count()} подписчиков отписано")