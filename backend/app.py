from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_mysqldb import MySQL
import yaml
from datetime import timedelta
# from flask_sqlalchemy import SQLAlchemy

from service.login import Login, SingUp
from service.record import AllRecordInquiry, OneRecordInquiry, RecordCreate

db = MySQL()

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.permanent_session_lifetime = timedelta(minutes=5)

    with open('config/sql_setting.yaml') as f:
        cfg = yaml.load(f, yaml.FullLoader)

    
    import login
    app.register_blueprint(login.bp)
    import record
    app.register_blueprint(record.bp)
    
    return app

