import flask
from db import file_ids, insert_file, find_file, delete_all, file_summaries
from flask_cors import cross_origin
from enum import Enum
import uuid
import json
import requests
import os
from dotenv import load_dotenv

class FileType(Enum):
    image = "image"
    text = "text"

app = flask.Flask(__name__)

# / route with 200 OK response
@app.route('/', methods=['GET'])
@cross_origin()
def index():
    return "200 SERVER OK"


def download_file(id, file):
    # save file to local storage in the files directory
    with open('files/' + str(id), 'w') as f:
        f.write(file)

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
            "file": response[4]
        })
    elif flask.request.method == 'POST':
        id = uuid.uuid4()
        uploadTime = flask.request.form['uploadTime']
        fileType = flask.request.form['fileType']
        fileName = flask.request.form['fileName']
        fileData = flask.request.form['file']

        # parse the fileArg depending on fileType
        fileText = "placeholder"
        download_file(id, fileData)
        url = "/localfile?fileId=" + str(id)

        mindsSummary = ""
        entry = {'id': id, 'uploadTime': uploadTime,
                 'fileType': fileType, 'fileName': fileName,
                 'fileURL': url, 'fileText': fileText,
                 'mindsSummary': mindsSummary}
        insert_file(entry)

        # return the file id of the newly added file
        return json.dumps({"fileId": str(id)})
    

@app.route('/search', methods=['GET'])
@cross_origin()
def search():
    terms = flask.request.args.get('terms')
    api_token = os.getenv("HF_TOKEN")
    API_URL = "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2"
    headers = {"Authorization": f"Bearer {api_token}"}
    def send(payload):
        response = requests.post(API_URL, headers=headers, json=payload)
        return response.json()

    summaries = file_summaries()
    summaries_data = [summary[1] for summary in summaries]
    print(summaries_data)
    similarity = send(
        {
            "inputs": {
                "source_sentence": {terms},
                "sentences": summaries_data
            }
        })

    similarity = { similarity[i]: summaries[i] for i in range(len(similarity)) }
    print(similarity)
    similarity = sorted(similarity.items(), key=lambda x: x[0], reverse=True)
    return json.dumps(similarity)

@app.route('/files', methods=['GET'])
@cross_origin()
def files():
    return file_ids()

@app.route('/localfile', methods=['GET'])
@cross_origin()
def localfile():
    id = flask.request.args.get('fileId')
    with open('files/' + str(id), 'rb') as f:
        file = f.read()
    return file

@app.route('/deleteall', methods=['DELETE'])
@cross_origin()
def deleteall():
    delete_all()
    return "200 OK"

if __name__ == '__main__':
    load_dotenv()
    app.run(host='0.0.0.0', port=8000,debug=True)
