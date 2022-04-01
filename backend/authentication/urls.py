from django.urls import path,include
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView
)

urlpatterns = [
   path("outlook/signin/",view=views.OutlookSigninView.as_view(),name="outlook_sigin"),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('token/refresh/',views.RefershTokenView.as_view(), name='token_refresh'),
]
