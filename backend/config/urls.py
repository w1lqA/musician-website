# config/urls.py
from django.contrib import admin
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenRefreshView
from core.views import LoginView, RegisterView, ChangePasswordView, MeView

urlpatterns = [
                  path('admin/', admin.site.urls),

                  # auth endpoints
                  path('api/auth/login/', LoginView.as_view(), name='login'),
                  path('api/auth/refresh/', TokenRefreshView.as_view(), name='refresh'),
                  path('api/auth/register/', RegisterView.as_view(), name='register'),
                  path('api/auth/change-password/', ChangePasswordView.as_view(), name='change_password'),
                  path('api/auth/me/', MeView.as_view(), name='me'),

                  path('api/', include('concerts.urls')),
                  path('api/', include('core.urls')),
                  path('api/', include('discounts.urls')),
                  path('api/', include('merch.urls')),
                  path('api/', include('music.urls')),
                  path('api/', include('orders.urls')),

                  path('create-admin/', lambda request: (
                      get_user_model().objects.create_superuser('admin@example.com', 'admin123456'),
                      JsonResponse({'status': 'created'})
                  )[1]),
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)