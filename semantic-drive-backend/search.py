"""
Search module for the project.

This module contains the functions for searching the database
"""
import base64
import os
from sentence_transformers import SentenceTransformer, util


model = SentenceTransformer('sentence-transformers/msmarco-distilbert-dot-v5')


def match(summaries, terms):
    """
    Search the database.

    Args:
        query (str): the search query
    Returns:
        result (list): the search result
    """
    result = []
    term_emb = model.encode(terms, convert_to_tensor=True)
    for summary in summaries:
        sumdata = base64.b64decode(bytes(summary[1])).decode('utf-8')
        sumdata_emb = model.encode(sumdata, convert_to_tensor=True)
        cos_scores = util.pytorch_cos_sim(term_emb, sumdata_emb)
        if cos_scores > float(os.getenv('SEARCH_THRESHOLD')):
            result.append(str(summary[0]))
    return result
