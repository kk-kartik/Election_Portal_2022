import csv
import time
from django.http import StreamingHttpResponse
from django.shortcuts import get_object_or_404
from .serializers import *
from .models import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status,mixins,generics,viewsets,permissions
from .permissions import ElectionOrganizerWritePermission,IsOrganizerOrCandidateWriteOnly,OnlyOrganizerOrCandidate,CandidateDeadlinePermissions,OnlyOrganizerUpdate,OnlyOrganizerOrCandidateUpdate
from dj_rest_auth.jwt_auth import JWTAuthentication
from .mixins import ElectionMixin
from authentication.default_authentication_classes import default_authentication_classes
from rest_framework.views import APIView
from django.core.mail import send_mail
from django.core.mail import EmailMessage
from .data_variable import data
from io import BytesIO
from xhtml2pdf import pisa
from django.template.loader import get_template
from django.http import HttpResponse
from django.core.files.base import ContentFile
from django.db.models import Q
from django.shortcuts import render
from django.views.generic.base import View
import json
from django.contrib.auth.models import User
# from wkhtmltopdf.views import PDFTemplateResponse
from django.core.exceptions import ObjectDoesNotExist
from django.conf import settings
from django.template import Context
from encryption.utils import decrypt
# from .jdata import jdata
import os
# BASE_DIR = Path(__file__).resolve().parent.parent
from django.views import View


def populate_data(request,name_slug,cnt):


    path = settings.BASE_DIR/'main'/'static'/'agenda.json'
    jdata = open(path)
    data = json.load(jdata)


    dict_data = {}

    for key,value in data['Name2'].items():
        dict_data[key] = {"name":value}

    for key,value in data['Agenda 1'].items():
        dict_data[key]['1'] = value

    for key,value in data['Agenda 2'].items():
        dict_data[key]['2'] = value

    for key,value in data['Agenda 3'].items():
        dict_data[key]['3'] = value

    for key,value in data['Agenda 4'].items():
        dict_data[key]['4'] = value

    i=0
    for key,values in dict_data.items():
        i += 1
        if i == cnt:
            break
        try:
            candidate = Candidate.objects.get(user__name__iexact=values['name'])
            candidate.top_4_agenda_text = {
                '1':'',
                '2':'',
                '3':'',
                '4':''
            }
            candidate.top_4_agenda_text['1'] = values['1']
            candidate.top_4_agenda_text['2'] = values['2']
            candidate.top_4_agenda_text['3'] = values['3']
            candidate.top_4_agenda_text['4'] = values['4']
            candidate.save() 

        except Exception as e:
            print(e)

    # i = 0
    # for key,values in data['IITG_Email_Updated'].items():
    #     i += 1
    #     if i == cnt:
    #         break
    #     email = values + "@iitg.ac.in"
    #     try:
    #         user = User.objects.get(email=email)
    #         user.email = email
    #         user.username = email
    #     except ObjectDoesNotExist:
    #         user = User(email = email ,username=email)
    #         user.save()
    #     except Exception as e:
    #         print(e)

    # dict_data = {}

    # for key,value in data['Roll No'].items():
    #     dict_data[key] = {"roll_number":value}

    # for key,value in data['Name'].items():
    #     dict_data[key]['name'] = value

    # for key,value in data['IITG_Email_Updated'].items():
    #     dict_data[key]["email"] = value + "@iitg.ac.in"
    

    # for key,value in data['Gender'].items():
    #     dict_data[key]["gender"] = value

    # i = 0
    # for key,values in dict_data.items():
    #     i += 1
    #     if i == cnt:
    #         break
    #     try:
    #         euser = EUser.objects.get(user__email=values['email'])
    #         euser.name = values['name']
    #         euser.roll_number = values['roll_number']
    #         euser.gender = values['gender']
    #         euser.email = values['email']
    #         euser.save() 

    #     except Exception as e:
    #         print(e)
    return HttpResponse("data populated kaam ho gya")

    

BRANCH = {
    'None':"None",
    '01': 'CSE',
    '02': 'ECE',
    '03': 'ME',
    '04': 'Civil',
    '05': 'Design',
    '06': 'BSBE',
    '07': 'CL',
    '08': 'EEE',
    '21': 'Physics',
    '22': 'Chemistry',
    '23': 'MNC',
    '41': 'HSS',
    '51': 'Energy',
    '52': 'Environment',
    '53': 'Nano-Tech',
    '54': 'Rural-Tech',
    '55': 'Linguistics',
	'61': 'Others',
}

