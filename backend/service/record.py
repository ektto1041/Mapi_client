from service import Service
import pymysql
from datetime import datetime
from pytz import timezone

class AllRecordInquiry(Service):
    def __init__(self):
        self.cursor = self.db.cursor(pymysql.cursors.DictCurosr)
    
    
    def return_service(self, map_id, category):
        if category != '-':
            records = self.get_specific_category_records(map_id, category)
        else:
            records = self.get_all_records(map_id)
            
         
        return records
    
    def get_specific_category_records(self, map_id, category):
        self.cursor.execute("SELECT * FROM record  WHERE idmap= '%d' and category = '%s'" %(int(map_id), str(category)))
        records = self.curosr.fetch_all()
        
        return records
    
    def get_all_records(self, map_id):
        self.cursor.execute("SELECT * FROM record  WHERE idmap= '%d'" %(int(map_id)))
        records = self.curosr.fetch_all()
        
        return records


class OneRecordInquiry(Service):
    def __init__(self):
        self.cursor = self.db.cursor(pymysql.cursors.DictCurosr)
    
    
    def return_service(self, record_id):
        self.cursor.execute("SELECT * FROM record  WHERE idreocrd= '%d'" %(int(record_id)))
            
        record = self.curosr.fetch_one()
         
        return record
     

class RecordCreate(Service):
    def __init__(self):
        self.cursor = self.db.cursor(pymysql.cursors.DictCurosr)
   
        
    def return_service(self, iduser, idmap, titile, category, content, latitude, longitude):
        write_date, write_time = self.return_write_datetime()
        self.cursor.execute("SELECT COUNT(*) FROM record")
        idrecord = self.cursor.fetchone()['COUNT(*)']
        
        sql = 'INESRT INTO record (iduser, idmap, idrecord, titile, category, content, latitude, longitude, write_date, write_time) \
            VALUES(%d, %d, %d, %s, %s, %s, %f, %f, %s, %s)'
        
        try:
            self.curosr.execute(sql, (iduser, idmap, idrecord, titile, category, content, latitude, longitude, write_date, write_time))
            self.db.commit()

            return {'recordId' : idrecord}
        except:
            return {'recordId' : -1}
        
              
    def return_write_datetime(self):
        write_datetime = datetime.now(timezone('Asia/Seoul')).strftime('%Y-%m-%d %H:%M')
        write_datetime = write_datetime.split(' ')
        
        write_date = write_datetime[0]
        write_time = write_datetime[1]
        
        return write_date, write_time
        
        