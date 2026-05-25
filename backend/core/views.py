# core/views.py
from rest_framework import viewsets, filters, status, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.db.models import Count, Q
from .models import User, Subscriber
from .serializers import UserSerializer, SubscriberSerializer, RegisterSerializer, ChangePasswordSerializer
from .permissions import IsOwnerOrAdmin, IsAdminOrReadOnly


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