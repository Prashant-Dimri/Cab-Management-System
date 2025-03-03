import json
from load_env_file import get_session,User
def fp(link_email):
    try:
        session=get_session()
        user = session.query(User).filter_by(email=link_email).first()
        link='http://localhost:3000/reset/'
        link+=str(user.uuid)
        user.link_email=link
        session.commit()
        return json.dumps({'status':201, 'message': 'Success',
                            'data': None, 'errorMessages': None})
    except:
        return json.dumps({'status': 501, 'message': 'Failed',
                            'data': None, 'errorMessages': ['Unable to establish connection with database']})
