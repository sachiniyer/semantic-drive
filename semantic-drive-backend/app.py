import flask
from flask import send_from_directory
from db import file_ids, insert_file, find_file, delete_all, file_summaries
from flask_cors import cross_origin
import uuid
import json
import requests
import os
from dotenv import load_dotenv
from summary import summarize
import base64

app = flask.Flask(__name__)

# / route with 200 OK response
@app.route('/', methods=['GET'])
@cross_origin()
def index():
    return "200 SERVER OK"


def download_file(id, file):
    # save file to local storage in the files directory
    with open('files/' + str(id), 'wb') as f:
        f.write(file)

# FILE UPLOAD and RETRIEVAL
@app.route('/file', methods=['GET', 'POST'])
@cross_origin()
def file():
    if flask.request.method == 'GET':
        response = find_file(flask.request.form['fileId'])
        print(response)
        return json.dumps({
            "uploadTime": response[1],
            "fileType": response[2],
            "fileName": response[3],
            "file": response[4],
            "summary": base64.b64decode(response[5]).decode('utf-8')
        })
    elif flask.request.method == 'POST':
        id = uuid.uuid4()
        uploadTime = flask.request.form['uploadTime']
        fileType = flask.request.form['fileType']
        fileName = flask.request.form['fileName']
        fileData = flask.request.files['file'].read()

        # parse the fileArg depending on fileType
        download_file(id, fileData)
        url = "/localfile?fileId=" + str(id)

        mindsSummary = base64.b64encode(str.encode(summarize(id, fileType, url)))

        entry = {'id': id, 'uploadTime': uploadTime,
                 'fileType': fileType, 'fileName': fileName,
                 'fileURL': url, 'mindsSummary': mindsSummary}
        insert_file(entry)

        # return the file id of the newly added file
        return json.dumps({"fileId": str(id)})
    

@app.route('/search', methods=['GET'])
@cross_origin()
def search():
    API_URL = "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2"
    headers = {"Authorization": f"Bearer {os.getenv('HF_TOKEN')}"}

    terms = flask.request.args.get('terms')
    def send(payload):
        response = requests.post(API_URL, headers=headers, json=payload)
        return response.json()

    summaries = file_summaries()
    ids = [summary[0] for summary in summaries]
    summaries = [base64.b64decode(bytes(summary[1])).decode('utf-8') for summary in summaries]
    data = send({"inputs": {
        "source_sentence": terms,
        "sentences": summaries
    }})
    threshold = 0.3
    res = [ids[i] for i in range(len(data)) if data[i] > threshold]
    return json.dumps({"fileIds": res})

@app.route('/files', methods=['GET'])
@cross_origin()
def files():
    return file_ids()

@app.route('/localfile', methods=['GET'])
@cross_origin()
def localfile():
    id = flask.request.args.get('fileId')
    file = send_from_directory('files', id)
    return file

@app.route('/deleteall', methods=['DELETE'])
@cross_origin()
def deleteall():
    delete_all()
    return "200 OK"

if __name__ == '__main__':
    load_dotenv()
    app.run(host='0.0.0.0', port=8000,debug=True)
