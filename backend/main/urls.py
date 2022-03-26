from django.urls import path,include
from . import views

urlpatterns = [
    path('imp_dates/', views.get_important_dates.as_view(), name='get_important_dates'),
    path('imp_dates/<int:pk>/', views.get_important_dates.as_view(), name='get_important_dates'),
]
