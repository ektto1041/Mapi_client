from service import Service
import pymysql


class MapInquiry(Service):
    def __init__(self):
        super().__init__()

    def return_service(self, user_id):
        if user_id == -1:
            maps = self.get_shared_map()
        
        else:
            maps = self.get_private_map(user_id)
            
        return maps
        
    def get_shared_map(self):
        self.cursor.execute("SELECT * FROM map WHERE share=1")
        
        shared_maps = self.cursor.fetchall()
        
        return shared_maps
        
        
    def get_private_map(self, user_id):
        self.cursor.execute("SELECT * FROM map WHERE iduser=%s and map_name!=\"\"" % (int(user_id)))
        
        private_maps = self.cursor.fetchall()
        
        return private_maps

class MapCreate(Service):
    def __init__(self):
        super().__init__()
        
    def return_service(self, user_id, name, share):
        self.cursor.execute("SELECT COUNT(*) FROM map")
        map_id = self.cursor.fetchone()['COUNT(*)']
        
        sql = 'INSERT INTO map (idmap, iduser, share, map_name) VALUES (%s, %s, %s, %s)'
        self.cursor.execute(sql, (map_id, user_id, int(share), name))
        try:
            
            self.db.commit()
            
            return {'mapId' : map_id}
        except:
            return {'mapId' : -1}
    
        
    