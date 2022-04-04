from django.shortcuts import get_object_or_404
from .serializers import *
from .models import *
from rest_framework.response import Response
from rest_framework import status,mixins,generics,viewsets,permissions
from .permissions import ElectionOrganizerWritePermission,IsOrganizerOrCandidateWriteOnly
from dj_rest_auth.jwt_auth import JWTAuthentication
from .mixins import ElectionMixin
from authentication.default_authentication_classes import default_authentication_classes


class RegistrationCompleteView(ElectionMixin,generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = EuserSerializer
    authentication_classes=default_authentication_classes

    def get_object(self):
        return self.request.user.euser

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
    permission_classes = [ElectionOrganizerWritePermission]
    serializer_class = ImportantdateSerializer
    authentication_classes=default_authentication_classes
    
    def get_queryset(self):
        return self.election.important_dates.all()
    
    def perform_create(self,serializer):
        return serializer.save(election=self.election)
    
    def perform_update(self,serializer):
         return serializer.save(election=self.election)


class CandidatesViewSet(ElectionMixin,viewsets.ModelViewSet):
    permission_classes = [IsOrganizerOrCandidateWriteOnly]
    serializer_class = CandidateReadSerializer
    authentication_classes=default_authentication_classes
    
    def get_serializer_class(self):
        if self.action =="create":
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
    permission_classes = [ElectionOrganizerWritePermission]
    serializer_class = PositionSerializer
    lookup_field="postion_slug"
    authentication_classes=default_authentication_classes

    def get_queryset(self):
        return self.election.positions.all()
    
    def perform_create(self,serializer):
        return serializer.save(election=self.election)
    
    def perform_update(self,serializer):
         return serializer.save(election=self.election)
    


class FAQViewSet(ElectionMixin,viewsets.ModelViewSet):
    permission_classes = [ElectionOrganizerWritePermission]
    serializer_class = FaqSerializer
    authentication_classes=default_authentication_classes

    def get_queryset(self):
        return self.election.faqs.all()
    
    def perform_create(self,serializer):
        return serializer.save(election=self.election)
    
    def perform_update(self,serializer):
         return serializer.save(election=self.election)


















# def response_with_id_and_election(name_slug,data,Serializer,id,ModelClass):
#     election_id = Election.objects.get(name_slug=name_slug).id
#     data['election'] = election_id
#     obj = ModelClass.objects.get(pk=id,election__name_slug=name_slug)
#     serializer = Serializer(obj, data=data,partial=True)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)

# def response_with_election(name_slug,data,Serializer):
#     election_id = Election.objects.get(name_slug=name_slug).id
#     _mutable = data._mutable
#     data._mutable = True
#     data['election'] = election_id
#     data._mutable = _mutable
#     obj = Serializer(data=data)
#     if obj.is_valid():
#         obj.save()
#         return Response(obj.data)
#     else:
#         print(obj.errors)
#     return Response({f'{obj} has invalid format. Check whether all field names that are required are correct and present.\n Following errors were present: {obj.errors}!'}, status=status.HTTP_400_BAD_REQUEST)

# def response_with_id_and_election(data,Serializer,ModelClass,name_slug,**kwargs):
#     election_id = Election.objects.get(name_slug=name_slug).id
#     _mutable = data._mutable
#     data._mutable = True
#     data['election'] = election_id
#     data._mutable = _mutable
#     obj = ModelClass.objects.get(**kwargs)
#     serializer = Serializer(obj, data=data,partial=True)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
#     return Response({f'{obj} has invalid format. Check whether all field names that are required are correct and present.'}, status=status.HTTP_400_BAD_REQUEST)


# class all_positions(APIView):
#     permission_classes = [ElectionOrganizerWritePermission]

#     def get(self,request,name_slug):
#         position_name = request.query_params.get('position_name')
#         print(position_name)
#         if position_name:
#             try:
#                 position = Position.objects.get(title=position_name,election__name_slug=name_slug)
#                 serialized_position = PositionSerializer(position)
#                 return Response(serialized_position.data)
#             except Exception as e:
#                 print("Exception raised in all_positions!")
#                 print(e)
#                 return Response({f'{position_name} does not exist!'}, status=status.HTTP_400_BAD_REQUEST)
#         else:
#             position = Position.objects.filter(election__name_slug=name_slug)
#         serialized_position = PositionSerializer(position,many=True)
#         return Response(serialized_position.data)

#     def post(self,request,name_slug):           
#         try:
#             return response_with_election(name_slug,request.data,PositionSerializer)
#         except Exception as e:
#             print(e)
#             return Response({f'{name_slug} does not exist!'}, status=status.HTTP_400_BAD_REQUEST)
#         return Response({f'{name_slug} does not exist!'}, status=status.HTTP_400_BAD_REQUEST)

#     def patch(self, request,name_slug,format=None):
#         position_name = request.query_params.get('position_name')
#         if position_name:
#             try:                                                                                                                                                                                                                                                                    
#                 return response_with_id_and_election(request.data,PositionSerializer,Position,name_slug,title=position_name,election__name_slug=name_slug)            
#             except Exception as e:
#                 return Response({f'{name_slug} does not exist!'}, status=status.HTTP_400_BAD_REQUEST)
#         return Response({f'{position_name} does not exist!'}, status=status.HTTP_400_BAD_REQUEST)
        
#     def delete(self, request,name_slug, format=None):

#         position_name = request.query_params.get('position_name')
#         if position_name:
#             position = Position.objects.get(election__name_slug=name_slug,title=position_name)
#             position.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)




# class all_candidates(APIView):
#     def get(self,request,name_slug):
#         candidate = Candidate.objects.filter(election__name_slug=name_slug)
#         serialized_candidate = CandidateSerializer(candidate,many=True)
#         return Response(serialized_candidate.data)

# class candidate_post(APIView):
#     parser_classes = [MultiPartParser]

#     def post(self,request,name_slug):                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
#         try:
#             return response_with_election(name_slug,request.data,CandidatePostSerializer)
#         except Exception as e:
#             print(e)
#             return Response({f'{name_slug} does not exist!'}, status=status.HTTP_400_BAD_REQUEST)
#         return Response(candidate.errors, status=status.HTTP_400_BAD_REQUEST)

# class candidate_detail(APIView):
#     parser_classes = [MultiPartParser]

#     def get(self,request,name_slug):
#         email = request.query_params.get('email')
#         position_name = request.query_params.get('position_name')
#         # print(email,position_name)
#         if position_name and email:
#             try:
#                 candidate = Candidate.objects.get(election__name_slug=name_slug,user__email=email,position__title=position_name)
#                 serialized_candidate = CandidateSerializer(candidate)
#                 return Response(serialized_candidate.data)
#             except Exception as e:
#                 print(e)
#                 return Response({f'{position_name or email} does not exist!'}, status=status.HTTP_400_BAD_REQUEST)
#         return Response({f'Either the email or position_name is {position_name or email}!'}, status=status.HTTP_400_BAD_REQUEST)

#     # def patch(self, request,name_slug,format=None):
#     #     position_name = request.query_params.get('position_name')
#     #     if position_name:
#     #         try:
#     #             return response_with_id_and_election(request.data,PositionSerializer,Position,name_slug,title=position_name,election__name_slug=name_slug)            
#     #         except Exception as e:
#     #             return Response({f'{name_slug} does not exist!'}, status=status.HTTP_400_BAD_REQUEST)
#     #     return Response({f'{position_name} does not exist!'}, status=status.HTTP_400_BAD_REQUEST)

#     def patch(self, request,name_slug,format=None):
#         email = request.query_params.get('email')
#         position_name = request.query_params.get('position_name')
#         if position_name and email:
#             try:
#                 return response_with_id_and_election(request.data,CandidatePostSerializer,Candidate,name_slug,election__name_slug=name_slug,user__email=email,position__title=position_name)
#             # except Exception as e:
#             #     return Response({f'{name_slug} does not exist!'}, status=status.HTTP_400_BAD_REQUEST)
#             # try:
#             #     candidate = Candidate.objects.get(election__name_slug=name_slug,user__email=email,position__title=position_name)
#             #     serialized_candidate = CandidatePostSerializer(candidate,data=request.data,partial=True)
#             #     if serialized_candidate.is_valid():
#             #         serialized_candidate.save()
#             #     return Response(serialized_candidate.data)
#             except Exception as e:
#                 print(e)
#                 return Response({f'Error: {e}'}, status=status.HTTP_400_BAD_REQUEST)
#         return Response({f'{position_name or email} does not exist!'}, status=status.HTTP_400_BAD_REQUEST)
        

#     def delete(self, request,name_slug, format=None):
#         email = request.query_params.get('email')
#         position_name = request.query_params.get('position_name')
#         if position_name and email:
#             try:
#                 candidate = Candidate.objects.get(election__name_slug=name_slug,user__email=email,position__title=position_name)
#                 serialized_candidate = CandidatePostSerializer(candidate)
#                 candidate.delete()
#                 return Response({"Sucess":"Data Deleted"})
#             except Exception as e:
#                 return Response({f'{position_name or email} does not exist!'}, status=status.HTTP_400_BAD_REQUEST)
#         return Response({f'{position_name or email} does not exist!'}, status=status.HTTP_400_BAD_REQUEST)

# class all_eusers(APIView):
#     permission_classes = [ElectionOrganizerWritePermission]

#     def get(self,request,name_slug):
#         euser = EUser.objects.all()
#         serialized_euser = EuserSerializer(euser,many=True)
#         return Response(serialized_euser.data)

#     def post(self,request,name_slug):  
#         try:
#             return response_with_election(name_slug,request.data,EuserSerializer)
#         except Exception as e:
#             return Response({f'{name_slug} does not exist!'}, status=status.HTTP_400_BAD_REQUEST)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
#         # euser = EuserSerializer(data=request.data)
#         # if euser.is_valid():
#         #     euser.save()
#         #     return Response(euser.data)
#         return Response(euser.errors, status=status.HTTP_400_BAD_REQUEST)


# # class euser_detailed(APIView):
# #     permission_classes = [ElectionOrganizerWritePermission]

# #     def get(self,request,name_slug,id):
# #         # print(id)
# #         important_dates = Imporatant_date.objects.get(pk=id,election__name_slug=name_slug)
# #         serialized_important_dates = ImportantdateSerializer(important_dates)
# #         return Response(serialized_important_dates.data)

# #     def patch(self, request,name_slug,id,format=None):
# #         date = Imporatant_date.objects.get(pk=id,election__name_slug=name_slug)
# #         serializer = ImportantdateSerializer(date, data=request.data,partial=True)
# #         if serializer.is_valid():
# #             serializer.save()
# #             return Response(serializer.data)
# #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# #     def delete(self, request,name_slug,id, format=None):
# #         date = Imporatant_date.objects.get(pk=id,election__name_slug=name_slug)
# #         date.delete()
# #         return Response(status=status.HTTP_204_NO_CONTENT) 

# class all_faqs(APIView):
#     permission_classes = [ElectionOrganizerWritePermission]

#     def get(self,request,name_slug):
#         faq = Faq.objects.filter(election__name_slug=name_slug)
#         serialized_faq = FaqSerializer(faq,many=True)
#         return Response(serialized_faq.data)

#     def post(self,request,name_slug):       
#         try:
#             return response_with_election(name_slug,request.data,FaqSerializer)
#         except Exception as e:
#             return Response({f'{name_slug} does not exist!'}, status=status.HTTP_400_BAD_REQUEST)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
#         # faq = FaqSerializer(data=request.data)
#         # if faq.is_valid():
#         #     faq.save()
#         #     return Response(faq.data)
#         return Response(faq.errors, status=status.HTTP_400_BAD_REQUEST)


# class faq_detailed(APIView):
#     permission_classes = [ElectionOrganizerWritePermission]

#     def get(self,request,name_slug,id):
#         try:
#             faq = Faq.objects.get(pk=id,election__name_slug=name_slug)
#         except Exception as e:
#                 return Response({f'{id} does not exist!'}, status=status.HTTP_400_BAD_REQUEST)
#         serialized_faq = FaqSerializer(faq)
#         return Response(serialized_faq.data)

#     def patch(self, request,name_slug,id,format=None):
#         try:
#             return response_with_id_and_election(request.data,FaqSerializer,Faq,name_slug,pk=id,election__name_slug=name_slug)
#         # try:
#         #     faq = Faq.objects.get(pk=id,election__name_slug=name_slug)
#         #     serialized_faq = FaqSerializer(faq, data=request.data,partial=True)
#         #     if serialized_faq.is_valid():
#         #         serialized_faq.save()
#         #         return Response(serialized_faq.data)
#         except Exception as e:
#                 return Response({f'{id} does not exist!'}, status=status.HTTP_400_BAD_REQUEST)
#         return Response(serialized_faqstatus=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request,name_slug,id, format=None):
#         try:
#             faq = Faq.objects.get(pk=id,election__name_slug=name_slug)
#         except Exception as e:
#                 return Response({f'{id} does not exist!'}, status=status.HTTP_400_BAD_REQUEST)
#         faq.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT) 
