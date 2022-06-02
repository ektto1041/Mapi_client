from service import Service
import pymysql
from entity.map_entity import MapEntity


class MapInquiry(Service):
    def __init__(self):
        super().__init__()

    def return_service(self, user_id):
        if user_id == -1:
            maps = MapEntity.get_shared_map_list_with_user_name()
        
        else:
            maps = MapEntity.get_private_map_list_with_user_name(user_id)
            
        return maps
       



class MapCreate(Service):
    def __init__(self):
        super().__init__()
        
    def return_service(self, user_id, map_name, share):
        map_id = MapEntity.create_map(user_id, map_name, share)
            
        return {'mapId' : map_id}

    
        
    