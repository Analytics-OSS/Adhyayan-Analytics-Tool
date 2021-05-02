import flask
import sys
from flask_cors import CORS,cross_origin
import json
from pymongo import MongoClient
from bokeh.plotting import figure, output_file, show
from bokeh.embed import json_item
import pandas as pd
import boto3
from .routes import main

app = flask.Flask(__name__)
CORS(app, resources=r'/*')

client = MongoClient("mongodb+srv://admin:admin123@cluster0.xraoe.mongodb.net/adhyan?retryWrites=true&w=majority")
db = client.adhyan
info = db.file_info

app.register_blueprint(main)

boto_client = boto3.client('s3')

def json_response(payload,status = 200):
    return (flask.json.dumps(payload),status,{'content-type':'application/json'})


@app.route('/submit',methods = ['GET'])
#@cross_origin(origin = 'localhost',headers=['Access-Control-Allow-Origin'] )

def getVisualization():
    details = info.find_one()
    uri = details['csvURI']
    path = 's3://adhyan-csv-storage/'+uri[44:]
    df = pd.read_csv(path)
    a = details['xvar']
    b = details['yvar']
    x = df[a]
    y = df[b]

    TOOLS="hover,crosshair,pan,wheel_zoom,zoom_in,zoom_out,box_zoom,undo,redo,reset,tap,save,box_select,poly_select,lasso_select,"
    title_str = a + ' vs ' + b 
    p = figure(title = title_str,tools=TOOLS)
    p.xaxis.axis_label = a
    p.yaxis.axis_label = b

    p.scatter(x,y/1000)

    return json.dumps(json_item(p,"plot"))
    
