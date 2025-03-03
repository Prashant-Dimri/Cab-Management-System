import json
from load_env_file import get_session,User
def fetchall():
    session=get_session()
    # Example: Query all users
    users = session.query(User).all()
    for i in range(10):
        print("")
    lis=[]
    for user in users:
        if user.status==None:
            tup=(str(user.uuid),user.name,user.email,user.address)
            lis.append(tup)
            
    return json.dumps({'status': 201, 'message': None,
                                       'data': lis, 'errorMessages': None})
