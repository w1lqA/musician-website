# core/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'subscribers', views.SubscriberViewSet)
router.register(r'search', views.SearchViewSet, basename='search')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', views.LoginView.as_view(), name='login'),
    path('auth/logout/', views.LogoutView.as_view(), name='logout'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('auth/register/', views.RegisterView.as_view(), name='register'),
    path('auth/change-password/', views.ChangePasswordView.as_view(), name='change_password'),
    path('auth/me/', views.MeView.as_view(), name='me'),
]