from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_mysqldb import MySQL
import yaml
from datetime import timedelta
# from flask_sqlalchemy import SQLAlchemy

db = MySQL()

def create_app():
    app = Flask(__name__)
    app.secret_key = 'super secret key'
    app.config['SESSION_TYPE'] = 'filesystem'
    CORS(app, resources={r'*': {'origins': 'http://localhost:3000'}}, supports_credentials=True)
    app.permanent_session_lifetime = timedelta(minutes=5)

    with open('config/sql_setting.yaml') as f:
        cfg = yaml.load(f, yaml.FullLoader)

    
    import login
    app.register_blueprint(login.bp)
    import record
    app.register_blueprint(record.bp)
    import maps
    app.register_blueprint(maps.bp)
    
    return app

