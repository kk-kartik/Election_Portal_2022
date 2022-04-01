import datetime
from rest_framework.generics import GenericAPIView
from django_auth_adfs.rest_framework import AdfsAccessTokenAuthentication
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
# Create your views here.
from django_auth_adfs.backend import AdfsAccessTokenBackend
from rest_framework_simplejwt.serializers import TokenRefreshSerializer

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError



def send_tokens(tokens):
    max_age = 365 * 24 * 60 * 60
    expires = datetime.datetime.utcnow() + datetime.timedelta(seconds=max_age)
    response = Response()  
    response.set_cookie(
        key = settings.SIMPLE_JWT['AUTH_COOKIE'], 
        value = tokens["refresh"],
        secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
        httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
        samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
        expires=expires,
        max_age=max_age
    )
    response.status = status.HTTP_200_OK
    response.data = {
        "access_token":tokens["access"]
    }
    return response

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class OutlookSigninView(GenericAPIView):
    authentication_classes = (AdfsAccessTokenAuthentication,)
    
    def get(self,request):
        tokens = get_tokens_for_user(request.user)
        return send_tokens(tokens)
        

class RefershTokenView(TokenRefreshView):
    serializer_class = TokenRefreshSerializer 

    def get(self,request):
        raw_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE']) or None
        serializer = self.get_serializer(data={"refresh":raw_token})

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])
        
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
       


        
