from entity import Entity
from entity.user_entity import UserEntity

class MapEntity(Entity):
    # super().__init__()
      
        
    @classmethod        
    def get_shared_map_list_with_user_name(cls):
        cls._cursor.execute("SELECT * from maps WHERE share=1")
        
        shared_maps = cls._cursor.fetchall()
        
        for i in shared_maps:
            user_name = UserEntity.get_user_name(i['iduser'])
            del(i['iduser'])
            i['user_name'] = user_name
    
        return shared_maps        
    
    @classmethod
    def get_private_map_list_with_user_name(cls, user_id):
        cls._cursor.execute("SELECT * FROM maps WHERE iduser=%s" % user_id)
        
        private_maps = cls._cursor.fetchall()
        user_name = UserEntity.get_user_name(user_id)
        print(private_maps)
        
        for i in private_maps:
            del i['iduser']
            i['user_name'] = user_name
            
        return private_maps
    
    
    @classmethod
    def create_map(cls, user_id, map_name, share):
        
        
        sql = 'INSERT INTO maps (iduser, share, map_name) VALUES (%s, %s, %s)'
        cls._cursor.execute(sql, (user_id, int(share), map_name))
        cls._db.commit()
        
        cls._cursor.execute('select LAST_INSERT_ID()')
        map_id = cls._cursor.fetchone()['LAST_INSERT_ID()']

        return {'mapId' : map_id}
    
    
    @classmethod
    def check_valid_map(cls, map_id, user_id):
        cls._cursor.execute("SELECT * FROM maps  WHERE idmap= '%s'" %(int(map_id)))
        record = cls._cursor.fetchone()
        
        if int(record['iduser']) != user_id and int(record['share']) == 0:
            return False
        else:
            return True
        
        
    @classmethod
    def get_map(cls, map_id):
        cls._cursor.execute("SELECT * FROM maps  WHERE idmap= '%s'" %(int(map_id)))
        record = cls._cursor.fetchone()
        
        return record
        
            
        
        
        
