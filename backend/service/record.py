from service import Service
import pymysql
from datetime import datetime
from pytz import timezone
from entity.record_entity import RecordEntity
from entity.map_entity import MapEntity

class AllRecordInquiry(Service):
    def __init__(self):
        super().__init__()
    
    def return_service(self, map_id, user_id, category):
        if not MapEntity.check_valid_map(map_id, user_id):
            return [{'recordId' : -1}]
        
        if category != '-':
            records = RecordEntity.get_specific_category_records(map_id, category)
        else:
            records = RecordEntity.get_all_records(map_id)
            
         
        return records
    


class OneRecordInquiry(Service):
    def __init__(self):
        super().__init__()
    
    def return_service(self, record_id, user_id):
        if not RecordEntity.check_valid_record(record_id, user_id):
            return {'recordId' : -1}
        
        record = RecordEntity.get_record(record_id)
         
        return record
     

class RecordCreate(Service):
    def __init__(self):
        super().__init__()
        
    def return_service(self, user_id, map_id, title, category, content, latitude, longitude):
        try:
            record_id = RecordEntity.create_record(user_id, map_id, title, category, content, latitude, longitude)
            
            return {'recordId' : record_id}
        except:
            return {'recordId' : -1}
        
              
    
        
        