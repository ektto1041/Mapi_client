from flask import Flask, jsonify, request, session, Blueprint
from service.login import Login, SignUp

bp = Blueprint('login', __name__, url_prefix='/')
login_service = Login()
signup_service = SignUp()


@bp.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']
    
    result = login_service(email, password)
    
    if result['uuserId'] != -1:
        session.permanent = True
        session['userId'] = result['userId']
    
    
    return jsonify(result)
    
@bp.route('/user', methods=['POST'])
def user():
    email = request.form['email']
    password = request.form['password']
    name = request.form['name']
    
    result = signup_service(email, password, name)
    
    return jsonify(result)


@bp.route('/logout', methods=['GET'])
def logout():
    session.pop('userId', None)
    
    return jsonify({})