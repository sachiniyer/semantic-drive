"""
DB module for the project.

This module contains the functions for interacting with the database
- info: create the table if it does not exist
- insert_file: insert a file into the database
- file_ids: get all file ids
- file_summaries: get all file summaries
- find_file: find a file in the database
- delete_file: delete a file from the database
- delete_all: delete all files from the database
"""

import psycopg2
import logging
import os


def init_db():
    """
    Create the table if it does not exist.

    Args:
        None
    Returns:
        None
    """
    global conn
    with conn.cursor() as cur:
        cur.execute(
            f'''
            CREATE TABLE IF NOT EXISTS {os.getenv('DBNAME')}(
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            uploadTime   VARCHAR(50),
            fileType     VARCHAR(50),
            fileName     VARCHAR(300),
            fileURL      VARCHAR(200),
            summary BYTEA
            );
            '''
        )
    conn.commit()


def insert_file(entry):
    """
    Insert a file into the database.

    Args:
        entry (dict): the file data
    Returns:
        None
    """
    global conn
    with conn.cursor() as cur:
       cur.execute(
           f'''
           UPSERT INTO db
           (id, uploadTime, fileType, fileName, fileURL, summary)
           VALUES ('{entry['id']}','{entry['uploadTime']}',
           '{entry['fileType']}','{entry['fileName']}',
           '{entry['fileURL']}',{entry['summary']})
           '''
       )
    conn.commit()


def file_ids():
    """
    Get file ids.

    Args:
        None
    Returns:
        id_values (list): the list of file ids
    """
    global conn
    with conn.cursor() as cur:
       cur.execute(f"SELECT id FROM {os.getenv('DBNAME')}"),
       id_values = [result[0] for result in cur.fetchall()]
    conn.commit()
    return id_values


def file_summaries():
    """
    Get file summaries.

    Args:
        None
    Returns:
        id_values (list): the list of file summaries
    """
    global conn
    with conn.cursor() as cur:
        cur.execute(f"SELECT id, summary FROM {os.getenv('DBNAME')}"),
        id_values = cur.fetchall()
    conn.commit()
    return id_values


def find_file(id):
    """
    Find a file in the database.

    Args:
        id (str): the id of the file
    Returns:
        result (tuple): the file data
    """
    global conn
    with conn.cursor() as cur:
       cur.execute(f"SELECT * FROM {os.getenv('DBNAME')} WHERE id='{id}'"),
       result = cur.fetchone()
    conn.commit()
    return result


def delete_file(id):
    """
    Delete a file from the database.

    Args:
        id (str): the id of the file
    Returns:
        None
    """
    global conn
    with conn.cursor() as cur:
       cur.execute(f"DELETE FROM {os.getenv('DBNAME')} WHERE id='{id}'"),
    conn.commit()


def delete_all():
    """
    Delete all files from the database.

    Args:
        None
    Returns:
        None
    """
    with conn.cursor() as cur:
       cur.execute(f"DROP TABLE IF EXISTS {os.getenv('DBNAME')}"),
    conn.commit()


def init():
    """
    Initialize the database.

    Args:
        None
    Returns:
        None
    """
    global conn
    conn = psycopg2.connect(dbname=os.getenv("DBNAME"),
                            user=os.getenv("DBUSERNAME"),
                            password=os.getenv("DBPASSWORD"),
                            host=os.getenv("DBHOSTNAME"),
                            port=os.getenv("DBPORT"))
    init_db()


if __name__ == '__main__':
    init()
