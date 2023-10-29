import psycopg2
from psycopg2.errors import SerializationFailure

import logging

conn = psycopg2.connect("postgresql://chantal:kuwhacks2022@free-tier6.gcp-asia-southeast1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3D2022hacking-3042")

def info():
    with conn.cursor() as cur:
        cur.execute('''
                    CREATE TABLE IF NOT EXISTS db (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    uploadTime VARCHAR(50),
                    fileType VARCHAR(50),
                    fileName VARCHAR(300),
                    fileData BYTEA, -- Assuming you're using PostgreSQL and Blob type is represented as BYTEA
                    fileText VARCHAR(5000),
                    mindsSummary VARCHAR(5000)
                    );
                    ''')

    conn.commit()

def insert_file(entry):
     with conn.cursor() as cur:
        cur.execute(
          f"UPSERT INTO db (uploadTime, fileType, fileName, fileData, fileTest, mindsSummary) VALUES ('{entry['uploadTime']}', '{entry['fileType']}', '{entry['fileName']}', {entry['fileData']}, '{entry['fileTest']}', '{entry['mindsSummary']}')")
        logging.debug("create_accounts(): status message: %s",
                      cur.statusmessage)

     conn.commit()

def file_ids(conn):
     with conn.cursor() as cur:
        cur.execute(
             "SELECT id FROM db"),
        logging.debug("create_accounts(): status message: %s",
                      cur.statusmessage)
        id_values = [result[0] for result in cur.fetchall()]
     conn.commit()
     return id_values

def find_file(id): 
     with conn.cursor() as cur:
        cur.execute(
             f"SELECT * FROM db WHERE id='{id}'"),
        logging.debug("create_accounts(): status message: %s",
                      cur.statusmessage)
        result = cur.fetchone()
     conn.commit()
     return result

def delete_file(id):
     with conn.cursor() as cur:
        cur.execute(
             f"DELETE FROM db WHERE id='{id}'"),
        logging.debug("create_accounts(): status message: %s",
                      cur.statusmessage)
     conn.commit()
     
