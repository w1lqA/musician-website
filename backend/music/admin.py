from django.contrib import admin
from .models import Release, Track, Favorite


class TrackInline(admin.TabularInline):
    model = Track
    extra = 1
    fields = ('track_number', 'title', 'duration_seconds', 'duration_formatted', 'audio_url')
    readonly_fields = ('duration_formatted',)
    ordering = ('track_number',)
    verbose_name = 'Трек'
    verbose_name_plural = 'Треки'

    @admin.display(description='Длительность')
    def duration_formatted(self, obj):
        return obj.duration_formatted


@admin.register(Release)
class ReleaseAdmin(admin.ModelAdmin):
    list_display = ('title', 'artist', 'type', 'release_date', 'is_featured', 'track_count')
    list_display_links = ('title',)
    list_filter = ('type', 'is_featured', 'release_date', 'artist')
    search_fields = ('title', 'artist', 'description')
    date_hierarchy = 'release_date'
    inlines = [TrackInline]
    actions = ['make_featured', 'remove_featured']
    readonly_fields = ('created_at', 'track_count')

    fieldsets = (
        ('Основная информация', {
            'fields': ('title', 'artist', 'type', 'release_date')
        }),
        ('Медиа', {
            'fields': ('cover_url', 'description')
        }),
        ('Настройки отображения', {
            'fields': ('is_featured', 'created_at')
        }),
    )

    @admin.display(description='Треков')
    def track_count(self, obj):
        return obj.tracks.count()

    @admin.action(description='Добавить в рекомендации')
    def make_featured(self, request, queryset):
        queryset.update(is_featured=True)
        self.message_user(request, f"{queryset.count()} релизов добавлено в рекомендации")

    @admin.action(description='Убрать из рекомендаций')
    def remove_featured(self, request, queryset):
        queryset.update(is_featured=False)
        self.message_user(request, f"{queryset.count()} релизов убрано из рекомендаций")

    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related(
            'tracks',
            'favorited_by'
        )

@admin.register(Track)
class TrackAdmin(admin.ModelAdmin):
    list_display = ('track_number', 'title', 'release', 'duration_formatted', 'created_at')
    list_display_links = ('title',)
    list_filter = ('release__artist', 'release')
    search_fields = ('title', 'release__title')
    raw_id_fields = ('release',)
    readonly_fields = ('created_at', 'duration_formatted')
    date_hierarchy = 'created_at'

    fieldsets = (
        (None, {
            'fields': ('release', 'title', 'track_number')
        }),
        ('Аудио', {
            'fields': ('duration_seconds', 'duration_formatted', 'audio_url')
        }),
        ('Системное', {
            'fields': ('created_at',)
        }),
    )

    @admin.display(description='Длительность')
    def duration_formatted(self, obj):
        return obj.duration_formatted


@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ('user', 'release', 'added_at')
    list_display_links = ('user',)
    list_filter = ('added_at',)
    search_fields = ('user__email', 'release__title')
    date_hierarchy = 'added_at'
    raw_id_fields = ('user', 'release')
    readonly_fields = ('added_at',)