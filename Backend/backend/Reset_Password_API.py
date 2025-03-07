import json
from Load_Env_File import get_session,User
def reset(uuid,password):
    try:
        session=get_session()
        users=session.query(User).filter(User.uuid==uuid).first()    #query object is created when we dont use .first or .all (it means it is not yet executed)
                                                                     #user object is created when we use .first or .al (it means it is executed)
        if users.old_password==password:
            return json.dumps({'status': 501, 'message': 'Success',
                        'data': None, 'errorMessages': ['Old password is same as new password'] })
        if users.password==password:
            return json.dumps({'status': 501, 'message': 'Success',
                        'data': None, 'errorMessages': ['Current password is same as new password'] })
        users.old_password=users.password
        users.password=password
        session.commit()
        return json.dumps({'status': 201, 'message': 'Success',
                            'data': None, 'errorMessages': None})
    except:
        return json.dumps({'status': 501, 'message': 'Failed',
                            'data': None, 'errorMessages': ['Unable to update password']})
