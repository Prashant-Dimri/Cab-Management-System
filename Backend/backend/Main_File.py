from flask import Flask, request
from Authenticate_User_Token_API import AuthenticateToken
from Add_New_User import AddUser
from User_Availability_Checking_API import chk
from flask_cors import CORS
from Unregistered_Drivers_Fetching_API import fetchall
from Approve_User_API import ApproveUser
from Token_Validating_API import valid
from Reset_Password_API import reset
import jwt
import json
from Reject_User_API import RejectUser
from Forgot_Password_API import ForgotPassword

app = Flask(__name__)
CORS(app)
app.secret_key = 'sadb2h1hb2b3mn2b3mn2b1jb32hb321nm2j3njn3'
@app.route('/', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    availability = chk(email, password)
    return availability

@app.route('/selectCab', methods=['POST'])
def select_cab():
    data = request.get_json()
    token_validation = valid(data['token'])
    token_validation = json.loads(token_validation)
    if token_validation['status'] != 201:
        return json.dumps(token_validation)
    result = AuthenticateToken(data['token'], data['type'])
    return result

@app.route('/Booking', methods=['POST'])
def book_cab():
    secret_key = 'sadb2h1hb2b3mn2b3mn2b1jb32hb321nm2j3njn3'
    data = request.get_json()
    try:
        decoded_token = jwt.decode(data['token'], secret_key, algorithms='HS256')
        decoded_token['pickup'] = data['pickup']
        decoded_token['destination'] = data['destination']
        updated_token = jwt.encode(decoded_token, secret_key, algorithm='HS256')
        return json.dumps({
            'status': 201,
            'message': 'Success',
            'data': updated_token,
            'errorMessages': None
        })
    except jwt.ExpiredSignatureError:
        return json.dumps({
            'status': 500,
            'message': 'Failed',
            'data': None,
            'errorMessages': ['Expired Jwt Token']
        })
    except jwt.InvalidTokenError:
        return json.dumps({
            'status': 500,
            'message': 'Failed',
            'data': None,
            'errorMessages': ['Invalid Jwt Token']
        })

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    result = AddUser(data['name'], data['email'], data['password'], data['address'], data['role'])
    return result

@app.route('/fetch', methods=['POST'])
def fetch_unregistered_drivers():
    data = request.get_json()
    token_validation = valid(data['token'])
    token_validation = json.loads(token_validation)
    if token_validation['status'] != 201:
        return json.dumps(token_validation)
    result = fetchall()
    return result

@app.route('/approve', methods=['POST'])
def approve_user():
    data = request.get_json()
    token_validation = valid(data['token'])
    token_validation = json.loads(token_validation)
    if token_validation['status'] != 201:
        return json.dumps(token_validation)
    return ApproveUser(data['uuid'], data['token'])

@app.route('/reject', methods=['POST'])
def reject_user():
    data = request.get_json()
    token_validation = valid(data['token'])
    token_validation = json.loads(token_validation)
    if token_validation['status'] != 201:
        return json.dumps(token_validation)
    result = RejectUser(data['uuid'])
    return result

@app.route('/forgot', methods=['POST'])
def forgot_password():
    data = request.get_json()
    result = ForgotPassword(data['email'])
    return result

@app.route('/reset', methods=['POST'])
def reset_password():
    data = request.get_json()
    print(data)
    result = reset(data['uuid'], data['password'])
    return result

if __name__ == "__main__":
    app.run(debug=True, port=5000)
