"""
Main file for the backend server.

It contains the following routes:
    - /: GET request for health check
    - /file: GET, POST, DELETE requests for file upload, retrieval, deletion
    - /filedata: GET request for retrieving a file from local storage
    - /files: GET, DELETE request for retrieving all file ids, deleting all
    - /search: GET request for searching for files
"""
# flake8: noqa E402
import base64
import json
import uuid
from flask_cors import cross_origin
from flask import send_from_directory
import flask
from dotenv import load_dotenv
import logging
import os

load_dotenv()
log_level = os.getenv('LOG_LEVEL', 'INFO')
log_level = getattr(logging, log_level.upper())
logger = logging.getLogger()
logging.basicConfig(level=log_level)

from summary import summarize
from search import match
from db import (file_ids, insert_file, find_file,
                delete_all, file_summaries_iter, delete_file)

app = flask.Flask(__name__)


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


@app.route('/', methods=['GET'])
@cross_origin()
def index():
    """
    Route for the backend server.

    GET request: 200 OK response
    Args:
        None
    Returns:
        str: 200 OK response
    """
    return "200 SERVER OK"


@app.route('/file', methods=['GET', 'POST', 'DELETE'])
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

    DELETE request: delete a file from the database
    Args:
        fileId (str): the id of the file to be deleted
    Returns:
        str: 200 OK response
    """
    if flask.request.method == 'GET':
        response = find_file(flask.request.args.get('fileId'))

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

        url = "/localfile?fileId=" + str(id)
        summary = base64.b64encode(str.encode(summarize(id, fileType)))
        entry = (id, uploadTime, fileType, fileName, url, summary)

        download_file(id, fileData)
        insert_file(entry)

        return json.dumps({"fileId": str(id)})

    elif flask.request.method == 'DELETE':
        id = flask.request.form['fileId']

        delete_file(id)

        return "200 OK"


@app.route('/filedata', methods=['GET'])
@cross_origin()
def localfile():
    """
    Route for retrieving a file from local storage.

    GET request: retrieve a file from local storage
    Args:
        fileId (str): the id of the file to be retrieved
    Returns:
        file: the file to be retrieved
    """
    id = flask.request.args.get('fileId')
    file = send_from_directory('files', id)
    return file


@app.route('/files', methods=['GET', 'DELETE'])
@cross_origin()
def files():
    """
    Route for retrieving all file ids.

    GET request: retrieve all file ids
    Args:
        None
    Returns:
        json: the ids of all files

    DELETE request: delete all files from the database
    Args:
        None
    Returns:
        str: 200 OK response
    """
    if flask.request.method == 'GET':
        return file_ids()
    else:
        delete_all()
        return "200 OK"


@app.route('/search', methods=['GET'])
@cross_origin()
def search():
    """
    Route for searching for files.

    GET request: search for files
    Args:
        terms (str): the search terms
    Returns:
        json: the ids of the files that match the search terms
    """
    terms = flask.request.args.get('terms')
    summaries = file_summaries_iter()
    results = match(summaries, terms)
    return json.dumps({"fileIds": results})


if __name__ == '__main__':
    app.run(host=os.getenv("BIND_IP", "127.0.0.1"),
            port=int(os.getenv("PORT", "8000")),
            debug=(log_level == logging.DEBUG))
