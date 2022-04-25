from main.models import VoterCard
from encryption.utils import decrypt
from .count_vote import count_votes as count_votes_block_list


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
      failed+=[voter.uniqueid]
      
  print("Failed: ",len(failed))
  print(failed)
  print("No votes: ",no_vote_voters.count())
  print(no_vote_voters)

  rv_map = {}
    for k in votes.keys():
        rv_map[c_inv_map[k]]=votes[k]
  group_map={}
  for p in positions:
      group_map[p]={}
      for k in rv_map:
          if k.startswith(p):
              group_map[p][k.split(",")[-1]]=rv_map[k]

  return votes,rv_map,group_map



def count_votes_block():
    voters = []
    for voter in VoterCard.objects.all():
        voters += [voter.uniqueid]
    return count_votes_block_list(voters)
    