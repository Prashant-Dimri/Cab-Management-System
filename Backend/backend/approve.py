from Connection import get_connection
import jwt
import json #add reject also , #admin uuid in add uuid
def apr(uuid,token):
    con=get_connection()
    if con==None:
        return json.dumps({'status': 500, 'message': 'Failed',
                            'data': None, 'errorMessages': ['Failed to connect database']})
    cursor=con.cursor()
    try:
        secret_key='sadb2h1hb2b3mn2b3mn2b1jb32hb321nm2j3njn3'
        decoded_token=jwt.decode(str(token), secret_key, algorithms='HS256')
        print(decoded_token)
        query ='''update "user" set status = 2 where uuid = %s'''
        cursor.execute(query,(uuid,))
        con.commit()
        query ='''update "user" set add_uuid = %s where uuid = %s'''
        print(decoded_token['UUID'])
        cursor.execute(query,(decoded_token['UUID'],uuid))
        print("work")
        con.commit()
        return json.dumps({'status': 201, 'message': 'Success',
                            'data': None, 'errorMessages': None})
    except:
        return json.dumps({'status': 500, 'message': 'Failed',
                            'data': None, 'errorMessages': ['Failed to Approve']})

