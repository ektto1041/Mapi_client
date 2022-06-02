from flask import Flask, jsonify, request, session, Blueprint
from service.record import AllRecordInquiry, OneRecordInquiry, RecordCreate


bp = Blueprint('record', __name__, url_prefix='/')

all_record_inquiry_service = AllRecordInquiry()
one_record_inquiry_service = OneRecordInquiry()
record_create_service = RecordCreate()

@bp.route('/record/<record_id>', methods=['GET'])
def one_record_inquiry(record_id):
    if 'userId' in session:
        result = one_record_inquiry_service.return_service(record_id, int(session['userId']))
        
        return jsonify(result)
    else:
        return jsonify({'recordId' : -1})
    
    
    
@bp.route('/record/<map_id>/<category>', methods=['GET'])
def all_record_inquiry(map_id, category):
    if 'userId' in session:
        result = all_record_inquiry_service.return_service(map_id, int(session['userId']),category)
           
        return jsonify(result)
    
    else:
        return jsonify({'recordId' : -1})
    

@bp.route('/record', methods=['POST'])
def create_record():
    if 'userId' in session:
        userId = session['userId']
        request_data = request.get_json()
        
        mapId = request_data['mapId']
        title = request_data['title']
        category = request_data['category']
        content = request_data['content']
        latitude = request_data['latitude']
        longitude = request_data['longitude']
        
        print(mapId)
        result = record_create_service.return_service(userId, mapId, title, category, content, latitude, longitude)
        
        return jsonify(result)
    
    else:
        return jsonify({'recordId' : -1})