from rest_framework import permissions
from .models import Voter,Candidate
from django.utils import timezone
class ElectionOrganizerWritePermission(permissions.BasePermission):
    """
    Global write permission check for election organizer(s).
    """
    message = 'Invalid Access! This API can be accessed only by one of the organizers of the election.'

    def has_permission(self, request, view):
        if view.action in ["list","retrieve"]:
            return True
        try:
            is_organizer = Voter.objects.filter(election_organizers__id=view.election.id,user__id=request.user.euser.id).exists()
            return is_organizer
        except Exception as err:
            print(repr(err))
            return False


class IsOrganizerOrCandidateWriteOnly(permissions.BasePermission):
    """
    Global write permission check for election organizer(s).
    """
    message = 'Invalid Access! This API can be accessed only by one of the organizers of the election.'

    def has_object_permission(self, request, view,obj):
        if view.action in ["list","retrieve","create"]:
            return True
        
        user = request.user
        election=view.election
        try:
            is_organizer = Voter.objects.filter(election_organizers__id=election.id,user__id=user.euser.id).exists()
            if is_organizer:
                return True
        except Exception as err:
            print(repr(err))
            
        try:
            euser = user.euser
            candidates = Candidate.objects.filter(election=election,user=euser)
            return candidates.filter(pk=obj.id).exists()
        except Exception as err:
            print(repr(err))
            return False


class OnlyOrganizerOrCandidate(permissions.BasePermission):
    """
    Global write permission check for election organizer(s).
    """
    message = 'Invalid Access! This API can be accessed or candidate only by one of the organizers of the election.'
    def has_permission(self,request,view):
        if view.action=="create":
            return True

        user = request.user
        election=view.election

        try:
            is_organizer = Voter.objects.filter(election_organizers__id=election.id,user__id=user.euser.id).exists()
            if is_organizer:
                return True
        except Exception as err:
            print(repr(err))

        if view.action == "list":
            return is_organizer
        return True

    def has_object_permission(self, request, view,obj):
        user = request.user
        election=view.election

        try:
            is_organizer = Voter.objects.filter(election_organizers__id=election.id,user__id=user.euser.id).exists()
            if is_organizer:
                return True
        except Exception as err:
            print(repr(err))
        
        try:
            euser = user.euser
            candidates = Candidate.objects.filter(election=election,user=euser)
            is_candidate=candidates.filter(pk=obj.id).exists()
        except Exception as err:
            print(repr(err))
            is_candidate=False
        
        return is_organizer or is_candidate

basic_info_deadline = 1649662251052
nomination_deadline = 1649662251052+6*60*60*1000

class CandidateDeadlinePermissions(permissions.BasePermission):
    message = "Invalid Access deadline to update specified details is now over"

    def has_permission(self,request,view):
        user = request.user
        election=view.election

        try:
            is_organizer = Voter.objects.filter(election_organizers__id=election.id,user__id=user.euser.id).exists()
            if is_organizer:
                return True
        except Exception as err:
            print(repr(err))

        try:
            euser = user.euser
            candidates = Candidate.objects.filter(election=election,user=euser)
            is_candidate=candidates.exists()
        except Exception as err:
            print(repr(err))
            is_candidate=False
        if is_candidate:
            curr_time = timezone.now().timestamp()*1000
            
            if curr_time<=basic_info_deadline:
                return True

            if curr_time>nomination_deadline:
                return False
            basic_info_list = ["roll_number","email","semester","contact_no","about","image","degree","branch","hostel","cpi","backlogs","active_backlogs","room_no"]

            for k in basic_info_list:
                if k in request.data:
                    return False
        
        return True
        
        
        


