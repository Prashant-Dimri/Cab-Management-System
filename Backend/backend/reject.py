from Connection import get_connection
import json #add reject also , #admin uuid in add uuid
def rej(uuid):
    con=get_connection()
    if con==None:
        return json.dumps({'status': 500, 'message': 'Failed',
                            'data': None, 'errorMessages': ['Failed to connect database']})
    cursor=con.cursor()
    try:
        query ='''update "user" set status = 0 where uuid = %s'''
        cursor.execute(query,(uuid,))
        con.commit()
        return json.dumps({'status': 201, 'message': 'Success',
                            'data': None, 'errorMessages': None})
    except:
        return json.dumps({'status': 500, 'message': 'Failed',
                            'data': None, 'errorMessages': ['Failed to Approve']})

