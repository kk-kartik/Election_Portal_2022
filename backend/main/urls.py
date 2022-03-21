from django.urls import path,include
from . import views

urlpatterns = [
    path('imp_dates/', views.get_important_dates, name='get_important_dates'),
]
