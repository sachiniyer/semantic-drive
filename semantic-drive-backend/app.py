import flask
import psycopg2
from db import *
from flask_cors import CORS, cross_origin
from enum import Enum
import uuid
import requests

class fileType(Enum):
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
        return find_file(flask.request.form['id'])
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
            
        mindsSummary = ""
        id = uuid.uuid4()
        entry = {'id':id, 'uploadTime': uploadTime, 'fileType': fileType, 'fileName': fileName, 'fileData': fileData, 'fileText': fileText, 'mindsSummary': mindsSummary}
        insert_file(entry)

        # return the file id of the newly added file
        return id
    
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
