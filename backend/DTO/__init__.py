import dataclasses as dc


@dc.dataclass
class USER:
    __iduser : int = None
    __name : str = None
    __password : str = None
    __email : str = None
    __main_map_id : int = None
    
    
@dc.dataclass
class RECORD:
    # __iduser : int = None
    __idmap : int = None
    __latitude : float = None
    __longitude : float = None
    __category : str = None
    __title : str = None
    __content : str = None
    __write_date : str = None
    __write_time : str = None


@dc.dataclass
class MAP:
    __idmap : int = None
    __iduser : int = None
    __share : bool = None
    


        
        
        