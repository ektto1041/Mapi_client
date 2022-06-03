from entity import Entity


class UserEntity(Entity):
    # super().__init__()
    
    
    @classmethod
    def check_valid_user(cls, email, password):
        cls._cursor.execute("SELECT password FROM users WHERE email= \'%s\'" %(str(email)))
        account = cls._cursor.fetchone()
        
        if account:
            if password != account['password']:
                return False
            
            return True
        
        else:
            return False
        
    
    @classmethod
    def get_user_id(cls, email):
        cls._cursor.execute("SELECT iduser from users where email=\'%s\'" %(str(email)))
        user_id = cls._cursor.fetchone()['iduser']
        
        return user_id
    
    @classmethod
    def get_user_name(cls, user_id):
        cls._cursor.execute("SELECT name FROM users WHERE iduser= %s" %(int(user_id)))
        user_name = cls._cursor.fetchone()['name']
        
        return user_name
    
    
    @classmethod
    def get_main_map_id(cls, user_id):
        cls._cursor.execute("SELECT main_map_id FROM users WHERE iduser=%s" % (int(user_id)))
        main_map_id = cls._cursor.fetchone()['main_map_id']
        
        return main_map_id
    
    @classmethod
    def create_user(cls, email, password, name):      

        sql = "INSERT INTO users(email, password, name) VALUES(%s, %s, %s)"
        
        cls._cursor.execute(sql, (str(email), str(password), str(name)))
        cls._db.commit()
        
        cls._cursor.execute("SELECT LAST_INSERT_ID()")
        user_id = cls._cursor.fetchone()['LAST_INSERT_ID()']
        
        from entity.map_entity import MapEntity
        main_map_id = MapEntity.create_map(user_id, '{}의 지도'.format(name), 0)['mapId']
        
        sql = "UPDATE users SET main_map_id=%s where iduser=%s"
        cls._cursor.execute(sql, (int(main_map_id), int(user_id)))
        cls._db.commit()
        
        
        return user_id
        
        
    @classmethod
    def check_same_email(cls, email):
        cls._cursor.execute("SELECT * FROM users  WHERE email= '%s'" %(str(email)))
        account = cls._cursor.fetchone()
        
        if not account:
            return False
        
        else:
            return True
        
        
        
        
        
    
    
