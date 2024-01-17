from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False






db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    profile_pic = db.Column(db.Text, nullable=False)
    social_handlers = db.Column(db.JSON, nullable=False)


    def __repr__(self):
        return '<User {self.name}>'
    
    def as_dict(self):
       return {column.name: getattr(self, column.name) for column in self.__table__.columns}

with app.app_context():

    db.create_all()

   




from application import routes