from service import Service
import pymysql

class Login(Service):
    def __init__(self):
        self.cursor = self.db.cursor(pymysql.cursors.DictCurosr)
               
    def return_service(self, email, password):
        iduser = self.get_iduser(email, password)
        
        
        return {'userId' : iduser}
        
    
    
    def get_iduser(self, email, password):
        self.cursor.execute("SELECT * FROM user  WHERE email= '%s'" %(str(email)))
        account = self.cursor.fetchone()
        
        if account:    
            if password != account['password']:
                return -1
            else:
                return account['iduser']
        else:
            return False
     
        
class SignUp(Service):
    def __init__(self):
        self.cursor = self.db.cursor(pymysql.cursors.DictCurosr)
    
    
    def return_service(self, email, password, name):
        self.cursor.execute("SELECT * FROM user  WHERE email= '%s'" %(str(email)))
        account = self.cursor.fetchone()
        
        
        if account:
            self.cursor.execute("SELECT COUNT(*) FROM user")
            iduser = self.cursor.fetchone()['COUNT(*)']
            
            self.cursor.execute("INSERT INTO user (iduser, email, password, name) VALUE(%d, %s, %s, %s)" % (iduser, email, password, name))
            self.db.commit()
            
            return {'userId' : iduser}
        
        else:
            return {'userId' : -1}