import json
from django.contrib.auth.models import User
# from models import EUser

def func():
    # Opening JSON file
    f = open('new_file_final.json')

    data = json.load(f)

    # Iterating through the json
    # list

    dict_data = {}

    for key,values in data['IITG_Email_Updated'].items():
        user = User(email = values + "@iitg.ac.in")
        user.save()

# for key,value in data['Roll No'].items():
#    dict_data[key] = {"roll_number":value}
# 	# print(key,value)

# for key,value in data['Name'].items():
#    dict_data[key]['name'] = value

# for key,value in data['IITG_Email_Updated'].items():
#    dict_data[key]["email"] = value + "@iitg.ac.in"
   

# for key,value in data['Gender'].items():
#    dict_data[key]["gender"] = value


# for key,value in dict_data.items():
   

# print(dict_data.keys())

# print(dir(dict_data))

# Closing file
# f.close()
