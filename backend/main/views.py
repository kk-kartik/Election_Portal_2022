<<<<<<< HEAD
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
=======
from pickle import FALSE
from unicodedata import name
from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from .serializers import *
from .models import *
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status

class ElectionOrganizerWritePermission(permissions.BasePermission):
    """
    Global write permission check for election organizer(s).
    """
    message = 'Invalid Access! This API can be accessed only by one of the organizers of the election.'

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            # request.method is GET, OPTIONS or HEAD
            return True
        else:
            try:    
                user_email = request.user.euser.email
                name_slug = request.GET.get('name_slug')
                print(user_email,name_slug)
                organizers_voter_objects = Election.objects.get(name_slug=name_slug).organizers.all()
                organizers_emails = [x.user.email for x in organizers_voter_objects]
                if user_email in organizers_emails: 
                    return True
                else:
                    return False
            except Exception as e:
                print("Exception raised in ElectionOrganizerWritePermission!")
                print(e)
                return False

# @api_view(['GET'])

# def get_important_dates(request,name_slug):
#     important_dates = Imporatant_date.objects.filter(election__name_slug=name_slug)
#     serialized_important_dates = ImportantdateSerializer(important_dates,many=True)
#     return Response(serialized_important_dates.data)


class get_important_dates(APIView):
    permission_classes = [ElectionOrganizerWritePermission]

    def get(self,request,name_slug):
        important_dates = Imporatant_date.objects.filter(election__name_slug=name_slug)
        serialized_important_dates = ImportantdateSerializer(important_dates,many=True)
        return Response(serialized_important_dates.data)

    def post(self,request,name_slug):
        serialized_important_dates = ImportantdateSerializer(data=request.data)
        if serialized_important_dates.is_valid():
            serialized_important_dates.save()
            return Response(serialized_important_dates.data)
        return Response(serialized_important_dates.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request,name_slug,format=None):
        data = request.data
        pk = data.get('id')
        date = Imporatant_date.objects.get(pk=pk,election__name_slug=name_slug)
        serializer = ImportantdateSerializer(date, data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request,name_slug, format=None):
        data = request.data
        pk = data.get('id')
        date = Imporatant_date.objects.get(pk=pk,election__name_slug=name_slug)
        date.delete()
        return Response(status=status.HTTP_204_NO_CONTENT) 
>>>>>>> 853124e9cc070250a0dd884a3d696c90311ba8f6
