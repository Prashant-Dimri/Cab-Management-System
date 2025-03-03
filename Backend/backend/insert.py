from Connection import get_connection
import uuid
import time
import json
def ins(name,email,password,address,role):
    con=get_connection()
    if con==None:
        return json.dumps({'status': 501, 'message': 'Failed',
                            'data': None, 'errorMessages': ['Unable to establish connection with database']})
    cursor=con.cursor()
    try:
        convert={'admin':0,'customer':1,'driver':2}
        query_comp = ''' SELECT email FROM "user" WHERE email=%s AND role = %s AND (status IN (1,2) OR status is null) '''
        cursor.execute(query_comp, (email, convert[role]))
        rows=cursor.fetchone()
        
        if rows:
            return json.dumps({'status': 501, 'message': 'Failed', 'data': None, 'errorMessages': ['Username already exist'] })
        uu=uuid.uuid1()
        tim=int(time.time()*1000)
        #convert role to their respective numbers 1 customer 2 driver
        
        if convert[role]==1 or convert[role]==0:
            query='''INSERT INTO "user" (uuid, name, email, password, add_date,address,role,status) 
               VALUES (%s, %s, %s, %s, %s,%s,%s, %s)'''
            cursor.execute(query,(str(uu),name,email,password,tim,address,convert[role],1)) 
            con.commit()
            return json.dumps({'status': 201, 'message': 'Success',
                                'data': None, 'errorMessages': None ,'role':role })
        else:
            query=query='''INSERT INTO "user" (uuid, name, email, password, add_date,address,role) 
               VALUES (%s, %s, %s, %s, %s,%s,%s)'''
            cursor.execute(query,(str(uu),name,email,password,tim,address,2))
            con.commit()
            return json.dumps({'status': 201, 'message': 'Success',
                                'data': None, 'errorMessages': None , 'role':'driver'})
        
    except Exception as e:
        print(f'Error {e}')
        return json.dumps({'status': 501, 'message': 'Failed',
                            'data': None, 'errorMessages': ['Unable to add data in database']})
    finally:
        con.close()
    
