from flask import Flask, request,render_template,session
from authenticate import authen
from insert import ins
from check import chk
from flask_cors import CORS
from fetch import fetchall
from approve import apr
from validate import valid
from resett import reset
import jwt
import json
from reject import rej
from forgotPassword import fp
#authentication token

app = Flask(__name__)
CORS(app)
app.secret_key='sadb2h1hb2b3mn2b3mn2b1jb32hb321nm2j3njn3'
@app.route('/',methods=['POST'])                       #set for react app
def sign():
    data=request.get_json()
    email=data.get('email')
    password=data.get('password')
    availability=chk(email,password)
    return availability
@app.route('/selectCab',methods=['POST'])
def select():
    data=request.get_json()
    val=valid(data['token'])
    val=json.loads(val)
    if val['status']!=201:
        return json.dumps(val)
    res=authen(data['token'],data['type'])
    return res
@app.route('/Booking',methods=['POST'])
def book():
    secret_key='sadb2h1hb2b3mn2b3mn2b1jb32hb321nm2j3njn3'
    data=request.get_json()
    try:
        decoded_token=jwt.decode(data['token'], secret_key, algorithms='HS256')
        decoded_token['pickup']=data['pickup']
        decoded_token['destination']=data['destination']
        token=jwt.encode(decoded_token,secret_key,algorithm='HS256')
        return json.dumps({'status':201, 'message': 'Success',
                            'data': token, 'errorMessages': None})
    except jwt.ExpiredSignatureError:
        return json.dumps({'status':500, 'message': 'Failed',
                            'data': None, 'errorMessages': ['Expired Jwt Token']})
    except jwt.InvalidTokenError:
        return json.dumps({'status':500, 'message': 'Failed',
                            'data': None, 'errorMessages': ['Invalid Jwt Token']})
@app.route('/signup',methods=['POST'])
def signu():
    data=request.get_json()
    res=ins(data['name'],data['email'],data['password'],data['address'],data['role'])
    return res
@app.route('/fetch',methods=['POST'])
def fet():
    data=request.get_json()
    val=valid(data['token'])
    val=json.loads(val)
    if val['status']!=201:
        return json.dumps(val)
    res=fetchall()
    return res
@app.route('/approve',methods=['POST'])
def rout():
    #validate token
    data=request.get_json()
    val=valid(data['token'])
    val=json.loads(val)
    if val['status']!=201:
        return json.dumps(val)
    return apr(data['uuid'],data['token'])
@app.route('/reject',methods=['POST'])
def rejj():
    data=request.get_json()
    val=valid(data['token'])
    val=json.loads(val)
    if val['status']!=201:
        return json.dumps(val)
    x=rej(data['uuid'])
    return x
@app.route('/forgot',methods=['POST'])
def fo():
    data=request.get_json()
    res=fp(data['email'])
    return res
@app.route('/reset',methods=['POST'])
def res():
    data=request.get_json()
    print(data)
    res=reset(data['uuid'],data['password'])
    return res
if __name__ == "__main__":
    app.run(debug=True,port=5000)
