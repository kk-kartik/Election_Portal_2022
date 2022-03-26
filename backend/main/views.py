from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from .serializers import *
from .models import *
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def get_important_dates(request,name_slug):
    important_dates = Imporatant_date.objects.filter(election__name_slug=name_slug)
    serialized_important_dates = ImportantdateSerializer(important_dates,many=True)
    return Response(serialized_important_dates.data)
