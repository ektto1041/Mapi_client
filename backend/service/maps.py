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
    
    
class MapDelete(Service):
    def __init__(self):
        super().__init__()
        
    
    def return_service(self, map_id, user_id):
        if MapEntity.check_auth_map(map_id, user_id):
            
            if MapEntity.check_main_map(map_id):
            
                return {'mapId' : -1}
            else:
                map_id = MapEntity.del_map(map_id)
                
                return {'mapId' : map_id}
            
        else:
            return{'mapId' : -1}
    
    

class MapUpdate(Service):
    def __init__(self):
        super().__init__()
        
    def return_service(self, map_id, name, share, user_id):
        if MapEntity.check_auth_map(map_id, user_id):
            if not MapEntity.check_main_map(map_id):
                
                map_id = MapEntity.update_map(map_id, name, share)
            
                return {'mapId' : map_id}
            
            else:
                return {'mapId' : -1}
        else:
                return {'mapId' : -1}
        
        

    
        
    