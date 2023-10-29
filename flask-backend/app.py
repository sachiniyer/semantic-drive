import flask
import psycopg2
from db import *
from flask_cors import CORS, cross_origin
from enum import Enum
class fileType(Enum):
    image = "image"
    text = "text"

app = Flask(__name__)
conn = psycopg2.connect("postgresql://brayton:tvwWqV1_ccz5DB6dyfX_lg@arid-molerat-6026.g8z.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&sslrootcert=$HOME/.postgresql/root.crt")


# GET file 
@app.route('/file/<id>', methods=['GET', 'POST'])
@cross_origin()
def file(id):
    if flask.request.method == 'GET':
        return find_file(id)
    elif flask.request.method == 'POST':
        uploadTime = flask.request.form['uploadTime']
        fileType = flask.request.form['fileType']
        fileName = flask.request.form['fileName']
        fileArg = flask.request.files['file']

        # parse the fileArg depending on fileType
        if fileType == fileType.image:
            fileData = fileArg
            fileText = ""
        elif fileType == fileType.text:
            fileData = ""
            fileText = fileArg
            
             