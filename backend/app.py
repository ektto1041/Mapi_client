from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_mysqldb import MySQL
import yaml
# from flask_sqlalchemy import SQLAlchemy

db = MySQL()

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    with open('config/sql_setting.yaml') as f:
        cfg = yaml.load(f, yaml.FullLoader)
    app.config['MYSQL_HOST'] = cfg['host']
    app.config['MYSQL_USER'] = cfg['user']
    app.config['MYSQL_PASSWORD'] = cfg['pwd']
    app.config['MYSQL_DB'] = cfg['db']
    app.config['MYSQL_CURSORCLASS'] = 'DictCursor'


    db.init_app(app)
    
    import login
    app.register_blueprint(login.bp)
    
    return app