DEGREE = {
    'M':'Mtech', 
    'B':'Btech',
    'P':"PG",
    "Msc":"Msc",
    "Mdes":"Mdes",
    "Bdes":"Bdes",
    "Dual":"Dual Degree",
    "MA":"MA",
    "MSR":"MSR"
}

HOSTELS = {
    'lohit': 'Lohit',
    'brahmaputra': 'Brahmaputra',
    'siang': 'Siang',
    'manas': 'Manas',
    'dibang': 'Dibang',
    'disang': 'Disang',
    'kameng': 'Kameng',
    'umiam': 'Umiam',
    'barak': 'Barak',
    'kapili': 'Kapili',
    'dihing': 'Dihing',
    'subansiri': 'Subansiri',
    'dhansiri': 'Dhansiri',
    'dibang': 'Dibang',
    'msh': 'Married Scholar Hostel',
    'not-alloted': 'Not Alloted',
}

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
    mbranch = BRANCH[instance.user.branch]
    pbranch = instance.proposed_by['branch']
    sbranch = instance.seconded_by['branch']
    mhostel = HOSTELS[instance.user.hostel]
    phostel = instance.proposed_by['hostel']
    shostel = instance.seconded_by['hostel']
    temp_dict['mbranch'] = mbranch
    temp_dict['pbranch'] = pbranch
    temp_dict['sbranch'] = sbranch
    temp_dict['mhostel'] = mhostel
    temp_dict['phostel'] = phostel
    temp_dict['shostel'] = shostel
    print(mhostel,phostel,shostel)

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
    # print(pdf)from rest_framework.views import APIView
    if not pdf.err:
        instance.agenda_pdf.save(str(instance.user.name) + '-agenda.pdf', ContentFile(result.getvalue()))
        # instance.agenda_pdf.save(instance.user.email + '-agenda.pdf', ContentFile(result.getvalue()))
        # print(instance.user.name + 'agenda.pdf')
        # return HttpResponse(result.getvalue(), content_type='application/pdf')
    return HttpResponse('We had some errors<pre></pre>')



class PositionCandidatesView(ElectionMixin,generics.ListAPIView):
    serializer_class=CandidateDetailSerializer
    permission_classes=[permissions.AllowAny]
    authentication_classes =default_authentication_classes
    
    def get_queryset(self):
        position = get_object_or_404(Position,pk=self.kwargs.get("position_id"))

        return self.election.candidates_e.filter(position__id=position.id).exclude(
                    Q(cpi=None)|
                    Q(user__roll_number=None)|
                    Q(user__email=None)|
                    Q(backlogs=None)|
                    Q(active_backlogs=None)|
                    Q(semester=None)|
                    Q(contact_no=None)|
                    Q(nomination_status="rejected")|
                    Q(video=None)|
                    Q(image=None)|
                    Q(agenda_text=None)|
                    Q(user__name=None) |
                    Q(position__id = 3)
                )

class RegistrationCompleteView(ElectionMixin,generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated,CandidateDeadlinePermissions]
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
        candidates_data = CandidateReadSerializer(candidates,many=True,context=self.get_serializer_context()).data
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
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,OnlyOrganizerUpdate]
    authentication_classes=default_authentication_classes
    
    def get_queryset(self):
        candidates = self.election.candidates_e.all()
        return candidates.exclude(
                    Q(cpi=None)|
                    Q(user__roll_number=None)|
                    Q(user__email=None)|
                    Q(backlogs=None)|
                    Q(active_backlogs=None)|
                    Q(semester=None)|
                    Q(contact_no=None)|
                    Q(nomination_status="rejected")
                )
                
    def get_serializer_class(self):
        if self.action in ["create","destroy","update"]:
            return CandidateSerializer
        
        if self.action =="list":
            try:
                user = self.request.user
                election = self.election
                euser = user.euser
                is_organizer = user.is_staff
            except Exception as err:
                is_organizer=False
            
            if is_organizer:
                return CandidateReadSerializer

        if self.action =="retrieve":     
            try:
                user = self.request.user
                election = self.election
                euser = user.euser
                candidates = election.candidates_e.filter(user=euser)
                is_candidate = candidates.filter(pk=obj.id).exists()
            except Exception as err:
                is_candidate=False
            
            try:
                is_organizer = user.is_staff
            except Exception as err:
                is_organizer=False
            
            if is_candidate or is_organizer:
                return CandidateReadSerializer

        return CandidateBriefSerializer
    
    def perform_create(self,serializer):
        return serializer.save(election=self.election,user=self.request.user.euser)
    
    def perform_update(self,serializer):
        instance=serializer.save(election=self.election)
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
            if not request.user.is_staff and instance.user.user.id != request.user.id:
                return HttpResponse("Invalid Access")

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

