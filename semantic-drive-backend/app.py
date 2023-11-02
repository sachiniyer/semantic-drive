"""
Main file for the backend server.

It contains the following routes:
    - /: 200 OK response
    - /file: GET and POST requests for file upload and retrieval
    - /search: GET request for searching for files
    - /files: GET request for retrieving all file ids
    - /localfile: GET request for retrieving a file from local storage
    - /deleteall: DELETE request for deleting all files from the database
"""
import flask
from dotenv import load_dotenv
from flask import send_from_directory
from db import file_ids, insert_file, find_file, delete_all, file_summaries
from flask_cors import cross_origin
import uuid
import json
import requests
import os
from summary import summarize
import base64

app = flask.Flask(__name__)

API_URL = ("https://api-inference.huggingface.co/models"
           "/sentence-transformers/all-MiniLM-L6-v2")


@app.route('/', methods=['GET'])
@cross_origin()
def index():
    """
    Route for the backend server.

    Returns a 200 OK response.
    """
    return "200 SERVER OK"


def download_file(id, file):
    """
    Download a file to the local storage.

    Args:
        id (str): the id of the file
        file (bytes): the file to be downloaded
    Returns:
        None
    """
    with open('files/' + str(id), 'wb') as f:
        f.write(file)


@app.route('/file', methods=['GET', 'POST'])
@cross_origin()
def file():
    """
    Route for uploading and retrieving files.

    GET request: retrieve a file from the database
    Args:
        fileId (str): the id of the file to be retrieved
    Returns:
        json: the file data

    POST request: upload a file to the database
    Args:
        uploadTime (str): the time the file was uploaded
        fileType (str): the type of the file
        fileName (str): the name of the file
        file (bytes): the file to be uploaded
    Returns:
        json: the id of the newly added file
    """
    if flask.request.method == 'GET':
        response = find_file(flask.request.form['fileId'])
        print(response)
        return json.dumps({
            "uploadTime": response[1],
            "fileType": response[2],
            "fileName": response[3],
            "file": response[4],
            "summary": base64.b64decode(response[5]).decode('utf-8')})
    elif flask.request.method == 'POST':
        id = uuid.uuid4()
        uploadTime = flask.request.form['uploadTime']
        fileType = flask.request.form['fileType']
        fileName = flask.request.form['fileName']
        fileData = flask.request.files['file'].read()

        download_file(id, fileData)
        url = "/localfile?fileId=" + str(id)

        summary = base64.b64encode(str.encode(summarize(id, fileType)))

        entry = {'id': id, 'uploadTime': uploadTime,
                 'fileType': fileType, 'fileName': fileName,
                 'fileURL': url, 'summary': summary}

        insert_file(entry)

        return json.dumps({"fileId": str(id)})


@app.route('/search', methods=['GET'])
@cross_origin()
def search():
    """
    Route for searching for files.

    Args:
        terms (str): the search terms
    Returns:
        json: the ids of the files that match the search terms
    """
    headers = {"Authorization": f"Bearer {os.getenv('HF_TOKEN')}"}

    terms = flask.request.args.get('terms')

    def send(payload):
        response = requests.post(API_URL, headers=headers, json=payload)
        return response.json()

    summaries = file_summaries()
    ids = [summary[0] for summary in summaries]
    summaries = [base64.b64decode(bytes(summary[1])).decode('utf-8')
                 for summary in summaries]
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
    """
    Route for retrieving all file ids.

    Args:
        None
    Returns:
        json: the ids of all files
    """
    return file_ids()


@app.route('/localfile', methods=['GET'])
@cross_origin()
def localfile():
    """
    Route for retrieving a file from local storage.

    Args:
        fileId (str): the id of the file to be retrieved
    Returns:
        file: the file to be retrieved
    """
    id = flask.request.args.get('fileId')
    file = send_from_directory('files', id)
    return file


@app.route('/deleteall', methods=['DELETE'])
@cross_origin()
def deleteall():
    """
    Route for deleting all files from the database.

    Args:
        None
    Returns:
        None
    """
    delete_all()
    return "200 OK"


if __name__ == '__main__':
    load_dotenv()
    app.run(host='0.0.0.0', port=8000, debug=True)
