"""election_portal22 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
# from rest_framework_swagger.views import get_swagger_view

# schema_view = get_swagger_view(title='Pastebin API')
from django.views.generic import TemplateView
from rest_framework.schemas import get_schema_view

urlpatterns = [
    path('elections_api/admin/', admin.site.urls),
    path('elections_api/auth/', include('authentication.urls')),
    path('elections_api/<str:name_slug>/',include('main.urls')),
    # path('elections_api/api_doc/',schema_view),

    path('openapi', get_schema_view(title="Election portal 22",description="API for all things …",version="1.0.0"), name='openapi-schema'),
    path('elections_api/api_doc/', TemplateView.as_view(template_name='api_doc.html',extra_context={'schema_url':'openapi-schema'}
    ), name='api_doc'),
]
