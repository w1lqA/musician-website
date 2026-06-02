from rest_framework import serializers
from .models import Release, Track
import json


class TrackSerializer(serializers.ModelSerializer):
    duration = serializers.SerializerMethodField(read_only=True)
    file = serializers.SerializerMethodField()

    class Meta:
        model = Track
        fields = ['id', 'track_number', 'title', 'duration_seconds', 'duration', 'file']

    def get_file(self, obj):
        if obj.file:
            return obj.file.name  # "music/filename.wav"
        return ''

    def get_duration(self, obj):
        if obj.duration_seconds:
            mins = obj.duration_seconds // 60
            secs = obj.duration_seconds % 60
            return f"{mins}:{secs:02d}"
        return "0:00"


class ReleaseSerializer(serializers.ModelSerializer):
    tracks = TrackSerializer(many=True, required=False, read_only=True)
    type_display = serializers.SerializerMethodField(read_only=True)
    cover_url = serializers.SerializerMethodField()

    class Meta:
        model = Release
        fields = [
            'id', 'title', 'artist', 'type', 'type_display', 'release_date',
            'cover', 'cover_url', 'description', 'tracks', 'is_featured', 'created_at',
        ]
        read_only_fields = ('created_at',)
        extra_kwargs = {
            'cover': {'write_only': True, 'required': False},
        }

    def get_cover_url(self, obj):
        if obj.cover:
            return obj.cover.name  # "covers/image.jpg"
        return ''

    def get_type_display(self, obj):
        return obj.get_type_display()

    def _get_tracks_from_request(self):
        """
        Читаем треки напрямую из request, минуя валидацию DRF.
        Файлы прикрепляем по индексу из request.FILES.
        """
        request = self.context.get('request')
        if not request:
            return None

        raw_tracks = request.data.get('tracks')
        if raw_tracks is None:
            return None

        if isinstance(raw_tracks, str):
            try:
                tracks_data = json.loads(raw_tracks)
            except json.JSONDecodeError:
                return None
        else:
            tracks_data = list(raw_tracks)

        for i, track_data in enumerate(tracks_data):
            file_key = f'track_file_{i}'
            if file_key in request.FILES:
                track_data['file'] = request.FILES[file_key]

        return tracks_data

    def create(self, validated_data):
        tracks_data = self._get_tracks_from_request() or []

        release = Release.objects.create(**validated_data)
        for track_data in tracks_data:
            track_data.pop('id', None)
            Track.objects.create(release=release, **track_data)
        return release

    def update(self, instance, validated_data):
        tracks_data = self._get_tracks_from_request()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if tracks_data is not None:
            for track_data in tracks_data:
                track_id = track_data.get('id')
                if track_id:
                    try:
                        track = Track.objects.get(id=track_id, release=instance)
                    except Track.DoesNotExist:
                        continue
                    for attr, val in track_data.items():
                        if attr != 'id':
                            setattr(track, attr, val)
                    track.save()
                else:
                    track_data.pop('id', None)
                    Track.objects.create(release=instance, **track_data)

        return instance