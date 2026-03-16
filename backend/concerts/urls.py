from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'concerts', views.ConcertViewSet)

urlpatterns = [
    path('', include(router.urls)),
]