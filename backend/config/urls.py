from django.contrib import admin
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
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
