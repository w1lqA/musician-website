from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Release, Track
from .serializers import ReleaseSerializer, TrackSerializer


class ReleaseViewSet(viewsets.ModelViewSet):
    # prefetch_related для вложенных треков (Задание 4)
    queryset = Release.objects.all().prefetch_related('tracks')
    serializer_class = ReleaseSerializer

    @action(detail=False)
    def featured(self, request):
        """Вывод рекомендованных релизов (Задание 6: exists)"""
        featured_releases = self.queryset.filter(is_featured=True)
        if not featured_releases.exists():
            return Response({"detail": "No featured releases"}, status=404)

        serializer = self.get_serializer(featured_releases, many=True)
        return Response(serializer.data)


class TrackViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Track.objects.select_related('release').all()
    serializer_class = TrackSerializer