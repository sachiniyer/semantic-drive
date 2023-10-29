import psycopg2
from psycopg2.errors import SerializationFailure

import logging

conn = psycopg2.connect("postgresql://brayton:tvwWqV1_ccz5DB6dyfX_lg@arid-molerat-6026.g8z.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&sslrootcert=/Users/brayton/.postgresql/root.crt")

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

info()

def insert_file(entry):
     with conn.cursor() as cur:
        cur.execute(
          f"UPSERT INTO db (id, uploadTime, fileType, fileName, fileData, fileTest, mindsSummary) VALUES ('{entry['id']}','{entry['uploadTime']}', '{entry['fileType']}', '{entry['fileName']}', {entry['fileData']}, '{entry['fileTest']}', '{entry['mindsSummary']}')")
        logging.debug("create_accounts(): status message: %s",
                      cur.statusmessage)

     conn.commit()

def file_ids():
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
     
def delete_all():
     with conn.cursor() as cur:
        cur.execute(
             f"DELETE * FROM db"),
        logging.debug("create_accounts(): status message: %s",
                      cur.statusmessage)
     conn.commit()