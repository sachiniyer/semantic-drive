import psycopg2
from psycopg2.errors import SerializationFailure

import logging

conn = psycopg2.connect("postgresql://brayton:tvwWqV1_ccz5DB6dyfX_lg@arid-molerat-6026.g8z.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&sslrootcert=root.crt")

def info():
    with conn.cursor() as cur:
        cur.execute('''
                    CREATE TABLE IF NOT EXISTS db (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    uploadTime   VARCHAR(50),
                    fileType     VARCHAR(50),
                    fileName     VARCHAR(300),
                    fileURL      VARCHAR(200),
                    fileText     VARCHAR(65534) NULL,
                    fileImage    BYTEA NULL,
                    fileAudio    BYTEA NULL,
                    fileVideo    BYTEA NULL,
                    mindsSummary VARCHAR(5000)
                    );
                    ''')

    conn.commit()

info()

def insert_file(entry):
     with conn.cursor() as cur:
        cur.execute(
          (f"UPSERT INTO db (id, uploadTime, fileType, fileName, fileURL, fileText, fileImage, "
           f"fileAudio, fileVideo, mindsSummary)"
           f" VALUES ('{entry['id']}','{entry['uploadTime']}','{entry['fileType']}','{entry['fileName']}',"
           f"'{entry['fileURL']}', NULL, NULL, NULL, NULL, '{entry['mindsSummary']}')"))
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
             f"DROP TABLE IF EXISTS db"),
        logging.debug("create_accounts(): status message: %s",
                      cur.statusmessage)
     conn.commit()
