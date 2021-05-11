from flask import Flask,Blueprint
import json

main = Blueprint('main', __name__)

@main.route('/', methods = ['GET'])
def api():
    return 'getReq'

@main.route('/submit',methods = ['POST'])
#@cross_origin(origin = 'localhost',headers=['Access-Control-Allow-Origin'] )

def submit():
    datastr = json.dumps(Flask.request.get_json())
    data = json.loads(datastr)
    recieved_info = {
        "csvURI":data['csvLink'],
        "xvar":data['xvar'],
        "yvar":data['yvar']
    }
    info_id = info.insert_one(recieved_info).inserted_id
    
    return 'DONE',201

