from application import app,db,User
from flask import render_template, request,Response,url_for
import json


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/profile')
def profile():
    return render_template('profile_view.html')

@app.route('/create_profile', methods = ['POST'])
def create_profile():
    data = request.json

    with app.app_context():
        new_user = User(**data)
        db.session.add(new_user)
        
        db.session.commit()
        user = User.query.filter_by(id=new_user.id).first()
        full_url= f"{request.url_root[:-1]}/profile/{user.id}"
        print(full_url)
    



    return Response(json.dumps({"url":full_url,"status": 200,"message": "success"}))

@app.route('/profile/<int:id>', methods = ['GET'])
def get_profile(id):
 
    with app.app_context():
        user = User.query.get(id)
    data = user.as_dict()
 
    return render_template('profile_view.html',data = data)
