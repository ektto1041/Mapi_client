from calendar import c
from regex import R
from entity import Entity
from datetime import datetime
from pytz import timezone
from entity.map_entity import MapEntity

def return_write_datetime():
    write_datetime = datetime.now(timezone('Asia/Seoul')).strftime('%Y-%m-%d %H:%M')
    write_datetime = write_datetime.split(' ')
    
    write_date = write_datetime[0]
    write_time = write_datetime[1]
    
    return write_date, write_time

class RecordEntity(Entity):
    # super().__init__()
    
    @classmethod
    def check_valid_record(cls, record_id, user_id):
        cls._cursor.execute("SELECT * FROM records  WHERE idrecord= '%s'" %(int(record_id)))
        record = cls._cursor.fetchone()
        map_id = int(record['id_map'])
        record_user_id = int(record['id_user'])
        
        maps = MapEntity.get_map(map_id)
        
        if int(maps['share']) == 0:
            
            if record_user_id != user_id:
                return False
            
            return True
        
        else:
            return True
        
    
    @classmethod
    def get_record(cls, record_id):
        cls._cursor.execute("SELECT * FROM records  WHERE idrecord= '%s'" %(int(record_id)))
        record = cls._cursor.fetchone()
        
        return record
    
    @classmethod
    def create_record(cls, user_id, map_id, title, category, content, latitude, longitude):
        write_date, write_time = return_write_datetime()
        

        sql = 'INSERT INTO records (id_user, id_map, title, category, content, latitude, longitude, write_date, write_time) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)'
        
        
        cls._cursor.execute(sql, (int(user_id), int(map_id), str(title), str(category), str(content), float(latitude), float(longitude), str(write_date), str(write_time)))
        cls._db.commit()
        
        cls._cursor.execute("SELECT LAST_INSERT_ID()")
        record = cls._cursor.fetchone()
        
        return record['LAST_INSERT_ID()']
    
    
    @classmethod
    def get_specific_category_records(cls, map_id, category):
        cls._cursor.execute("SELECT * FROM records  WHERE id_map= '%s' and category = '%s'" %(int(map_id), str(category)))
        records = cls._cursor.fetchall()
        
        return records
    
    @classmethod
    def get_all_records(cls, map_id):
        cls._cursor.execute("SELECT * FROM records  WHERE id_map= '%s'" %(int(map_id)))
        records = cls._cursor.fetchall()
        
        return records
        

    
    @classmethod
    def del_record(cls, record_id):
        try:
            cls._cursor.execute("DELETE FROM records  WHERE idrecord= %s" %(int(record_id)))
            cls._db.commit()
            
            return record_id        
        except:
            return -1
        
    @classmethod
    def update_record(cls, record_id, title, category, content):
        try:
            cls._cursor.execute("UPDATE records SET title=\'%s\', category=\'%s\', content=\'%s\' WHERE idrecord=%s" % (title, category, content, record_id))
            cls._db.commit()
            
            return record_id
        
        except:
            return -1
        
        
    @classmethod
    def check_auth_record(cls, record_id, user_id):
        try:
            cls._cursor.execute("SELECT * from records WHERE idrecord=%s and id_user=%s" % (int(record_id), int(user_id)))
            record = cls._cursor.fetchone()
            
            if record:
                return True
            
            else:
                return False
                
        except:
            return False            
            
            
        
            
        
        