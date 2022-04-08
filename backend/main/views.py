from django.shortcuts import get_object_or_404
from .serializers import *
from .models import *
from rest_framework.response import Response
from rest_framework import status,mixins,generics,viewsets,permissions
from .permissions import ElectionOrganizerWritePermission,IsOrganizerOrCandidateWriteOnly
from dj_rest_auth.jwt_auth import JWTAuthentication
from .mixins import ElectionMixin
from authentication.default_authentication_classes import default_authentication_classes

from io import BytesIO
from xhtml2pdf import pisa
from django.template.loader import get_template
from django.http import HttpResponse
from django.core.files.base import ContentFile

from django.views.generic.base import View
# from wkhtmltopdf.views import PDFTemplateResponse


def create_pdf(request, name_slug, template_src, instance):
    template = get_template(template_src)
    html  = template.render({**instance.__dict__})
    temp_dict = {**instance.__dict__, **instance.user.__dict__, **instance.position.__dict__, **instance.election.__dict__}
    temp_dict['election_name'] = temp_dict['name']
    temp_dict['name'] = instance.user.name
    cur_url = request.build_absolute_uri()
    cur_url = cur_url[:cur_url.find(name_slug)]
    cur_url += 'media/'
    base_url = 'https://swc.iitg.ac.in/elections_api/media/'
    candidate_url = base_url + str(instance.image)
    temp_dict['image'] = candidate_url

    print(candidate_url)
    # print("#####")
    # print(temp_dict['sign'])
    # print(cur_url)
    # print("#####")
    # temp_dict['sign'] = cur_url + temp_dict['sign']
    # temp_dict['image'] = cur_url + temp_dict['image']
    html  = template.render(temp_dict)
    # print(html)
    result = BytesIO()

    # pdf = pisa.pisaDocument(BytesIO(html.encode("ISO-8859-1")), result)
    pdf = pisa.pisaDocument(BytesIO(html.encode("UTF-8")), result)
    # print(pdf)
    if not pdf.err:
        instance.agenda_pdf.save(instance.user.name + '-agenda.pdf', ContentFile(result.getvalue()))
        # instance.agenda_pdf.save(instance.user.email + '-agenda.pdf', ContentFile(result.getvalue()))
        # print(instance.user.name + 'agenda.pdf')
        # return HttpResponse(result.getvalue(), content_type='application/pdf')
    return HttpResponse('We had some errors<pre></pre>')



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
    serializer_class = CandidateSerializer
    authentication_classes=default_authentication_classes
    
    def get_serializer_class(self):
        if self.action in ["create",'update']:
            try:
                is_organizer = self.election.organizers.filter(user__id=self.request.user.euser.id).exists()
            except:
                is_organizer=False
            if is_organizer:
                return CandidateOrganizerSerializer
            return CandidateSerializer
        return CandidateReadSerializer
    
    def get_queryset(self):
        try:
            is_organizer = Voter.objects.filter(election_organizers__id=self.election.id,user__id=self.user.euser.id).exists()
        except Exception as err:
            is_organizer=False

        print(list(self.election.candidates_e.all())[0])
        # print(self.)
        # create_pdf('for_pdf.html', list(self.election.candidates_e.all())[0])
        
        candidates = self.election.candidates_e.all()
        if is_organizer:
            return candidates.filter(nomination_complete=True)
        return candidates
    
    def perform_create(self,serializer):
        return serializer.save(election=self.election,user=self.request.user.euser)
    
    def perform_update(self,serializer):
        instance=serializer.save(election=self.election)
        create_pdf('for_pdf.html', instance)
        return instance
    
    def create(self,request,*args,**kwargs):
        is_registered = self.election.candidates_e.filter(user=request.user.euser,position=request.data.get("position"))
        if is_registered:
            return Response({"detail":"Candidate Already Registered"},status=status.HTTP_400_BAD_REQUEST)
        return super(CandidatesViewSet,self).create(request,*args,**kwargs)


class CandidateAgendaPdf(generics.GenericAPIView):
    permission_classes=[permissions.IsAuthenticated]
    authentication_classes=default_authentication_classes

    def get(self,request,name_slug,id):
        try:
            instance = Candidate.objects.get(id=id)
            
        except Exception as e:
            return HttpResponse({"some error has occured in CandidateAgendaPdf"})
        create_pdf(request, name_slug, 'for_pdf.html', instance)
        temp_dict = {**instance.__dict__, **instance.user.__dict__, **instance.position.__dict__, **instance.election.__dict__}
        # temp_dict = {**instance.__dict__}
        temp_dict['election_name'] = temp_dict['name']
        temp_dict['name'] = instance.user.name
    	#data  = {"mydata":"your data"} # data that has to be renderd to pdf templete 
        
        # response = PDFTemplateResponse(request=request,
        #                                 template='for_pdf.html',
        #                                 filename="agenda.pdf",
        #                                 context= temp_dict,
        #                                 show_content_in_browser=False,
        #                                 cmd_options={'margin-top': 10,
        #                                 "zoom":1,
        #                                 "viewport-size" :"1366 x 513",
        #                                 'javascript-delay':1000,
        #                                 'footer-center' :'[page]/[topage]',
        #                                 "no-stop-slow-scripts":True},
        #                                 )
        # return response
        return HttpResponse(instance.agenda_pdf, content_type='application/pdf')
    
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


class CredentialCreateAPIView(ElectionMixin,generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CredentialSerializer
    authentication_classes=default_authentication_classes


class IsOrganizerView(ElectionMixin,generics.GenericAPIView):
   permission_classes=[permissions.IsAuthenticated]
   authentication_classes=default_authentication_classes

   def get(self,request,*args,**kwargs):
        try:
           is_organizer=self.election.organizers.filter(user__id=self.request.user.euser.id).exists()
        except:
           is_organizer=False
        
        return Response({'isOrganizer':is_organizer},status=status.HTTP_200_OK)
        