# email_ind = 0
# emails_list = settings.EMAIL_HOST_USER
def send_email(remail,subject,message):
    # global email_ind
    # global emails_list
    # print(emails_list)
    email = EmailMessage(
        subject = subject,
        body=message,
        from_email="swc@iitg.ac.in",
        to=[remail],
    )
    email.content_subtype = 'html'
    try:
        email.send(fail_silently=False)
        # return HttpResponseRedirect(reverse('apply:success'))
    except Exception as e:
        print('mail not sent',e)
    # email.content_subtype = 'html'
    # try:
    #     email.send()
    #     email_ind += 1
    #     email_ind %= len(emails_list)
    #     settings.EMAIL_HOST_USER = emails_list[email_ind]
    #     settings.EMAIL_HOST_PASSWORD = settings.EMAIL_HOST_PASSWORDS[email_ind]
    # except Exception as e:
    #     print('Error in sending mail, trying next email!',e)
    #     email_ind += 1
    #     email_ind %= len(emails_list)
    #     print(email_ind)
    #     settings.EMAIL_HOST_USER = emails_list[email_ind]
    #     settings.EMAIL_HOST_PASSWORD = settings.EMAIL_HOST_PASSWORDS[email_ind]
    #     send_email(remail,subject,message)


# def send_email(remail,uniqueid_email):
#     message = get_template("otp.html").render({
#         'otp':uniqueid_email
#     })
#     email = EmailMessage(
#         subject='OTP < ' + str(uniqueid_email) + ' >',
#         body=message,
#         from_email='sgcelectionsiitg@gmail.com',
#         to=[remail],
#     )
#     print(uniqueid_email)
#     print(remail)
#     email.content_subtype = 'html'
#     try:
#         email.send(fail_silently=False)
#         # return HttpResponseRedirect(reverse('apply:success'))
#     except Exception as e:
#         print('mail not sent',e)

@api_view(['POST'])
def voter_card(request,name_slug):
    if request.method == 'POST':
        try:
            email = request.data['email']
            email = email.lower()
            print(email)
        except Exception as e:
            print(e)
            return Response({'Expected "email" key as a json object!'},status=status.HTTP_400_BAD_REQUEST)
        if not email in data:
            return Response({'Not a valid voting email!'},status=status.HTTP_400_BAD_REQUEST)
        voter_obj = Voter.objects.filter(user__email=email)
        if not voter_obj:
            euser = EUser.objects.filter(email=email)
            if not euser:
                return Response({'Incomplete registration'},status=status.HTTP_400_BAD_REQUEST)
            else:
                euser = euser[0]
                voter_obj = Voter(election_id=1,user=euser)
                voter_obj.save()
                voter_obj = Voter.objects.get(user__email=email)
        else:
            voter_obj = voter_obj[0]

        hostel = voter_obj.user.hostel
        branch = voter_obj.user.branch
        if not (hostel and branch):
            return Response({'Incomplete registration'},status=status.HTTP_400_BAD_REQUEST)
        is_voted = voter_obj.is_voted
        if is_voted:
            return Response({'Already Voted!'},status=status.HTTP_400_BAD_REQUEST)
        voter_card = VoterCard.objects.filter(voter__id=voter_obj.id)
        if not voter_card:
            voter_card = VoterCard(voter=voter_obj)
            voter_card.save()
        else:
            voter_card = voter_card[0]
        uniqueid_email = voter_card.uniqueid_email
        message = get_template("otp.html").render({
            'otp':uniqueid_email
        })
        subject='OTP [' + str(uniqueid_email) + ']'
        print('email sent')
        send_email(email,subject,message)
        serialized_voter = VoterSerializer(voter_obj)
        return Response(serialized_voter.data)

