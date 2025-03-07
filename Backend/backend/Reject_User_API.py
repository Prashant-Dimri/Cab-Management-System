from Load_Env_File import get_session,User
import json #add reject also , #admin uuid in add uuid
def RejectUser(uuid):
    try:
        session=get_session()
        query=session.query(User).filter_by(uuid=uuid)
        query.update({"status":0})
        session.commit()
        return json.dumps({'status': 201, 'message': 'Success',
                            'data': None, 'errorMessages': None})
    except:
        return json.dumps({'status': 500, 'message': 'Failed',
                            'data': None, 'errorMessages': ['Failed to Reject']})

