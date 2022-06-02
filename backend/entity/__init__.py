import yaml
import pymysql

with open('./config/sql_setting.yaml') as f:
        cfg = yaml.load(f, yaml.FullLoader)

try:
    db = pymysql.connect(host=cfg['host'], user=cfg['user'], passwd=cfg['pwd'], port=cfg['port'])
    
except:
    print("db connect fail")


class Entity:
    _db = db
    

    _cursor = _db.cursor(pymysql.cursors.DictCursor)
    _cursor.execute("USE mapi")
    