@api_view(['POST'])
def get_voter_id(request,name_slug):
    if request.method == 'POST':
        try:
            otp = request.data['otp']
        except Exception as e:
            print(e)
            return Response({'Expected "otp" keys as a json object!'},status=status.HTTP_400_BAD_REQUEST)
        voter_card_obj = VoterCard.objects.filter(uniqueid_email=otp)
        if not voter_card_obj:
             return Response({'No voter id exists with this OTP!'},status=status.HTTP_400_BAD_REQUEST)
        else:
            voter_card_obj = voter_card_obj[0]
            voterid = voter_card_obj.uniqueid
            return Response({'status':True,'voterid':voterid})

@api_view(['POST'])
def voter_card_check(request,name_slug):
    if request.method == 'POST':
        try:
            uniqueid = request.data['voterid']
        except Exception as e:
            print(e)
            return Response({"Expected 'voterid' keys as a json object!"},status=status.HTTP_400_BAD_REQUEST)
        voter_card_obj = VoterCard.objects.filter(uniqueid=uniqueid)
        if not voter_card_obj:
            return Response({'No voter card exists, call voterid to create one!'},status=status.HTTP_400_BAD_REQUEST)
        else:
            voter_card_obj = voter_card_obj[0]
            voter = voter_card_obj.voter
            if voter is None:
                return Response({'Already voted!'},status=status.HTTP_400_BAD_REQUEST)
            email = voter.user.email
            if not email in data:
                return Response({f"Not a valid email {email}!"},status=status.HTTP_400_BAD_REQUEST)

            if not voter.is_voted:
                return Response({
                        'gender': voter.user.gender,
                        'degree': voter.user.degree,
                        'voterid': uniqueid,
                        'status':True,
                    })
            else:
                return Response({'Invalid voter!'},status=status.HTTP_400_BAD_REQUEST)


def get_hostel():
    return {
        'lohit':0,
        'brahmaputra':0,
        'siang':0,
        'manas':0,
        'dibang':0,
        'disang':0,
        'kameng':0,
        'umiam':0,
        'barak':0,
        'kapili':0,
        'dihing':0,
        'subansiri':0,
        'dhansiri':0,
        'dibang':0,
        'msh': 0,
        'not-alloted':0
    }

def get_branch():
    return {
        'None':0,
        '01': 0,
        '02': 0,
        '03': 0,
        '04': 0,
        '05': 0,
        '06': 0,
        '07': 0,
        '08': 0,
        '21': 0,
        '22': 0,
        '23': 0,
        '41': 0,
        '51': 0,
        '61': 0,
    }

def handle_stats(stat_title, stat_key, default_func):
    if not stat_key:
        return False
    stats = Statistic.objects.filter(stat_title=stat_title)
    if not stats:
        default_stat = default_func()
        new_stat = Statistic(
            election_id=1,
            stat_title=stat_title,
            stat_total=default_stat,
            stat_cnt=default_stat
        )
        new_stat.save()
        stats = Statistic.objects.filter(stat_title=stat_title)[0]
    else:
        stats = stats[0]
    stat_cnt = stats.stat_cnt
    others = ['52','53','54','55','None']
    if stat_key in others:
        stat_cnt['61'] = int(stat_cnt['61']) + 1
    else:
        stat_cnt[stat_key] = int(stat_cnt[stat_key]) + 1
    stats.stat_cnt = stat_cnt
    stats.save()
    return True

def update_stats(email):
    if not email in data:
        return 400

    user_obj = EUser.objects.filter(email=email)
    if not user_obj:
        return 400
        # return Response({'User is not registered.'},status=status.HTTP_400_BAD_REQUEST)
    else:
        user_obj = user_obj[0]
        hostel = user_obj.hostel
        branch = user_obj.branch
        hostel_ok = handle_stats("Hostel",hostel,get_hostel)
        branch_ok = handle_stats("Branch",branch,get_branch)
        if hostel_ok and branch_ok:
            return 200
        return 400
        # return Response({'status':'true'})

