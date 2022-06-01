from flask import Flask, jsonify, request, session, Blueprint
from itsdangerous import json
from service.maps import MapCreate, MapInquiry

bp = Blueprint('maps', __name__, url_prefix='/')
map_create_service = MapCreate()
map_inquiry_service = MapInquiry()


@bp.route('/map', methods=['POST'])
def create_map():
    
    if 'userId' in session:
        name = request.form.get('name')
        share = request.form.get('share')
        
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