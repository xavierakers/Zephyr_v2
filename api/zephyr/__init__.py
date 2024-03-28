__version__ = 'Alpha 2.1.1'
__author__ = 'Xavier Akers'

from flask import Flask
import pyrebase

app = Flask(__name__)
app.config['SECRET_KEY'] = 'adminadmin' #This will be changed later

firebaseConfig = {
    "apiKey": "AIzaSyClikeizN--KGUuB2UaurYSK14E1JqLbmg",
    "authDomain": "zephyr-c4ae1.firebaseapp.com",
    "databaseURL":"https://zephyr-c4ae1-default-rtdb.firebaseio.com/",
    "projectId": "zephyr-c4ae1",
    "storageBucket": "zephyr-c4ae1.appspot.com",
    "messagingSenderId": "488512645653",
    "appId": "1:488512645653:web:9533ad899a5ba858b33c1c",
    "measurementId": "G-PKR74GDM6P"
}


#Initialzing Firebase
firebase = pyrebase.initialize_app(firebaseConfig)
auth = firebase.auth()
db = firebase.database()
storage = firebase.storage()

#Helper Functions

def get_user(data):
    token = data['token']
    user_info = auth.get_account_info(token)
    user = user_info['users'][0]
    uid = user['localId']
    return user, uid


def print_error(e):
    print(f"Error: {e}")

from zephyr import userRoutes
from zephyr import groupRoutes
