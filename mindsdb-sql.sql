/*
Welcome! This is the MindsDB Cloud SQL Editor.
To get started, check out one of the tutorials in Learning Hub.
Happy Machine Learning!
*/ 

CREATE DATABASE cockroachdb
WITH
    engine = 'cockroachdb',
    parameters = {
        "host": "arid-molerat-6026.g8z.cockroachlabs.cloud",
        "database": "defaultdb",
        "user": "brayton",
        "password": "tvwWqV1_ccz5DB6dyfX_lg",
        "port": "26257"

    };

SELECT *
FROM cockroachdb.documentFiles
LIMIT 10;


CREATE MODEL file_topic
PREDICT PRED
USING
engine = 'huggingface',
task = 'zero-shot-classification',
model_name = 'facebook/bart-large-mnli',
input_column = 'all_data',
candidate_labels = ['Finance', 'Healthcare', 'Education', 'Technology', 'Legal', 'Marketing', 'Science', 'Art and Design', 'Human Resources', 'Project Management', 'Real Estate', 'Travel', 'Entertainment', 'Environmental', 'Research and Development', 'Government and Politics', 'Nonprofits', 'Manufacturing', 'History and Archives', 'Sports'];

CREATE MODEL file_industry
PREDICT PRED
USING
engine = 'huggingface',
task = 'zero-shot-classification',
model_name = 'facebook/bart-large-mnli',
input_column = 'all_data',
candidate_labels = ['Legal', 'Medical and Healthcare', 'Software Engineering', 'Finance and Banking', 'Education', 'Marketing and Advertising', 'Science and Research', 'Art and Design', 'Human Resources', 'Project Management', 'Real Estate', 'Travel and Tourism', 'Entertainment and Media', 'Environmental and Sustainability', 'Manufacturing and Industrial', 'Government and Politics', 'Nonprofits and Charities', 'History and Archives', 'Sports and Athletics', 'Retail and E-commerce'];;

CREATE MODEL file_type
PREDICT PRED
USING
engine = 'huggingface',
task = 'zero-shot-classification',
model_name = 'facebook/bart-large-mnli',
input_column = 'all_data',
candidate_labels = ['Essay', 'Email', 'Proposal', 'Notes', 'Report', 'Presentation', 'Spreadsheet', 'Invoice', 'Contract', 'Resume', 'Business Plan', 'Research Paper', 'Memo', 'Newsletter', 'Brochure', 'Agenda', 'Manual', 'Policy Document', 'Artwork', 'Application Form'];

CREATE MODEL file_audience
PREDICT PRED
USING
engine = 'huggingface',
task = 'zero-shot-classification',
model_name = 'facebook/bart-large-mnli',
input_column = 'all_data',
candidate_labels = ['Professional', 'Casual', 'Academic', 'Technical', 'General Public', 'Clients', 'Internal Staff', 'Experts', 'Students', 'Government Officials', 'Customers', 'Legal Authorities', 'Media', 'Investors', 'Partners', 'Children', 'Teens', 'Seniors', 'Educators', 'Patients'];


CREATE MODEL file_summary
PREDICT text_summary
USING
  engine = 'huggingface',
  task = 'summarization',
  model_name = 'sshleifer/distilbart-cnn-12-6',
  input_column = 'text_long',
  min_output_length = 10,
  max_output_length = 200;

DESCRIBE file_summary;


CREATE TABLE example_data.new_table (
    SELECT t.review AS text_long
    FROM example_data.amazon_reviews_with_sentiments AS t
);

UPDATE cockroachdb.documentFiles
SET tags = new_table.text_summary
FROM (
    SELECT h.*, t.text_long AS input_text
    FROM (
        SELECT t.tags AS text_long
        FROM cockroachdb.documentFiles AS t
    ) AS t
    JOIN file_summary AS h
  ) AS new_table
WHERE tags = new_table.input_text  ;



SELECT h.*, t.text_long AS input_text
    FROM (
        SELECT t.tags AS text_long
        FROM cockroachdb.documentFiles AS t
    ) AS t
    JOIN file_summary AS h
