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
                name_slug = request.get_full_path().split('/')[2]
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

class get_important_dates_detailed(APIView):
    permission_classes = [ElectionOrganizerWritePermission]

    def get(self,request,name_slug,id):
        # print(id)
        important_dates = Imporatant_date.objects.get(pk=id,election__name_slug=name_slug)
        serialized_important_dates = ImportantdateSerializer(important_dates)
        return Response(serialized_important_dates.data)

    def patch(self, request,name_slug,id,format=None):
        date = Imporatant_date.objects.get(pk=id,election__name_slug=name_slug)
        serializer = ImportantdateSerializer(date, data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request,name_slug,id, format=None):
        date = Imporatant_date.objects.get(pk=id,election__name_slug=name_slug)
        date.delete()
        return Response(status=status.HTTP_204_NO_CONTENT) 

class all_positions(APIView):
    permission_classes = [ElectionOrganizerWritePermission]

    def get(self,request,name_slug):
        # position_name = request.headers.get('position_name')
        position_name = request.META.get('position_name')
        print(position_name)
        if position_name:
            position = Position.objects.get(election__name_slug=name_slug,title=position_name)
        else:
            position = Position.objects.filter(election__name_slug=name_slug)
        serialized_position = PositionSerializer(position,many=True)
        return Response(serialized_position.data)

    def post(self,request,name_slug):                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
        position = PositionSerializer(data=request.data)
        if position.is_valid():
            position.save()
            return Response(position.data)
        return Response(position.errors, status=status.HTTP_400_BAD_REQUEST)


    def patch(self, request,name_slug,format=None):
        position_name = request.headers.get('position_name')
        if position_name:
            position = Position.objects.get(election__name_slug=name_slug,title=position_name)
            serializer = ImportantdateSerializer(position, data=request.data,partial=True)
            if serializer.is_valid():
                serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

    def delete(self, request,name_slug, format=None):
        position_name = request.headers.get('position_name')
        if position_name:
            position = Position.objects.get(election__name_slug=name_slug,title=position_name)
            position.delete()
        return Response(status=status.HTTP_204_NO_CONTENT) 
