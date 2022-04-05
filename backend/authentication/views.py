from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.microsoft.views import MicrosoftGraphOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from dj_rest_auth.jwt_auth import JWTCookieAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework  import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from django.utils.decorators import method_decorator
from django.db import transaction


class TokenVerifyView(GenericAPIView):
    authentication_classes = [JWTCookieAuthentication]

    def get(self,request):
        if request.user.is_authenticated:
            return Response({"isLoggedIn":True,"detail":"User is logged in!"},status=status.HTTP_200_OK)
        return Response({"isLoggedIn":False,"detail":"User not logged in!"},status=status.HTTP_200_OK)

@method_decorator(transaction.atomic,name="dispatch")
class GoogleLogin(SocialLoginView): # if you want to use Implicit Grant, use this
    adapter_class = GoogleOAuth2Adapter

@method_decorator(transaction.atomic,name="dispatch")
class MicrosoftLogin(SocialLoginView):
    adapter_class = MicrosoftGraphOAuth2Adapter


