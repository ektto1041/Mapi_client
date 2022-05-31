from flask import Flask, jsonify, request, session, Blueprint
from service.record import AllRecordInquiry, OneRecordInquiry, RecordCreate


bp = Blueprint('record', __name__, url_prefix='/')

all_record_inquiry_service = AllRecordInquiry()
one_record_inquiry_service = OneRecordInquiry()
record_create_service = RecordCreate()

@bp.route('/record/<recordId>', methods=['GET'])
def one_record_inquiry(recordId):
    if 'userId' in session:
        result = one_record_inquiry_service(recordId)
        
        return jsonify(result)
    
    else:
        return jsonify({'recordId' : -1})
    
    
    
@bp.route('/record/<mapId>/<category>', methods=['GET'])
def all_record_inquiry(mapId, category):
    if 'userId' in session:
        result = all_record_inquiry_service(mapId, category)
        
        return jsonify(result)
    
    else:
        return jsonify({'recordId' : -1})
    

@bp.route('/record', methods=['POST'])
def create_record():
    if 'userId' in session:
        userId = session['userId']
        mapId = session['mapId']
        title = request.form['title']
        category = request.form['category']
        content = request.form['content']
        latitude = request.form['latitude']
        longitude = request.form['longitude']
        
        
        result = record_create_service(userId, mapId, title, category, content, latitude, longitude)
        
        return jsonify(result)
    
    else:
        return jsonify({'recordId' : -1})