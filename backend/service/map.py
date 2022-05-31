from service import Service
import pymysql


class MapInquiry(Service):
    def __init__(self):
        self.cursor = self.db.cursor(pymysql.cursors.DictCurosr)
        

    def return_service(self, userId):
        if userId == -1:
            maps = self.get_shared_map()
        
        else:
            maps = self.get_private_map(userId)
            
        return maps
        
    def get_shared_map(self):
        self.cursor.execute("SELECT * FROM map WHERE share==1")
        
        shared_maps = self.cursor.fetchall()
        
        return shared_maps
        
        
    def get_private_map(self, userId):
        self.cursor.execute("SELECT * FROM map WHERE iduser==%d"%(int(userId)))
        
        private_maps = self.cursor.fetchall()
        
        return private_maps

class MapCreate(Service):
    def __init__(self):
        self.cursor = self.db.cursor(pymysql.cursors.DictCurosr)
        
    def return_service(self, userId, name, share):
        self.cursor.execute("SELECT COUNT(*) FROM map")
        mapId = self.cursor.fetchone()['COUNT(*)']
        sql = 'INSERT INTO map (idmap, iduser, share, name) VALUES (%d, %d, %s, %s)'
        
        try:
            self.cusor.execute(sql, (mapId, userId, int(share), name))
            self.db.commit()
            
            return {'mapId' : mapId}
        except:
            return {'mapId' : -1}
    
        
    