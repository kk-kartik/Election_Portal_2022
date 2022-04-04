from django.urls import path,include
from . import views


urlpatterns = [
   path("token/verify/",views.TokenVerifyView.as_view(),name="token_verify"),
   path('', include('dj_rest_auth.urls')),
   path("social/google/",view=views.GoogleLogin.as_view(),name="google_login"),
   path("social/outlook/",view=views.MicrosoftLogin.as_view(),name="outlook_login"),
   path('accounts/', include('allauth.urls'), name='socialaccount_signup'),
]
