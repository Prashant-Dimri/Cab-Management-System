from Connection import get_connection
import datetime
import jwt
import json
def chk(email,password):
    con=get_connection()
    if con==None:
        return json.dumps({'status': 500, 'message': 'Failed',
                            'data': None, 'errorMessages': ['Failed to connect database']})
    cursor=con.cursor()
    try:
        query="""select uuid,role from "user" where email=%s and password=%s """
        cursor.execute(query,(email,password,))
        rows=cursor.fetchone()
        if rows!=None:
            secreatkey='sadb2h1hb2b3mn2b3mn2b1jb32hb321nm2j3njn3'
            payload={"UUID":rows[0],"Email":email,
            'exp':datetime.datetime.utcnow()+datetime.timedelta(hours=1)}
            token=jwt.encode(payload,secreatkey,algorithm='HS256')
            return json.dumps({'status': 201, 'message': 'Success',
                                       'data': token, 'errorMessages':None,'role':rows[1]})
        else:
            return json.dumps({'status': 500, 'message': 'Failed',
                                       'data': None, 'errorMessages': ['No such user found']})

    except:
        return json.dumps({'status': 500, 'message': 'Failed',
                                       'data': None, 'errorMessages': ['Maybe Wrong query']})
    finally:
        cursor.close()
        con.close()
#chk("Prashant","abc@hashstdioz.com","sddsd")
