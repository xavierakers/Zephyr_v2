#Module Function: provides routes for users

from zephyr import app, db, auth, storage, print_error, get_user
from flask import jsonify, url_for, request
from datetime import datetime

#Not yet implmented into anything
#Will most likely put in the home component
@app.route('/refresh_token')
def refresh_token():
    data = request.json
    old_token = data['token']
    new_token = auth.refresh(old_token)['idToken']
    return jsonify({'token': new_token}), 200

#Not sure what we want on the homescreen yet, this will be changed a lot
#{message: <message>}
@app.route('/', methods=['GET'])
@app.route('/home', methods=['GET'])
def home():
    try:
        token = request.headers.get('Authorization')
        data = {'token': token}
        user, uid = get_user(data)
        user_data = {}
        for info in db.child('users').child(uid).get(): 
                    if(info.key() == 'username'):
                        username = info.val()
        print(username)
        s = f'welcome to zephyr, {username}'
        return jsonify({"message": s}), 200
    except Exception as e:
        print_error(e)
        return jsonify({'message':e}), 500

@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        print(data)
        user = auth.create_user_with_email_and_password(data['email'], data['password'])
        user = auth.sign_in_with_email_and_password(data['email'], data['password'])
        
        user_id = user['localId']
        data.pop('password')
        data['profile_pic'] = 'default.jpg'
        db.child("users").child(user_id).set(data)
        if user:
                token = user['idToken']
                return jsonify({'token': token }), 200
    except Exception as e:
        print_error(e)
        return jsonify({'error': e}), 500
    
#can now only log in with email
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        user = auth.sign_in_with_email_and_password(data['email'], data['password'])

        if user:
            token = user['idToken']
            return jsonify({'token':token}), 200
        else:
            return jsonify({'message':'invalid login'}), 500
    except Exception as e:
        print_error(e)
        return jsonify({'error':e}), 500
    
@app.route('/logout', methods=['GET'])
def logout():
    try:
        token = request.headers.get('Authorization')
        data = {'token': token}
        user, uid = get_user(data)
        #Even the token does not get used, it adds an extra layer of security by sending it
        auth.current_user = None
        return jsonify({'message':'logged out'}), 200
    except Exception as e:
        print_error(e)
        return jsonify({'error':e}), 500

 
@app.route('/account', methods=['GET', 'PUT'])
def account():
    try:
        token = request.headers.get('Authorization')
        data = {'token': token}
        user, uid = get_user(data)
        
        if request.method == 'GET':
            user_data = {}
            for info in db.child('users').child(uid).get(): 
                user_data[info.key()] = info.val()
                
            return (user_data), 200
        else:
            data = request.json
            data['token'] = token
            user, uid = get_user(data)
            data.pop('token')
            print(data)
            db.child('users').child(uid).update(data)
            return jsonify({'message':'successfully added addtl info'}), 200
    except Exception as e:
        print_error(e)
        return jsonify({'error':e}), 500

#returns all frineds of the user
#{<friend_uid>, first_name last_name}
@app.route('/friends', methods=['GET'])
def getFriends():
     try:
        token = request.headers.get('Authorization')
        data = {'token': token}
        user, uid = get_user(data)
        friends = {}
        if request.method == 'GET':
            if db.child('users').child(uid).child('friends').get().val():
                for info in db.child('users').child(uid).get():
                    if info.key() == 'friends':
                        friend_ids = info.val()            
                for id in friend_ids:
                    first_name = db.child('users').child(id).child('first_name').get().val()
                    last_name = db.child('users').child(id).child('last_name').get().val()
                    friends[id] = f'{first_name} {last_name}'
            return friends, 200
     except Exception as e:
         print_error(e)
         return jsonify({'error':e}), 500
        


