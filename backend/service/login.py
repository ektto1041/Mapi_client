from service import Service
import pymysql
from entity.user_entity import UserEntity

class Login(Service):
    def __init__(self):
        super().__init__()
        
               
    def return_service(self, email, password):       
        
        if UserEntity.check_valid_user(email, password):
            user_id = UserEntity.get_user_id(email)
            main_map_id = UserEntity.get_main_map_id(user_id)
            
            return {'userId' : user_id, 'mainMapId' : main_map_id}
        else:
            return {'userId' : -1}
        
        
class SignUp(Service):
    def __init__(self):
        super().__init__()
    
    def return_service(self, email, password, name):
        if UserEntity.check_same_email(email):
            return {'userId' : -1}
        
        else:
            user_id = UserEntity.create_user(email, password, name)
            
            return {'userId' : user_id}
        