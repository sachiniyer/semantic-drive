"""
DB module for the project.

This module contains the functions for interacting with the database
- init_tb: create the table if it does not exist
- insert_file: insert a file into the database
- file_ids: get all file ids
- file_summaries: get all file summaries
- find_file: find a file in the database
- delete_file: delete a file from the database
- delete_all: delete all files from the database
"""

import psycopg2
import psycopg2.extras
import os


def init_tb():
    """
    Create the table if it does not exist.

    Args:
        None
    Returns:
        None
    """
    psycopg2.extras.register_uuid()
    with conn.cursor() as cur:
        cur.execute(
            f'''
             CREATE TABLE IF NOT EXISTS {os.getenv('TBNAME')} (
             id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
             uploadTime   VARCHAR(50) DEFAULT '2021-01-01 00:00:00',
             fileType     VARCHAR(50) DEFAULT 'text',
             fileName     VARCHAR(300) DEFAULT 'file.txt',
             fileURL      VARCHAR(200) DEFAULT NULL,
             summary      BYTEA DEFAULT NULL
             );
             '''
        )
    conn.commit()


conn = psycopg2.connect(dbname=os.getenv("DBNAME"),
                        user=os.getenv("DBUSERNAME"),
                        password=os.getenv("DBPASSWORD"),
                        host=os.getenv("DBHOSTNAME"),
                        port=os.getenv("DBPORT"))
init_tb()


def insert_file(entry):
    """
    Insert a file into the database.

    Args:
        entry (dict): the file data
    Returns:
        None
    """
    with conn.cursor() as cur:
        insert_query = f'''
                        INSERT INTO {os.getenv('TBNAME')}
                        (id, uploadTime, fileType, fileName, fileURL, summary)
                        VALUES (%s,%s,%s,%s,%s,%s);
                        '''
        cur.execute(insert_query, entry)
    conn.commit()


def file_ids():
    """
    Get file ids.

    Args:
        None
    Returns:
        id_values (list): the list of file ids
    """
    with conn.cursor() as cur:
        cur.execute(f"SELECT id FROM {os.getenv('TBNAME')}"),
        id_values = [result[0] for result in cur.fetchall()]
    return id_values


def file_summaries_iter():
    """
    Get file summaries with a server side cursor.

    Args:
        None
    Returns:
        id_values (iter): the iter of file summaries
    """
    with conn.cursor(name='file_summaries',
                     cursor_factory=psycopg2.extras.DictCursor) as cur:
        cur.execute(f"SELECT id, summary FROM {os.getenv('TBNAME')}"),
        for row in cur:
            yield row
        cur.close()


def find_file(id):
    """
    Find a file in the database.

    Args:
        id (str): the id of the file
    Returns:
        result (tuple): the file data
    """
    with conn.cursor() as cur:
        cur.execute(f"SELECT * FROM {os.getenv('TBNAME')} WHERE id='{id}'"),
        result = cur.fetchone()
    return result


def delete_file(id):
    """
    Delete a file from the database.

    Args:
        id (str): the id of the file
    Returns:
        None
    """
    with conn.cursor() as cur:
        cur.execute(f"DELETE FROM {os.getenv('TBNAME')} WHERE id='{id}'"),
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
        cur.execute(f"DROP TABLE IF EXISTS {os.getenv('TBNAME')}"),
    conn.commit()
    init_tb()
