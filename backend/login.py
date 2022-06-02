from flask import Flask, jsonify, request, session, Blueprint
from service.login import Login, SignUp

bp = Blueprint('login', __name__, url_prefix='/')
login_service = Login()
signup_service = SignUp()


@bp.route('/login', methods=['POST'])
def login():
    request_data = request.get_json()
    
    email = request_data['email']
    password = request_data['password']
    
    result = login_service.return_service(email, password)
    
    if result['userId'] != -1:
        session.permanent = True
        session['userId'] = result['userId']
    
    
    return jsonify(result)
    
@bp.route('/user', methods=['POST'])
def user():
    request_data = request.get_json()
    
    email = request_data['email']
    password = request_data['password']
    name = request_data['name']
    
    result = signup_service.return_service(email, password, name)
    
    return jsonify(result)


@bp.route('/logout', methods=['GET'])
def logout():
    session.pop('userId', None)
    
    return jsonify({})