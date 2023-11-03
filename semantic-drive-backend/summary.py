"""
Summary module for the project.

This module contains the functions for summarizing the files
- read_file: read a file from local storage
- summarize: summarize a file
"""
from transformers import pipeline


summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
captioner = pipeline("image-to-text",
                     model="Salesforce/blip-image-captioning-base")
pipe = pipeline("automatic-speech-recognition", "openai/whisper-small")


def read_file(id):
    """
    Read a file from local storage.

    Args:
        id (str): the id of the file
    Returns:
        file (bytes): the file
    """
    with open('files/' + str(id), 'rb') as f:
        file = f.read()
    return file


def summarize_text(id):
    """
    Summarize a text file.

    Args:
        id (str): the id of the file
    Returns:
        summary (str): the summary of the file
    """
    summarizer_text = summarizer(read_file(id).decode('utf-8'),
                                 max_length=100, do_sample=False)
    return summarizer_text[0]['summary_text']


def summarize_image(id):
    """
    Summarize an image file.

    Args:
        id (str): the id of the file
    Returns:
        summary (str): the summary of the file
    """
    captioner_text = captioner(f"./files/{id}")
    return captioner_text[0]['generated_text']


def summarize_audio(id):
    """
    Summarize an audio file.

    Args:
        id (str): the id of the file
    Returns:
        summary (str): the summary of the file
    """
    ext_text = pipe(f"files/{id}")['text']
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    summarizer_text = summarizer(ext_text, max_length=100, do_sample=False)
    return summarizer_text[0]['summary_text']


def summarize(id, fileType):
    """
    Summarize a file.

    Args:
        id (str): the id of the file
        fileType (str): the type of the file
    Returns:
        summary (str): the summary of the file
    """
    if fileType == "text":
        return summarize_text(id)
    elif fileType == "image":
        return summarize_image(id)
    elif fileType == "audio":
        return summarize_audio(id)
    else:
        return "File type not supported"
