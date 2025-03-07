import datetime
import jwt
from Load_Env_File import get_session,User
import json
def chk(email,password):
    try:
        session=get_session()
        user=session.query(User).filter(User.email==email,User.password==password).first()
        if user:
            
            secreatkey='sadb2h1hb2b3mn2b3mn2b1jb32hb321nm2j3njn3'
            payload={"UUID":str(user.uuid),"Email":user.email,
            'exp':datetime.datetime.now()+datetime.timedelta(hours=1)}
            token=jwt.encode(payload,secreatkey,algorithm='HS256')
            return json.dumps({'status': 201, 'message': 'Success',
                                       'data': token, 'errorMessages':None,'role':user.role})
        else:
            return json.dumps({'status': 500, 'message': 'Failed',
                                       'data': None, 'errorMessages': ['No such user found']})
    except:
        return json.dumps({'status': 500, 'message': 'Failed',
                                       'data': None, 'errorMessages': ['Error in executing']})
