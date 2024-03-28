#Module Function: provides routes regarding groups

from zephyr import app, db, auth, storage, get_user, print_error
from flask import jsonify, url_for, request
from datetime import datetime

#creates a group
@app.route('/create_group', methods=['POST'])
def create_group():
    try:
        token = request.headers.get('Authorization')
        data = request.json
        
        data['token'] = token
        user, uid = get_user(data)
        data.pop('token')
        
        data['owner'] = uid
        #data['group_pic'] = 'default_group.jpg'
        group_ref = db.child('groups').push(data)
        db.child('users').child(uid).child('groups').update({group_ref['name']:'owner'})
        return jsonify({'group_id': group_ref}), 200
    except Exception as e:
        print_error(e)
        return jsonify({'error':e}), 500

#returns all the groups the user is in
#{<group_ID>: {bio: <bio>, role:<role>, title: <title>}}
@app.route('/users_groups', methods=['GET'])
def users_groups():
    try:
        token = request.headers.get('Authorization')
        data = {'token': token}
        user, uid = get_user(data)
        groups = {}
        print(db.child('users').child(uid).child('groups').get().val())
        if request.method == 'GET':
            if db.child('users').child(uid).child('groups').get().val():
                all_groups = db.child('users').child(uid).child('groups').get()
                for group in all_groups.each(): 
                    group_info = {'role': group.val(),
                                'title': db.child('groups').child(group.key()).child('title').get().val(),
                                'bio': db.child('groups').child(group.key()).child('bio').get().val()}
                    groups[group.key()] = group_info
        return groups, 200
    except Exception as e:
        print(f'Error: {e}'), 500
        return jsonify({"error":"error"})




'''
#used for editing and viewing and editing group info
@app.route('/group', methods=['GET', 'PUT'])
def group():
    group = 
    if request.methods == 'GET':
        return 

    try:
        data = request.json

    except Exception as e:
        print(f'Error: {e}')
        return jsonify({'updated':'false'})




    code = int(request.json['code'])

    print(type(code))
    group = Group.query.filter_by(code=code).first()
    if request.method == 'GET':
        return group_schema.dump(group)
    else:
        try:
            group.title = request.json['title']
            group.bio = request.json['bio']
            db.session.commit()
            return jsonify({'updated':'true'})
        except:
            return jsonify({'updated':'false'})

'''
'''
@app.route('/join_group', methods=['PUT'])
@login_required
def join_group():
    global user
    #will add as an admin as long as there is anything store in the admin key
    try:
        uid = user['localId']
        data = request.json
        if 'admin' in data:
            
        else:
            print('not admin')

        return jsonify({'group_joined':'true'})
    except Exception as e:
        print(f'Error: {e}')
        return jsonify({'group_joined':'false'})

    try:
        admin = False
        try:
            admin = bool(request.json['admin'])
        finally:
            code = int(request.json['code'])
            group = Group.query.filter_by(code=code).first()
            print(admin)
            if admin:
                print('adding as admin')
                current_user.admin_of.append(group)
            else:
                current_user.member_of.append(group)

            db.session.commit()
            return jsonify({'group_joined':'true'})
    except:
        return jsonify({'group_joined':'false'})


        
@app.route('/leave_group', methods=['PUT'])
def leave_group():
    try:
        code = int(request.json['code'])
        print(code)
        group = Group.query.filter_by(code=code).first()
        #checks if their member or admin
        print(current_user in group.admins)
        print(len(group.admins))
        if current_user in group.members:
            group.members.remove(current_user)
        else:
            print("is admin")
            #cannot leave group if there is only one member
            if len(group.admins)==1:
                print('last admin')
                return jsonify({'leave_group':'false'})
            group.admins.remove(current_user)
        db.session.commit()
        return jsonify({'leave_group':'true'})
    except:
        return jsonify({'leave_group':'false'})
    
@app.route('/group_members', methods=['GET'])
def group_members():
    try:
        code = int(request.json['code'])
        group = Group.query.filter_by(code=code).first()
        return jsonify({'admins':str(group.admins)}, {'members':str(group.members)})
    except:
        return jsonify({'error':'error'})


'''