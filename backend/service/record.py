from service import Service
import pymysql
from datetime import datetime
from pytz import timezone

class AllRecordInquiry(Service):
    def __init__(self):
        super().__init__()
    
    def return_service(self, map_id, user_id, category):
        if not self.check_valid_user(map_id, user_id):
            return [{'recordId' : -1}]
        
        if category != '-':
            records = self.get_specific_category_records(map_id, category)
        else:
            records = self.get_all_records(map_id)
            
         
        return records
    
    def get_specific_category_records(self, map_id, category):
        self.cursor.execute("SELECT * FROM record  WHERE id_map= '%s' and category = '%s'" %(int(map_id), str(category)))
        records = self.cursor.fetchall()
        
        return records
    
    def get_all_records(self, map_id):
        self.cursor.execute("SELECT * FROM record  WHERE id_map= '%s'" %(int(map_id)))
        records = self.cursor.fetchall()
        
        return records
    
    def check_valid_user(self, map_id, user_id):
        self.cursor.execute("SELECT * FROM map  WHERE idmap= '%s'" %(int(map_id)))
        record = self.cursor.fetchone()
        
        if int(record['iduser']) != user_id and int(record['share']) == 0:
            return False
        else:
            return True


class OneRecordInquiry(Service):
    def __init__(self):
        super().__init__()
    
    def return_service(self, record_id, user_id):
        if not self.check_valid_user(record_id, user_id):
            return {'recordId' : -1}
        
        self.cursor.execute("SELECT * FROM record  WHERE idrecord= '%s'" %(int(record_id)))
            
        record = self.cursor.fetchone()
         
        return record
    
    def check_valid_user(self, record_id, user_id):
        self.cursor.execute("SELECT * FROM record  WHERE idrecord= '%s'" %(int(record_id)))
        record = self.cursor.fetchone()
        map_id = int(record['id_map'])
        record_user_id = int(record['id_user'])
        
        self.cursor.execute("SELECT * FROM map  WHERE idmap= '%s'" %(int(map_id)))
        record = self.cursor.fetchone()
        
        if int(record['share']) == 0:
            
            if record_user_id != user_id :
                return False
            
            return True
        
        
        else:
            return True
     

class RecordCreate(Service):
    def __init__(self):
        super().__init__()
        
    def return_service(self, user_id, map_id, title, category, content, latitude, longitude):
        write_date, write_time = self.return_write_datetime()
        self.cursor.execute("SELECT COUNT(*) FROM record")
        record_id = self.cursor.fetchone()['COUNT(*)']

        sql = 'INSERT INTO record (id_user, id_map, idrecord, title, category, content, latitude, longitude, write_date, write_time) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'
        
        try:
            self.cursor.execute(sql, (int(user_id), int(map_id), int(record_id), str(title), str(category), str(content), float(latitude), float(longitude), str(write_date), str(write_time)))
            self.db.commit()
            
            return {'recordId' : record_id}
        except:
            return {'recordId' : -1}
        
              
    def return_write_datetime(self):
        write_datetime = datetime.now(timezone('Asia/Seoul')).strftime('%Y-%m-%d %H:%M')
        write_datetime = write_datetime.split(' ')
        
        write_date = write_datetime[0]
        write_time = write_datetime[1]
        
        return write_date, write_time
        
        