from django.shortcuts import get_object_or_404
from .serializers import *
from .models import *
from rest_framework.response import Response
from rest_framework import status,mixins,generics,viewsets,permissions
from .permissions import ElectionOrganizerWritePermission,IsOrganizerOrCandidateWriteOnly
from dj_rest_auth.jwt_auth import JWTAuthentication
from .mixins import ElectionMixin
from authentication.default_authentication_classes import default_authentication_classes


class PositionCandidatesView(ElectionMixin,generics.ListAPIView):
    serializer_class=CandidateSerializer
    permission_classes=[permissions.AllowAny]
    authentication_classes =default_authentication_classes
    
    def get_queryset(self):
        position = Position.objects.filter(id=self.kwargs.get("position_id"))
        return Candidate.objects.filter(election=self.election,nomination_status="approved")

class RegistrationCompleteView(ElectionMixin,generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = EuserSerializer
    authentication_classes=default_authentication_classes

    def get_object(self):
        return self.request.user.euser
    
    def perform_update(self,serializer):
        serializer.save(registration_complete=True)

class ProfileAPIView(ElectionMixin,generics.GenericAPIView):
    permission_classes=[permissions.IsAuthenticated]
    authentication_classes=default_authentication_classes

    def get(self,request,*args,**kwargs):
        election = self.election
        user = self.request.user
        euser = user.euser
        candidates = Candidate.objects.filter(election=election,user=euser)
        euser_data = EuserSerializer(euser,context=self.get_serializer_context()).data
        candidates_data = CandidateSerializer(candidates,many=True,context=self.get_serializer_context()).data
        user_data = UserSerializer(user,context=self.get_serializer_context()).data

        return Response({**user_data,"euser":euser_data,"candidates":candidates_data},status=status.HTTP_200_OK)

        

class ImportantDatesViewSet(ElectionMixin,viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,ElectionOrganizerWritePermission]
    serializer_class = ImportantdateSerializer
    authentication_classes=default_authentication_classes
    
    def get_queryset(self):
        return self.election.important_dates.all()
    
    def perform_create(self,serializer):
        return serializer.save(election=self.election)
    
    def perform_update(self,serializer):
         return serializer.save(election=self.election)


class CandidatesViewSet(ElectionMixin,viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,IsOrganizerOrCandidateWriteOnly]
    serializer_class = CandidateReadSerializer
    authentication_classes=default_authentication_classes
    
    def get_serializer_class(self):
        if self.action == ["create"]:
            try:
                is_organizer = Voter.objects.filter(election_organizers__id=self.election.id,user__id=self.request.user.euser.id).exists()
                if is_organizer:
                    return CandidateOrganizerSerializer
                return CandidateSerializer
            except:
                return CandidateSerializer
        return CandidateReadSerializer
    
    def get_queryset(self):
        return self.election.candidates_e.all()
    
    def perform_create(self,serializer):
        return serializer.save(election=self.election,user=self.request.user.euser)
    
    def perform_update(self,serializer):
        return serializer.save(election=self.election)
    
    def create(self,request,*args,**kwargs):
        is_registered = self.election.candidates_e.filter(user=request.user.euser,position=request.data.get("position"))
        if is_registered:
            return Response({"detail":"Candidate Already Registered"},status=status.HTTP_400_BAD_REQUEST)
        return super(CandidatesViewSet,self).create(request,*args,**kwargs)


class PositionsViewSet(ElectionMixin,viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,ElectionOrganizerWritePermission]
    serializer_class = PositionSerializer
    authentication_classes=default_authentication_classes

    def get_serializer_class(self):
        if self.action in ["create","update"]:
            return PositionSerializer
        return PositionReadSerializer

    def get_queryset(self):
        return self.election.positions.all()
    
    def perform_create(self,serializer):
        return serializer.save(election=self.election)
    
    def perform_update(self,serializer):
         return serializer.save(election=self.election)
    


class FAQViewSet(ElectionMixin,viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,ElectionOrganizerWritePermission]
    serializer_class = FaqSerializer
    authentication_classes=default_authentication_classes

    def get_queryset(self):
        return self.election.faqs.all()
    
    def perform_create(self,serializer):
        return serializer.save(election=self.election)
    
    def perform_update(self,serializer):
         return serializer.save(election=self.election)


class DebatesViewSet(ElectionMixin,viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,ElectionOrganizerWritePermission]
    serializer_class = DebateSerializer
    authentication_classes=default_authentication_classes
    
    def get_queryset(self):
        return self.election.debates.all()
    
    def perform_create(self,serializer):
        return serializer.save(election=self.election)
    
    def perform_update(self,serializer):
         return serializer.save(election=self.election)


class CredentialCreateAPIView(Election,generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CredentialSerializer
    authentication_classes=default_authentication_classes
    