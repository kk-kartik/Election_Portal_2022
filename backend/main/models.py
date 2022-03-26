from django.db import models
from datetime import datetime

STATUS_CHOICES = (
    ('pending','To be started'),
    ('ongoing','Ongoing'),
    ('completed','Completed')
)    

NSTATUS = (
    ('approved','Approved'),
    ('pending','Pending'),
    ('rejected','Rejected')
)

BRANCH = (
    ('P','To be started'),
    ('C','Completed'),
    ('O','Ongoing')
)

DEGREE = (
    ('P','To be started'),
    ('C','Completed'),
    ('O','Ongoing')
)

HOSTELS = [
    ('lohit', 'Lohit'),
    ('brahmaputra', 'Brahmaputra'),
    ('siang', 'Siang'),
    ('manas', 'Manas'),
    ('dibang', 'Dibang'),
    ('disang', '*Disang'),
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
    roll_number = models.CharField(max_length=9,unique=True)
    degree = models.CharField(choices=DEGREE,max_length=70)
    hostel = models.CharField(choices=HOSTELS,max_length=50)
    branch = models.CharField(choices=BRANCH,max_length=50)
    email = models.EmailField(unique=True)

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
    election_organizers = models.ForeignKey(EUser,null=True,on_delete=models.SET_NULL,related_name='organizers')
    election_creator = models.OneToOneField(EUser,null=True,on_delete=models.SET_NULL,related_name='created_by')

class Position(models.Model):
    title = models.CharField(max_length=250,unique=True)
    debate_date_time = models.DateTimeField()
    max_votes = models.PositiveIntegerField()
    voting_instructions = models.JSONField()
    election = models.ForeignKey(Election,on_delete=models.CASCADE,related_name='positions')

class Candidate(models.Model):
    position = models.ForeignKey(Position,null=True,on_delete=models.SET_NULL,related_name='candidates_p')
    agenda_text = models.JSONField()
    image = models.ImageField()
    video = models.URLField()
    about = models.TextField()
    tagline = models.CharField(max_length=500)
    agenda_pdf = models.FileField()
    election = models.ForeignKey(Election,on_delete=models.CASCADE,related_name='candidates_e')
    user = models.ForeignKey(EUser,null=True,on_delete=models.SET_NULL,related_name='candidates_ids')
    nomination_status = models.CharField(choices=NSTATUS,max_length=70)

class Faq(models.Model):
    election = models.ForeignKey(Election,on_delete=models.CASCADE,related_name='faqs')
    question = models.TextField()
    answer = models.TextField()

class Imporatant_date(models.Model):
    title = models.CharField(max_length=250)
    date = models.DateTimeField()
    election = models.ForeignKey(Election,on_delete=models.CASCADE,related_name='important_dates')

class Statistic(models.Model):
    election = models.ForeignKey(Election,on_delete=models.CASCADE,related_name='statistics')
    stat_cnt = models.JSONField()
    stat_total = models.JSONField()
    stat_title = models.CharField(max_length=250)