@api_view(['POST'])
def store_vote(request,name_slug):
    if request.method == 'POST':
        try:
            uniqueid = request.data['voterid']
            vote = request.data['vote']
        except Exception as e:
            print(e)
            return Response({"Expected 'voterid' and 'vote' keys as a json object!"},status=status.HTTP_400_BAD_REQUEST)
        voter_card_obj = VoterCard.objects.filter(uniqueid=uniqueid)
        if not voter_card_obj:
            return Response({'No voter card exists, call voterid to create one!'},status=status.HTTP_400_BAD_REQUEST)
        else:
            voter_card_obj = voter_card_obj[0]
            voter = voter_card_obj.voter
        
        if voter is None:
            return Response({'Already voted!'},status=status.HTTP_400_BAD_REQUEST)
        email = voter.user.email
        if not email in data:
            return Response({'Not a valid voting email!'},status=status.HTTP_400_BAD_REQUEST)
        else:
            if not voter.is_voted:
                voter_card_obj.vote = vote
                status_stats = update_stats(voter.user.email)
                if status_stats == 400:
                    return Response({'User is not registered.'},status=status.HTTP_400_BAD_REQUEST)
                voter.is_voted = True
                voter_name = voter.user.name
                voter.save()
                message = get_template("congratulations.html").render({
                    'name':voter_name
                })
                subject='Thanks for casting your vote!'
                send_email(email,subject,message)
                voter_card_obj.voter = None
                voter_card_obj.uniqueid_email = "None"
                voter_card_obj.save()
                return Response({'status':'Vote stored succesfully.'})
            else:
                return Response({'Voter has already voted!'},status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
def get_stats(request,name_slug):
    if request.method == 'GET':
        # func()
        stats = Statistic.objects.all()
        serializer = StatsSerializer(stats,many=True)
        return Response(serializer.data)

@api_view(['POST'])
def get_eprofile(request,name_slug):
    if request.method == 'POST':
        try:
            email = request.data['email']
        except Exception as e:
            print(e)
            return Response({'Expected "email" key as a json object!'},status=status.HTTP_400_BAD_REQUEST)
        if not email in data:
            return Response({'Not a valid voting email!'},status=status.HTTP_400_BAD_REQUEST)
        
        euser = EUser.objects.filter(email=email)
        if not euser:
            return Response({'User not registered!'},status=status.HTTP_400_BAD_REQUEST)
        else:
            euser = euser[0]

        if euser.degree == 'Bdes' or euser.degree == 'B':
            voter_type_prefix = 'UG'
        else:
            voter_type_prefix = 'PG'
        voter_type = f'{voter_type_prefix} ({euser.gender})'
        year = f'20{euser.roll_number[:2]}'
        img_url = f'https://online.iitg.ac.in/sprofile/GALLERY/{year}/PHOTO/{euser.roll_number}_P.jpg'
        print(img_url)
        print(year)
        print(voter_type)
        payload_data = {
            'img_url': img_url,
            'name': euser.name,
            'roll_no': euser.roll_number,
            'voter_type': voter_type,
            'hostel': euser.hostel,
            'branch': euser.branch,
            'gender': euser.gender,
            'degree': euser.degree,

        }
        return Response(payload_data)

class StatisticsView(ElectionMixin,viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,ElectionOrganizerWritePermission]
    serializer_class = StatsSerializer
    authentication_classes=default_authentication_classes

    def get_queryset(self):
        return self.election.statistics.all()
    
    def perform_create(self,serializer):
        return serializer.save(election=self.election)
    
    def perform_update(self,serializer):
         return serializer.save(election=self.election)

class StatisticsUpdateView(ElectionMixin,viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,ElectionOrganizerWritePermission]
    serializer_class = StatsSerializer
    authentication_classes=default_authentication_classes

    def get_queryset(self):
        return self.election.statistics.all()
    
    def perform_create(self,serializer):
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
        

class DownloadNominations(ElectionMixin,generics.GenericAPIView):
    authentication_classes=default_authentication_classes
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self,request,*args,**kwargs):
        return HttpResponse("done")

