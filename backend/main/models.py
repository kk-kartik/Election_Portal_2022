from django.db import models
from datetime import datetime
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save

STATUS_CHOICES = (
    ('pending','To be started'),
    ('ongoing','Ongoing'),
    ('completed','Completed')
)    

NOMINATION_STATUS = (
    ('approved','Approved'),
    ('pending','Pending'),
    ('rejected','Rejected')
)

TYPE = (
    ('P','Proposed by'),
    ('S','Seconded by')
)

BRANCH = (
    ('01', 'CSE'),
    ('02', 'ECE'),
    ('03', 'ME'),
    ('04', 'Civil'),
    ('05', 'Design'),
    ('06', 'BSBE'),
    ('07', 'CL'),
    ('08', 'EEE'),
    ('21', 'Physics'),
    ('22', 'Chemistry'),
    ('23', 'MNC'),
    ('41', 'HSS'),
    ('51', 'Energy'),
    ('52', 'Environment'),
    ('53', 'Nano-Tech'),
    ('54', 'Rural-Tech'),
    ('55', 'Linguistics'),
	('61', 'Others'),
)

DEGREE = (
    ('U','UG'),
    ('P','PG')
)

HOSTELS = [
    ('lohit', 'Lohit'),
    ('brahmaputra', 'Brahmaputra'),
    ('siang', 'Siang'),
    ('manas', 'Manas'),
    ('dibang', 'Dibang'),
    ('disang', 'Disang'),
    ('kameng', 'Kameng'),
    ('umiam', 'Umiam'),
    ('barak', 'Barak'),
    ('kapili', 'Kapili'),
    ('dihing', 'Dihing'),
    ('subansiri', 'Subansiri'),
    ('dhansiri', 'Dhansiri'),
    ('dibang', 'Dibang'),
    ('msh', 'Married Scholar Hostel'),
    ('not-alloted', 'Not Alloted'),
]

class EUser(models.Model):
    name = models.CharField(max_length=100)
    roll_number = models.CharField(max_length=9)
    degree = models.CharField(choices=DEGREE,max_length=70)
    hostel = models.CharField(choices=HOSTELS,max_length=50)
    branch = models.CharField(choices=BRANCH,max_length=50)
    email = models.EmailField(unique=True)
    user = models.OneToOneField(User,on_delete=models.CASCADE,related_name='euser')
    registration_complete = models.BooleanField(default=False)

    def __str__(self) -> str:
        return str(self.id)

class Election(models.Model):
    name = models.CharField(max_length=250)
    name_slug = models.SlugField(max_length=100,unique=True)
    organization = models.CharField(max_length=250)
    description = models.TextField()
    website_link = models.URLField()
    rules = models.JSONField()
    date_created = models.DateField(default=datetime.now)
    status = models.CharField(choices=STATUS_CHOICES,max_length=50)
    start_date_time = models.DateTimeField()
    end_date_time = models.DateTimeField() #should be greater than start date

    def __str__(self) -> str:
        return self.name

class Voter(models.Model):
    user = models.ForeignKey(EUser,null=True,on_delete=models.SET_NULL,related_name='voter_ids')
    is_voted = models.BooleanField(default=False)
    election = models.ForeignKey(Election,on_delete=models.CASCADE,related_name='voters')
    election_organizers = models.ForeignKey(Election,null=True,on_delete=models.SET_NULL,related_name='organizers') # change the name of field to election
    election_creator = models.OneToOneField(Election,null=True,on_delete=models.SET_NULL,related_name='created_by')

    class Meta:
        unique_together = (('user', 'election'), ('user', 'election_organizers'))

class Position(models.Model):
    title = models.CharField(max_length=250,unique=True)
    debate_date_time = models.DateTimeField()
    max_votes = models.PositiveIntegerField() 
    voting_instructions = models.JSONField()
    election = models.ForeignKey(Election,on_delete=models.CASCADE,related_name='positions')
    

    def __str__(self) -> str:
        return self.title

def get_default_witness():
    return {
        "name":"",
        "cpi":"",
        "roll_number":"",
        "branch": "",
        "degree":"",
        "department": "",
        "email":"",
        "hostel":"",
        "room_no":"",
        "semester":""
    }

class Candidate(models.Model):
    position = models.ForeignKey(Position,on_delete=models.DO_NOTHING,related_name='candidates_p')
    agenda_text = models.JSONField(null=True,blank=True)
    image = models.ImageField(upload_to="candidate_profile/",blank=True,null=True)
    video = models.URLField(null=True,blank=True)
    about = models.TextField(null=True,blank=True)
    tagline = models.CharField(max_length=500,null=True,blank=True)
    agenda_pdf = models.FileField(upload_to="agenda/",blank=True)
    election = models.ForeignKey(Election,on_delete=models.CASCADE,related_name='candidates_e')
    user = models.ForeignKey(EUser,on_delete=models.DO_NOTHING,related_name='candidates_ids')
    nomination_status = models.CharField(choices=NOMINATION_STATUS,max_length=70,default="pending")
    cpi = models.CharField(max_length=70,null=True,blank=True)
    backlogs = models.CharField(max_length=100,null=True,blank=True)
    active_backlogs = models.CharField(max_length=100,null=True,blank=True)
    sign = models.FileField(blank=True,null=True)
    date = models.DateField(null=True,blank=True)
    semester = models.CharField(max_length=70,null=True,blank=True)
    contact_no = models.IntegerField(null=True,blank=True)
    room_no = models.CharField(max_length=70,null=True,blank=True)
    proposed_by = models.JSONField(null=True,blank=True,default=get_default_witness)
    seconded_by = models.JSONField(null=True,blank=True,default=get_default_witness)
    credentials = models.JSONField(null=True,blank=True,default=dict)
    proposed_by_sign = models.ImageField(upload_to="witness_signs/",null=True,blank=True)
    seconded_by_sign = models.ImageField(upload_to="witness_signs/",null=True,blank=True)
    
    class Meta:
        unique_together = (('position', 'election', 'user'))



class Faq(models.Model):
    election = models.ForeignKey(Election,on_delete=models.CASCADE,related_name='faqs')
    question = models.TextField()
    answer = models.TextField()

class Imporatant_date(models.Model):
    title = models.CharField(max_length=250)
    date = models.DateField()
    election = models.ForeignKey(Election,on_delete=models.CASCADE,related_name='important_dates')

class Statistic(models.Model):
    election = models.ForeignKey(Election,on_delete=models.CASCADE,related_name='statistics')
    stat_cnt = models.JSONField()
    stat_total = models.JSONField()
    stat_title = models.CharField(max_length=250)


class Debate(models.Model):
    title = models.CharField(max_length=250)
    debate_time = models.DateTimeField()
    election = models.ForeignKey(Election,on_delete=models.CASCADE,related_name='debates')


class Credentials(models.Model):
    name=models.TextField(null=True,blank=True)
    file = models.FileField(upload_to="credentials/")

@receiver(post_save,sender=User)
def create_euser(sender,instance,created,*args,**kwargs):
    if created:
        euser = EUser.objects.create(
            user=instance,
            email=instance.email,
            name=instance.first_name,
            roll_number=instance.email)
