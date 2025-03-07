from Load_Env_File import get_session,User
import uuid
import time
import json
def AddUser(name,email,password,address,role):
    try:
        convert={'admin':0,'customer':1,'driver':2}
        session=get_session()
        users = session.query(User).filter(User.email == email,User.role == convert[role]).all()
        if users:
            return json.dumps({'status': 501, 'message': 'Failed', 'data': None, 'errorMessages': ['Username already exist'] })
        uu=uuid.uuid1()
        tim=int(time.time()*1000)
        if convert[role]==1 or convert[role]==0:
            new_user = User(
            uuid=str(uu),
            name=name,
            email=email,
            password=password,  
            add_date=tim,
            address=address,
            role=convert[role],  # Convert role to its integer value
            status=1)
        else:
            new_user = User(
            uuid=str(uu),
            name=name,
            email=email,
            password=password,  
            add_date=tim,
            address=address,
            role=convert.get(role),  # Convert role to its integer value
            status=2)
        session.add(new_user)  # Add user to the session
        session.commit()
        return json.dumps({'status': 201, 'message': 'Success',
                                'data': None, 'errorMessages': None , 'role':convert[role]})
    except:
        return json.dumps({'status': 501, 'message': 'Failed',
                            'data': None, 'errorMessages': ['Unable to add data in database']})