class DownloadNominations(ElectionMixin,generics.GenericAPIView):
    authentication_classes=default_authentication_classes
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self,request,*args,**kwargs):
        if not request.user.is_staff:
            return HttpResponse("Invalid access")
        election = self.election
        candidates = election.candidates_e.exclude(
            Q(cpi=None)|
            Q(user__roll_number=None)|
            Q(user__email=None)|
            Q(backlogs=None)|
            Q(active_backlogs=None)|
            Q(semester=None)|
            Q(contact_no=None)|
            Q(nomination_status="rejected")
        )

        response = HttpResponse(content_type='text/csv')  
        response['Content-Disposition'] = 'attachment; filename="nominations.csv"'  
        writer = csv.writer(response)
        writer.writerow(["Sr.No","Position","Name","Email","Roll no","Degree","Cpi","Backlogs","Active Backlogs","Credentials","Hostel"])
        for i,candidate in enumerate(candidates.all()):
            # if "Grade Card" not in candidate.credentials.keys() :
            #     continue

            # if not candidate.credentials["Grade Card"]:
            #     continue

            # if candidate.postion.title == "PG Senator":
            #     if "Thesis incomplete proof" not in candidate.credentials.keys() :
            #         continue

            #     if not candidate.credentials["Thesis incomplete proof"]:
            #         continue


            writer.writerow([
                i+1,
                candidate.position.title,
                candidate.user.name,
                candidate.user.email,
                candidate.user.roll_number,
                candidate.user.degree,
                candidate.cpi,
                candidate.backlogs,
                candidate.active_backlogs,
                candidate.credentials,
                candidate.user.hostel
            ])
            
        return response  
    

'''##############################################
Results
#################################################'''
positions=['Vice President, SGC', 'General Secretary HAB', 'General Secretary Welfare Board', 'General Secretary SWC', 'General Secretary Technical Board', 'General Secretary Sports Board', 'General Secretary SAIL', 'UG Senator', 'General Secretary Cultural Board', 'PG Senator', 'Girl Senator']

