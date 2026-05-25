# music/views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Release, Track
from .serializers import ReleaseSerializer, TrackSerializer
from core.permissions import IsAdminOrReadOnly

class ReleaseViewSet(viewsets.ModelViewSet):
    queryset = Release.objects.all().prefetch_related('tracks')
    serializer_class = ReleaseSerializer
    permission_classes = [IsAdminOrReadOnly]

    @action(detail=False, permission_classes=[IsAuthenticatedOrReadOnly])
    def featured(self, request):
        featured_releases = self.queryset.filter(is_featured=True)
        if not featured_releases.exists():
            return Response({"detail": "No featured releases"}, status=404)

        serializer = self.get_serializer(featured_releases, many=True)
        return Response(serializer.data)


class TrackViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Track.objects.select_related('release').all()
    serializer_class = TrackSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]