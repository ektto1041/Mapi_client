from service import Service
import pymysql

class Login(Service):
    def __init__(self):
        super().__init__()
        
               
    def return_service(self, email, password):
        iduser = self.get_iduser(email, password)
        
        
        return {'userId' : iduser}
        
    
    
    def get_iduser(self, email, password):
        self.cursor.execute("SELECT * FROM user WHERE email= '%s'" %(str(email)))
        account = self.cursor.fetchone()
        
        if account:    
            if password != account['password']:
                return -1
            else:
                return account['iduser']
        else:
            return -1
     
        
class SignUp(Service):
    def __init__(self):
        super().__init__()
    
    def return_service(self, email, password, name):
        self.cursor.execute("SELECT * FROM user  WHERE email= '%s'" %(str(email)))
        account = self.cursor.fetchone()
        
        if not account:
            self.cursor.execute("SELECT COUNT(*) FROM user")
            iduser = self.cursor.fetchone()['COUNT(*)']
            idmap = self.return_main_idmap()
            map_name = ''
            share=0
            
            sql = "INSERT INTO map(iduser, idmap, share, map_name) VALUES(%s, %s, %s, %s)"
            self.cursor.execute(sql, (int(iduser), str(idmap), int(share), str(map_name)))
            self.db.commit()
            
            sql = "INSERT INTO user(iduser, email, password, name, main_map_id) VALUES(%s, %s, %s, %s, %s)"
            self.cursor.execute(sql, (int(iduser), str(email), str(password), str(name), int(idmap)))
            self.db.commit()
            
            return {'userId' : iduser}
        
        else:
            return {'userId' : -1}
        
    
    def return_main_idmap(self):
        self.cursor.execute("SELECT COUNT(*) FROM map")
        idmap = self.cursor.fetchone()['COUNT(*)']
        
        return idmap
        