c_inv_map = {
    "0":"None",
    "-1":"Vice President, SGC,NOTA",
    "-2":"General Secretary HAB,NOTA",
    "-3":"General Secretary Welfare Board,NOTA",
    "-4":"General Secretary SWC,NOTA",
    "-5":"General Secretary Technical Board,NOTA",
    "-6":"General Secretary Sports Board,NOTA",
    "-7":"General Secretary SAIL,NOTA",
    "-8":"UG Senator,NOTA",
    "-9":"General Secretary Cultural Board,NOTA",
    "-10":"PG Senator,NOTA",
    "-12":"Girl Senator,NOTA",
    '17': 'UG Senator,Pranav Nair', 
    '35': 'General Secretary SAIL,Khushi S Karnani', 
    '41': 'UG Senator,Bhavik Chandna',
    '42': 'Vice President, SGC,Yogesh Dewangan', 
    '44': 'PG Senator,Alan Sam Jacob', 
    '45': 'PG Senator,Dhruv Garg',
    '47': 'UG Senator,Anshu Kumar',
    '49': 'Girl Senator,Anakshi Naskar',
    '50': 'General Secretary Welfare Board,Shilpa Krishnan', 
    '51': 'Vice President, SGC,Ritika Jaiswal', 
    '56': 'General Secretary Technical Board,Rajpali Prakhar Jitendra', 
    '57': 'PG Senator,Plabanjyoti Buragohain Phukan', 
    '61': 'PG Senator,Saket Gupta', 
    '62': 'General Secretary Sports Board,Abdulla Shareef', 
    '63': 'UG Senator,Piyush Kumar', 
    '67': 'PG Senator,Yashika', 
    '69': 'PG Senator,Anushka Vashistha', 
    '70': 'UG Senator,Abhijeet Singh Kushwaha', 
    '72': 'PG Senator,Badavath Samrat', '73': 
    'PG Senator,Prasad Jena', 
    '75': 'General Secretary Welfare Board,Ankit Saraf', 
    '76': 'PG Senator,Abhinab Sharma', 
    '77': 'UG Senator,Paide Ashish', 
    '78': 'UG Senator,Bathina Satwika', 
    '79': 'PG Senator,Sajan Kumar Dansena', 
    '80': 'General Secretary Sports Board,Prayag Sahu', 
    '81': 'UG Senator,Pankaj Sharma', 
    '82': 'Vice President, SGC,Pothanolla Adarsh Reddy', 
    '83': 'PG Senator,Kethireddy Bhaskar Rao', 
    '84': 'Vice President, SGC,Ayush Raj', 
    '85': 'Vice President, SGC,Sarthak Saxena', 
    '87': 'Vice President, SGC,Rathod Nishtha Kantibhai', 
    '89': 'PG Senator,Md Afzal Amanullah', '91': 
    'PG Senator,Shekhar Chauhan', '93': 'General Secretary HAB,Aryan Meshram', 
    '96': 'General Secretary Welfare Board,Palak Kothari', '97': 'General Secretary Technical Board,Anshul Kumar', 
    '98': 'Vice President, SGC,Imran Hussain', '99': 'UG Senator,Dhoolam Saichandan', '100': 'PG Senator,Ananthu M S', '101': 'PG Senator,Kartavya Panthi', 
    '102': 'PG Senator,Gaurav Gandhi', '103': 'UG Senator,Gavinolla Pranav Kumar Reddy', '104': 'UG Senator,Guthikonda Srinidhi Reddy', '105': 'PG Senator,Ayush Tyagi', '106': 'PG Senator,Kunal Pant', 
    '107': 'General Secretary HAB,Ishu', '108': 'PG Senator,Adarsh Kumar A Sahu', '109': 'General Secretary Sports Board,Uttam Meena', '110': 'Girl Senator,Neetu Kumari', '111': 'UG Senator,Md Sahil', 
    '112': 'UG Senator,Utsav Gupta', '113': 'General Secretary SWC,Rahul Aggarwal', '115': 'UG Senator,Lakshya Mittal', '116': 'Vice President, SGC,IITG', '118': 'Girl Senator,Durganala Srijanya', 
    '121': 'UG Senator,Jatothu Vamshi', '122': 'PG Senator,Amit Pawar', '123': 'PG Senator,Naveen Kumar Dharavath', '124': 'General Secretary Sports Board,Banavathu Sampath Kumar Naik', 
    '125': 'UG Senator,Niharika Singh', '126': 'PG Senator,Nabati Basu', '127': 'UG Senator,Siddharth Malviya', '128': 'UG Senator,Mohamed Jasim', '129': 'PG Senator,Patel Miki Maheshbhai', 
    '130': 'General Secretary HAB,Yuvraj Siddharth', '131': 'General Secretary Cultural Board,Vedant Joshi', '132': 'General Secretary Technical Board,Manda Sushanth Reddy', '134': 'Girl Senator,Charul Shaharey', 
    '135': 'General Secretary SAIL,Kumar Shaurya', '136': 'PG Senator,Sarnaik Vishwanil Vishwanath', '137': 'UG Senator,Abhishek Kumar', '139': 'UG Senator,Prakhar Shukla', '140': 'PG Senator,TaraÂ\xa0Chand', 
    '141': 'General Secretary HAB,Rajesh Muhal'}



votes={"count":0}
def event_stream():
    votes={"count":0}
    failed=[]
    rv_map = {}
    group_map={}
    for p in positions:
        group_map[p]={}
    voters = VoterCard.objects.exclude(vote=None)
    for voter in voters:
        try:
            vote = decrypt(voter.vote)
            elected_candidates = vote.split(",")
            for candidate_id in elected_candidates:
                if candidate_id not in votes:
                    votes[candidate_id] = 0
                votes[candidate_id]+=1
                candidate = rv_map[candidate_id]
                rv_map[candidate]=votes[candidate_id]

                for p in positions:
                    if candidate.startswith(p):
                        k=candidate.split(",")[-1]
                        if k !="NOTA":
                            group_map[p][k]=votes[candidate_id]

                yield "\ndata: {}\n\n".format(json.dumps(group_map))
        except Exception as err:
            print(repr(err))
            failed+=[voter.uniqueid]
    
        
from django.contrib.auth.decorators import user_passes_test,login_required

@login_required
@user_passes_test(lambda u: u.is_superuser)
def result_stream(request,name_slug):
    response = StreamingHttpResponse(event_stream())
    response['Content-Type'] = 'text/event-stream'
    return response

@login_required
@user_passes_test(lambda u: u.is_superuser)
def result_view(request,name_slug):
    return render(request,"count_vote.html")