import yaml
import pymysql

with open('./config/sql_setting.yaml') as f:
        cfg = yaml.load(f, yaml.FullLoader)
    # app.config['MYSQL_HOST'] = cfg['host']
    # app.config['MYSQL_USER'] = cfg['user']
    # app.config['MYSQL_PASSWORD'] = cfg['pwd']
    # app.config['MYSQL_DB'] = cfg['db']
    # app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
try:
    db = pymysql.connect(host=cfg['host'], user=cfg['user'], passwd=cfg['pwd'], port=cfg['port'])
    
except:
    print("db connect fail")


class Service:
    db = db
    def __init__(self):
        self.cursor = self.db.cursor(pymysql.cursors.DictCursor)
        self.cursor.execute("USE mapi")
    
    def return_service(self):
        raise NotImplementedError