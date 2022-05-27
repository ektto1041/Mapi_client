from flask import Flask, jsonify, request, session, Blueprint
from flask_mysqldb import MySQL
from app import db
# from flask_sqlalchemy import SQLAlchemy

bp = Blueprint('login', __name__, url_prefix='/')

@bp.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']
    
    cursor = db.connection.cursor()
    cursor.execute("SELECT * FROM user  WHERE email= '%s'" %(str(email)))
    # cursor.execute("SELECT * FROM user")
    
    account = cursor.fetchone()
    print(account)
    if account:
        
        if password != account['password']:
            return jsonify({'userId' : -1})
        
        session['userId'] = account['iduser']
        return jsonify({'userId' : account['iduser']})
    
    else:
        return jsonify({'userId' : -1})
    
    
@bp.route('/user', methods=['POST'])
def user():
    email = request.form['email']
    password = request.form['password']
    name = request.form['name']
    
    cursor = db.connection.cursor()
    cursor.execute("SELECT * FROM user  WHERE email= '%s'" %(str(email)))
    # cursor.execute("SELECT * FROM user")
    account = cursor.fetchone()
    
    cursor.execute("SELECT COUNT(*) FROM user")
    user_id = cursor.fetchone()['COUNT(*)']
    
    if account:
        cursor.execute("INSERT INTO user (iduser, email, password, name) VALUE(%d, %s, %s, %s)" % (user_id, email, password, name))
        return jsonify({'userId' : account['iduser']})
    
    else:
        return jsonify({'userId' : -1})
