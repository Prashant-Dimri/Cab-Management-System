import json
from Connection import get_connection
def reset(uuid,password):
    con=get_connection()
    if con==None:
        return json.dumps({'status': 501, 'message': 'Failed',
                            'data': None, 'errorMessages': ['Unable to establish connection with database']})
    cursor=con.cursor()
    try:
        #First Checking if old password is equal to new password or not
        query='''SELECT old_password,password FROM "user" WHERE uuid=%s; '''
        cursor.execute(query,(uuid,))#single value in tuple should be given like this only (email,)
        rows=cursor.fetchone()
        old_password=rows[0]
        curr_password=rows[1]
        if old_password==password:
            return json.dumps({'status': 501, 'message': 'Success',
                        'data': None, 'errorMessages': ['Old password is same as new password'] })
        if curr_password==password:
            return json.dumps({'status': 501, 'message': 'Success',
                        'data': None, 'errorMessages': ['Current password is same as new password'] })

        query='''UPDATE "user" SET password =%s WHERE uuid=%s;'''
        cursor.execute(query,(password,uuid))
        con.commit()
        query='''UPDATE "user" SET old_password=%s WHERE uuid=%s;'''
        cursor.execute(query,(curr_password,uuid))
        con.commit()
        return json.dumps({'status': 201, 'message': 'Success',
                            'data': None, 'errorMessages': None})
    except:
        return json.dumps({'status': 501, 'message': 'Failed',
                            'data': None, 'errorMessages': ['Unable to update password']})
