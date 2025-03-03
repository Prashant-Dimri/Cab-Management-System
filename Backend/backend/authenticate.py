import jwt
import json
def authen(data,typ):#token,#type
    try:
        secret_key='sadb2h1hb2b3mn2b3mn2b1jb32hb321nm2j3njn3'
        decoded_token=jwt.decode(data, secret_key, algorithms='HS256')
        decoded_token['type']=typ
        token=jwt.encode(decoded_token,secret_key,algorithm='HS256')
        return json.dumps({'status':201, 'message': 'Success',
                            'data': token, 'errorMessages': None})
    except jwt.ExpiredSignatureError:
        return json.dumps({'status':500, 'message': 'Failed',
                            'data': None, 'errorMessages': ['Expired Jwt Token']})
    except jwt.InvalidTokenError:
        return json.dumps({'status':500, 'message': 'Failed',
                            'data': None, 'errorMessages': ['Invalid Jwt Token']})


