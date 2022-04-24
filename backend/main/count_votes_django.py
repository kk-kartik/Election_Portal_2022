from main.models import VoterCard
from encryption.utils import decrypt
from .count_vote import count_votes as count_votes_block_list

def count_votes():
  votes = {}
  no_vote_voters = VoterCard.objects.filter(vote=None)
  failed=[]
  i=1

  for voter in VoterCard.objects.exclude(vote=None):
    try:
      vote = decrypt(voter.vote)
      elected_candidates = vote.split(",")
      for candidate_id in elected_candidates:
        if candidate_id not in votes:
          votes[candidate_id] = 0
        votes[candidate_id]+=1
      print("Count complete: ",i)
      i+=1
    except Exception as err:
      print("Failed Decryption")
      print(repr(err))
      
  print("Failed: ",len(failed))
  print(failed)
  print("No votes: ",no_vote_voters.count())
  print(no_vote_voters)

  return votes,failed,no_vote_voters

def count_votes_block():
    voters = []
    for voter in VoterCard.objects.all():
        voters += [voter.uniqueid]
    return count_votes_block_list(voters)
    