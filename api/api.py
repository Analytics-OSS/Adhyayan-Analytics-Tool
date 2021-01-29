import flask
from flask_cors import CORS,cross_origin
import json
app = flask.Flask(__name__)
cors = CORS(app, resources={r"/": {"origins": "*"}})




@app.route('/',methods = ['GET'])
@cross_origin(origin = 'localhost',headers=['Access-Control-Allow-Origin'] )
def api():
    return 'getReq'

csvURI = ''
xvar = ''
yvar = ''
@app.route('/submit',methods = ['POST'])
@cross_origin(origin = 'localhost',headers=['Access-Control-Allow-Origin'] )

def submit():
    data = json.loads(flask.request.get_json())
    csvURI = data['csvLink']
    xvar = data['xvar']
    yvar = data['yvar']
    print(csvURI)
    return 'DONE',201

@app.route('/submit',methods = ['GET'])
@cross_origin(origin = 'localhost',headers=['Access-Control-Allow-Origin'] )

def getVisualization():
    return csvURI