from flask import Flask, jsonify, request, session, Blueprint
from itsdangerous import json
from service.maps import MapCreate, MapInquiry, MapDelete, MapUpdate

bp = Blueprint('maps', __name__, url_prefix='/')
map_create_service = MapCreate()
map_inquiry_service = MapInquiry()
map_del_service = MapDelete()
map_update_service = MapUpdate()


@bp.route('/map', methods=['POST'])
def create_map():
    
    if 'userId' in session:
        request_data = request.get_json()
        
        name = request_data['name']
        share = request_data['share']
        
        result = map_create_service.return_service(session['userId'], name, share)
    
    
        return jsonify(result)
    
    else:
        
        return jsonify({'mapId' : -1})
    
@bp.route('/maps/<user_id>', methods=['GET'])
def inquire_map(user_id):
    if 'userId' in session:
        user_id = int(user_id)
        if int(session['userId']) == user_id or user_id == -1:
            result = map_inquiry_service.return_service(user_id)
    
        else:
            return jsonify({'mapId' : -1})
        
        
        return jsonify(result)
    
    else:
        
        return jsonify({'mapId' : -1})
    

@bp.route('/map/<map_id>', methods=['DELETE'])
def del_map(map_id):
    if 'userId' in session:
        user_id = session['userId']
        map_id = map_del_service.return_service(map_id, user_id)
    
        return jsonify({'mapId' : map_id})
    
    
    else:
        return jsonify({'mapId' : -1})
    

@bp.route('/map/<map_id>', methods=['PUT'])
def update_map(map_id):
    if 'userId' in session:
        user_id = session['userId']
        request_data = request.get_json()
        
        name = request_data['name']
        share = request_data['share']
        
        map_id = map_update_service.return_service(map_id, name, share, user_id)
        
    
        return jsonify({'mapId' : map_id})
    
    
    else:
        return jsonify({'mapId' : -1})
    