from main.models import VoterCard
from encryption.utils import decrypt
from .count_vote import count_votes as count_votes_block_list

def count_votes():
  votes = {}
  for voter in VoterCard.objects.all():
    vote = decrypt(voter.vote)
    elected_candidates = vote.split(",")
    for candidate_id in elected_candidates:
      if candidate_id not in votes:
        votes[candidate_id] = 0
      votes[candidate_id]+=1
  return votes

def count_votes_block():
    voters = []
    for voter in VoterCard.objects.all():
        voters += [voter.uniqueid]
    return count_votes_block_list(voters)
    