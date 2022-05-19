from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route('/maps')
def my_profile():
    response_body = [{"map1" : {"diary1" : 1, "diary2" : 2}}]
    

    return jsonify(response_body)

app.run()
