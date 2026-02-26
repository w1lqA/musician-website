# from django.urls import path, re_path
# from . import views
#
# app_name = 'core'
#
# urlpatterns = [
#     # Простой path
#     path('stats/', views.user_stats, name='user_stats'),
#
#     # Пример с email (регулярное выражение)
#     re_path(r'^subscriber/(?P<email>[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,})/$',
#             views.subscriber_detail,
#             name='subscriber_detail'),
#
#     # Пример с действием
#     path('unsubscribe/', views.unsubscribe_me, name='unsubscribe'),
# ]