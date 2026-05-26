# music/serializers.py
from rest_framework import serializers
from .models import Release, Track, Favorite
from core.utils import get_absolute_url


class TrackSerializer(serializers.ModelSerializer):
    duration = serializers.ReadOnlyField(source='duration_formatted')
    file = serializers.SerializerMethodField()

    class Meta:
        model = Track
        fields = ['id', 'track_number', 'title', 'duration', 'file']

    def get_file(self, obj):
        return get_absolute_url(obj.file.url if obj.file else '')


class ReleaseSerializer(serializers.ModelSerializer):
    tracks = TrackSerializer(many=True, read_only=True)
    type_display = serializers.CharField(source='get_type_display', read_only=True)
    cover = serializers.SerializerMethodField()

    class Meta:
        model = Release
        fields = [
            'id', 'title', 'artist', 'type', 'type_display',
            'release_date', 'cover', 'tracks', 'is_featured'
        ]

    def get_cover(self, obj):
        return get_absolute_url(obj.cover.url if obj.cover else '')
