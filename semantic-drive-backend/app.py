import flask
import psycopg2
from db import *
from flask_cors import CORS, cross_origin
from enum import Enum
import uuid
import requests
import json
import base64

class FileType(Enum):
    image = "image"
    text = "text"

app = flask.Flask(__name__)

# / route with 200 OK response
@app.route('/', methods=['GET'])
@cross_origin()
def index():
    return "200 SERVER OK"

# FILE UPLOAD and RETRIEVAL
@app.route('/file', methods=['GET', 'POST'])
@cross_origin()
def file():
    if flask.request.method == 'GET':
        response = find_file(flask.request.form['fileId'])

        return json.dumps({
            "uploadTime": response[1],
            "fileType": response[2],
            "fileName": response[3],
            "file": base64.b64encode(response[4])
        })
    elif flask.request.method == 'POST':
        uploadTime = flask.request.form['uploadTime']
        fileType = flask.request.form['fileType']
        fileName = flask.request.form['fileName']
        fileData = flask.request.form['file']

        # parse the fileArg depending on fileType
        fileText = "placeholder"

        mindsSummary = ""
        id = uuid.uuid4()
        entry = {'id':id, 'uploadTime': uploadTime, 'fileType': fileType, 'fileName': fileName, 'fileData': fileData, 'fileText': fileText, 'mindsSummary': mindsSummary}
        insert_file(entry)

        # return the file id of the newly added file
        return json.dumps({"fileId": str(id)})
    
# FILE DELETION

@app.route('/search', methods=['POST'])
@cross_origin()
def search():
    # string
    terms = flask.request.form['terms']

    # get all data of all files
    ids = file_ids()
    info = []
    for id in ids:
        # [(id:'', uploadTime:'', fileType:'', fileName:'', fileData:'', fileText:'', mindsSummary:'')]
        info.append(find_file(id))

    # call search algorithm
    # return results
    
# get all files 
@app.route('/files', methods=['GET'])
@cross_origin()
def files():
    return file_ids()
    
if __name__ == '__main__':
	app.run(port=8000,debug=True)
