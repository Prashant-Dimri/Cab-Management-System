import jwt
from Load_Env_File import get_session,User
import json #add reject also , #admin uuid in add uuid
def ApproveUser(uuid,token):
    try:
        session=get_session()
        secret_key='sadb2h1hb2b3mn2b3mn2b1jb32hb321nm2j3njn3'
        decoded_token=jwt.decode(str(token), secret_key, algorithms='HS256')
        query=session.query(User).filter_by(uuid=uuid)
        query.update({"status":2})
        query.update({"add_uuid":decoded_token['UUID']})
        session.commit()
        return json.dumps({'status': 201, 'message': 'Success',
                            'data': None, 'errorMessages': None})
    except:
        return json.dumps({'status': 500, 'message': 'Failed',
                            'data': None, 'errorMessages': ['Failed to connect database']})
