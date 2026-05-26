# core/views.py
from django.conf import settings
from rest_framework import viewsets, filters, status, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.db.models import Count, Q

from concerts.models import Concert
from merch.models import Product
from music.models import Release
from .models import User, Subscriber
from .serializers import UserSerializer, SubscriberSerializer, RegisterSerializer, ChangePasswordSerializer
from .permissions import IsOwnerOrAdmin
from core.utils import get_absolute_url


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user_id'] = str(self.user.id)
        data['email'] = self.user.email
        data['first_name'] = self.user.first_name
        data['last_name'] = self.user.last_name
        data['is_staff'] = self.user.is_staff
        return data


class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get('refresh_token')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            return Response({'message': 'logout successful'}, status=status.HTTP_200_OK)
        except Exception:
            return Response({'message': 'logout successful'}, status=status.HTTP_200_OK)


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            'user': UserSerializer(user).data,
            'message': 'пользователь успешно зарегистрирован'
        }, status=status.HTTP_201_CREATED)


class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        if not user.check_password(serializer.validated_data['old_password']):
            return Response({'old_password': 'неверный пароль'}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(serializer.validated_data['new_password'])
        user.save()
        return Response({'message': 'пароль успешно изменен'}, status=status.HTTP_200_OK)


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().prefetch_related('tickets', 'orders', 'favorite_releases')
    serializer_class = UserSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['email', 'first_name', 'last_name']
    ordering_fields = ['created_at', 'email']

    def get_permissions(self):
        if self.action in ['list', 'destroy']:
            return [IsAdminUser()]
        elif self.action in ['retrieve', 'update', 'partial_update']:
            return [IsOwnerOrAdmin()]
        return [IsAuthenticated()]

    def get_queryset(self):
        queryset = User.objects.all()

        if not self.request.user.is_staff:
            queryset = queryset.filter(id=self.request.user.id)

        if self.request.query_params.get('active'):
            queryset = queryset.filter(is_active=True)

        if self.request.query_params.get('staff'):
            queryset = queryset.filter(is_staff=True)

        queryset = queryset.annotate(
            tickets_count=Count('tickets', distinct=True),
            orders_count=Count('orders', distinct=True)
        )

        return queryset

    @action(detail=False, permission_classes=[IsAdminUser])
    def stats(self, request):
        stats = User.objects.aggregate(
            total_users=Count('id'),
            active_users=Count('id', filter=Q(is_active=True)),
            staff_users=Count('id', filter=Q(is_staff=True))
        )
        return Response(stats)


class SubscriberViewSet(viewsets.ModelViewSet):
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['email']
    ordering_fields = ['subscribed_at']

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        elif self.action in ['list', 'destroy', 'update', 'partial_update']:
            return [IsAdminUser()]
        elif self.action == 'unsubscribe':
            return [IsAuthenticated()]
        return [IsAdminUser()]

    def get_queryset(self):
        queryset = Subscriber.objects.all()

        if not self.request.user.is_staff and self.request.user.is_authenticated:
            queryset = queryset.filter(email=self.request.user.email)
        elif not self.request.user.is_authenticated:
            queryset = Subscriber.objects.none()

        if self.request.query_params.get('active'):
            queryset = queryset.filter(is_active=True)

        return queryset

    @action(detail=False, permission_classes=[IsAdminUser])
    def stats(self, request):
        stats = Subscriber.objects.aggregate(
            total=Count('id'),
            active=Count('id', filter=Q(is_active=True))
        )
        return Response(stats)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def unsubscribe(self, request, pk=None):
        subscriber = self.get_object()
        if subscriber.email != request.user.email and not request.user.is_staff:
            return Response({"error": "нельзя отписать другого пользователя"}, status=403)
        subscriber.unsubscribe()
        serializer = self.get_serializer(subscriber)
        return Response(serializer.data)


class SearchViewSet(viewsets.GenericViewSet):
    permission_classes = [AllowAny]

    @action(detail=False, methods=['get'])
    def search(self, request):
        query = request.query_params.get('q', '').strip()
        content_type = request.query_params.get('type', 'all')
        sort = request.query_params.get('sort', 'relevance')

        if not query:
            return Response({
                'results': [],
                'count': 0,
                'query': ''
            })

        results = []

        if content_type in ['all', 'releases']:
            releases = Release.objects.filter(
                Q(title__icontains=query) | Q(artist__icontains=query)
            )[:20]
            for release in releases:
                results.append({
                    'type': 'release',
                    'id': str(release.id),
                    'title': release.title,
                    'subtitle': release.artist,
                    'image': get_absolute_url(release.cover.url if release.cover else ''),
                    'url': f'/release/{release.id}',
                    'date': release.release_date.isoformat() if release.release_date else '',
                    'price': None,
                    'relevance': 1 if release.title.lower().startswith(query.lower()) else 2
                })

        if content_type in ['all', 'products']:
            products = Product.objects.filter(
                Q(name__icontains=query) | Q(artist__icontains=query) | Q(description__icontains=query)
            )[:20]
            for product in products:
                first_sku = product.skus.first()
                results.append({
                    'type': 'product',
                    'id': str(product.id),
                    'title': product.name,
                    'subtitle': product.artist or product.category,
                    'image': get_absolute_url(product.main_image),
                    'url': f'/merch/{product.id}',
                    'date': '',
                    'price': float(first_sku.price) if first_sku and first_sku.price else None,
                    'relevance': 1 if product.name.lower().startswith(query.lower()) else 2
                })

        if content_type in ['all', 'concerts']:
            concerts = Concert.objects.filter(
                Q(venue__icontains=query) | Q(city__name__icontains=query)
            )[:20]
            for concert in concerts:
                results.append({
                    'type': 'concert',
                    'id': str(concert.id),
                    'title': concert.venue,
                    'subtitle': concert.city.name,
                    'image': '',
                    'url': f'/concert/{concert.id}',
                    'date': concert.date.isoformat() if concert.date else '',
                    'price': float(concert.price) if concert.price else None,
                    'relevance': 1 if concert.venue.lower().startswith(query.lower()) else 2
                })

        if sort == 'date':
            results.sort(key=lambda x: x.get('date', '') if x.get('date') else '9999-12-31')
        elif sort == 'price_asc':
            results.sort(key=lambda x: x.get('price') if x.get('price') is not None else float('inf'))
        elif sort == 'price_desc':
            results.sort(key=lambda x: x.get('price') if x.get('price') is not None else 0, reverse=True)
        else:
            results.sort(key=lambda x: (x.get('relevance', 3), x.get('date', '')))

        return Response({
            'results': results,
            'count': len(results),
            'query': query
        })