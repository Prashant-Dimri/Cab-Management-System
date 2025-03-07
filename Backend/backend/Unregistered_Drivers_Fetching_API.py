import json
from Load_Env_File import get_session,User
def fetchall():
    try:
        session=get_session()
        # Example: Query all users
        users = session.query(User).all()
        lis=[]
        for user in users:
            if user.status==None:
                tup=(str(user.uuid),user.name,user.email,user.address)
                lis.append(tup)
        return json.dumps({'status': 201, 'message': None,
                                       'data': lis, 'errorMessages': None})
    except:
        return ({'status': 500, 'message': "Failed To connect to database",
                                       'data': lis, 'errorMessages': ["Error in fetch.py"]})
fetchall()
