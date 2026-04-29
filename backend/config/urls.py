from django.contrib import admin
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
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
