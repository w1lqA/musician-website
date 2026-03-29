from rest_framework import serializers
from .models import Release, Track, Favorite

class TrackSerializer(serializers.ModelSerializer):
    duration = serializers.ReadOnlyField(source='duration_formatted')

    class Meta:
        model = Track
        fields = ['id', 'track_number', 'title', 'duration', 'file']

class ReleaseSerializer(serializers.ModelSerializer):
    tracks = TrackSerializer(many=True, read_only=True)
    type_display = serializers.CharField(source='get_type_display', read_only=True)

    class Meta:
        model = Release
        fields = [
            'id', 'title', 'artist', 'type', 'type_display',
            'release_date', 'cover', 'tracks', 'is_featured'
        ]