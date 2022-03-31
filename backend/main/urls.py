from django.urls import path,include
from . import views

urlpatterns = [
    path('imp_dates/', views.get_important_dates.as_view(), name='get_important_dates'),
    path('imp_dates/<int:id>/', views.get_important_dates_detailed.as_view(), name='get_important_dates_detailed'),
    path('all_positions/', views.all_positions.as_view(), name='all_positions'),
]
