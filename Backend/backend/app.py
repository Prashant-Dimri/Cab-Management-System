from flask import Flask
from flask_sqlalchemy import SQLAlchemy
app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:020202@localhost:5432/First'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
db=SQLAlchemy(app)
class User(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    username=db.Column(db.String(50),nullable=False)
@app.route('/')
def index():
    users=User.query.all()
    return f'Users:{", ".join([user.username for user in users])}'
#def hello():
 #   return "hello world"
if __name__=='__main__':
    app.run(debug=True)
