import flask
from flask_cors import CORS,cross_origin

app = flask.Flask(__name__)
cors = CORS(app, resources={r"/": {"origins": "*"}})



@app.route('/',methods = ['GET'])
@cross_origin(origin = 'localhost',headers=['Access-Control-Allow-Origin'] )
def api():
    return 'getReq'


@app.route('/submit',methods = ['POST'])
@cross_origin(origin = 'localhost',headers=['Access-Control-Allow-Origin'] )

def submit():
    csvURI = flask.request.get_json()
    print(csvURI)
    return 'DONE',201