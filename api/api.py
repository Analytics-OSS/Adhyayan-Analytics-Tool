import flask
import sys
from flask_cors import CORS,cross_origin
import json
from pymongo import MongoClient
from bokeh.plotting import figure, output_file, show
from bokeh.embed import json_item
import pandas as pd
import boto3
from bson import ObjectId

app = flask.Flask(__name__)
CORS(app, resources=r'/*')

client = MongoClient("mongodb+srv://admin:admin123@cluster0.xraoe.mongodb.net/adhyayan?retryWrites=true&w=majority")
db = client.adhyayan
file_path_details = db.file_info
file_details = db.file_details
variable_details = db.variable_details

boto_client = boto3.client('s3')

class JSONEncoder(json.JSONEncoder):
    def default(self,o):
        if isinstance(o,ObjectId):
            return str(o)
        return json.JSONEncoder.default(self,o)


def json_response(payload,status = 200):
    return (flask.json.dumps(payload),status,{'content-type':'application/json'})



@app.route('/',methods = ['GET'])
#@cross_origin(origin = 'localhost',headers=['Access-Control-Allow-Origin'] )
def api():
    return 'getReq'

@app.route('/submit',methods = ['POST'])
#@cross_origin(origin = 'localhost',headers=['Access-Control-Allow-Origin'] )

def submit():
    datastr = json.dumps(flask.request.get_json())
    data = json.loads(datastr)
    recieved_info = {
        "csvURI":data['csvLink']
    }
    info_id = file_path_details.insert_one(recieved_info).inserted_id
    #for posting the contents of file in database
    details = file_path_details.find_one()
    uri = details['csvURI']
    path = 's3://adhyan-csv-storage/'+uri[44:]
    df = pd.read_csv(path)
    row_count = df.shape[0]
    column_count = df.shape[1]
    column_names = df.columns.tolist()

    final_row_data = []
    
    for index,rows in df.iterrows():
        final_row_data.append(rows.to_dict())
        if index > 4:
            break
    
    json_result = {'rows':row_count,'cols':column_count,'columns':column_names,'row_data':final_row_data}
    details_id = file_details.insert_one(json_result).inserted_id
    return 'DONE',201

@app.route('/fileDetails',methods = ['GET'])
#@cross_origin(origin = 'localhost',headers=['Access-Control-Allow-Origin'] )
def getVisualization():
    details = file_details.find_one()
    #return json.dumps(json.encode(details,cls=JSONEncoder))
    return json.dumps(JSONEncoder().encode(details  ))


@app.route('/variableDetails',methods = ['POST'])
def getVisualizationDetails():
    details_str = json.dumps(flask.request.get_json())
    details = json.loads(details_str)
    recieved_info = {
        "xVar":details['xVar'],
        "yVar":details['yVar']
    }
    info_id = variable_details.insert_one(recieved_info).inserted_id
    return 'DONE',201

@app.route('/scatterPlot',methods = ['GET'])
def sendScatterVisualization():
    var_details = variable_details.find_one()
    path_details = file_path_details.find_one()
    uri = path_details['csvURI']
    path = 's3://adhyan-csv-storage/'+uri[44:]
    df = pd.read_csv(path)
    a = var_details['xVar']
    b = var_details['yVar']     
    x = df[a]
    y = df[b]
    TOOLS="hover,crosshair,pan,wheel_zoom,zoom_in,zoom_out,box_zoom,undo,redo,reset,tap,save,box_select,poly_select,lasso_select,"
    title_str = a + ' vs ' + b 
    p = figure(title = title_str,tools=TOOLS)
    p.xaxis.axis_label = a
    p.yaxis.axis_label = b
    p.scatter(x,y/1000)
    return json.dumps(json_item(p,"plot"))


@app.route('/linePlot',methods = ['GET'])
def sendLineVisualization():
    var_details = variable_details.find_one()
    path_details = file_path_details.find_one()
    uri = path_details['csvURI']
    path = 's3://adhyan-csv-storage/'+uri[44:]
    df = pd.read_csv(path)    
    a = var_details['xVar']
    b = var_details['yVar']     
    x = df[a]
    y = df[b]
    TOOLS="hover,crosshair,pan,wheel_zoom,zoom_in,zoom_out,box_zoom,undo,redo,reset,tap,save,box_select,poly_select,lasso_select,"
    title_str = a + ' vs ' + b 
    p = figure(title=title_str, x_axis_label=a, y_axis_label=b)
    p.line(x,y,legend_label=title_str,line_width=2)
    return json.dumps(json_item(p,"plot"))

@app.route('/barPlot',methods = ['GET'])
def sendBarVisualization():
    var_details = variable_details.find_one()
    path_details = file_path_details.find_one()
    uri = path_details['csvURI']
    path = 's3://adhyan-csv-storage/'+uri[44:]
    df = pd.read_csv(path)    
    a = var_details['xVar']
    b = var_details['yVar']     
    x = df[a]
    y = df[b]
    TOOLS="hover,crosshair,pan,wheel_zoom,zoom_in,zoom_out,box_zoom,undo,redo,reset,tap,save,box_select,poly_select,lasso_select,"
    title_str = a + ' vs ' + b 
    p = figure(plot_width=400, plot_height=400)
    p.vbar(x=x, width=0.5, bottom=0,
           top=y, color="firebrick")
    return json.dumps(json_item(p,"plot"))    