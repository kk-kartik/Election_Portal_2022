from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.microsoft.views import MicrosoftGraphOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from dj_rest_auth.jwt_auth import JWTCookieAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework  import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView

class TokenVerifyView(GenericAPIView):
    authentication_classes = [JWTCookieAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self,request):
        return Response({"ok":True,"detail":"User is logged in!"},status=status.HTTP_200_OK)

class GoogleLogin(SocialLoginView): # if you want to use Implicit Grant, use this
    adapter_class = GoogleOAuth2Adapter

class MicrosoftLogin(SocialLoginView):
    adapter_class = MicrosoftGraphOAuth2Adapter


