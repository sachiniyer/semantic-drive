"""
Summary module for the project.

This module contains the functions for summarizing the files
- read_file: read a file from local storage
- summarize: summarize a file
"""
from transformers import pipeline

summarizer = pipeline("summarization", model="t5-small")
pipe = pipeline("automatic-speech-recognition", "openai/whisper-small")
captioner = pipeline("image-to-text",
                     model="Salesforce/blip-image-captioning-base")


def read_file(downloadName):
    """
    Read a file from local storage.

    Args:
        id (str): the id of the file
    Returns:
        file (bytes): the file
    """
    with open(downloadName, 'rb') as f:
        file = f.read()
    return file


def summarize_text(downloadName):
    """
    Summarize a text file.

    Args:
        id (str): the id of the file
    Returns:
        summary (str): the summary of the file
    """
    summarizer_text = summarizer(read_file(downloadName).decode('utf-8'),
                                 max_length=100, do_sample=False)
    return summarizer_text[0]['summary_text']


def summarize_image(downloadName):
    """
    Summarize an image file.

    Args:
        id (str): the id of the file
    Returns:
        summary (str): the summary of the file
    """
    captioner_text = captioner(downloadName)
    return captioner_text[0]['generated_text']


def summarize_audio(downloadName):
    """
    Summarize an audio file.

    Args:
        id (str): the id of the file
    Returns:
        summary (str): the summary of the file
    """
    ext_text = pipe(downloadName)['text']
    summarizer_text = summarizer(ext_text, max_length=100, do_sample=False)
    return summarizer_text[0]['summary_text']


def summarize(fileType, downloadName):
    """
    Summarize a file.

    Args:
        id (str): the id of the file
        fileType (str): the type of the file
    Returns:
        summary (str): the summary of the file
    """
    if fileType == "text":
        return summarize_text(downloadName)
    elif fileType == "image":
        return summarize_image(downloadName)
    elif fileType == "audio":
        return summarize_audio(downloadName)
    else:
        return "File type not supported"
