"""
URL configuration for config project.
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('core/', include('core.urls')),

    # path('music/', include('music.urls')),
    # path('merch/', include('merch.urls')),
    # path('concerts/', include('concerts.urls')),
    # path('orders/', include('orders.urls')),
    # path('discounts/', include('discounts.urls')),
]