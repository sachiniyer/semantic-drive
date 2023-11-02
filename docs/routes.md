# API Route

## POST file

Req - {uploadTime: utcdate, fileType: string, fileName: string, file: [byte]}
Res - {fileId: string}

## DELETE file

Req - {fileId: string}
Res - {}

## GET file

Req - {fileId: string}
Res - {uploadTime: utcdate, fileType: string, fileName: string, file: [byte], summary: string}

## GET files

Req - {}
Res - {fileIds: [string]}

## GET search

Req - {terms: [string]}
Res - {fileIds: [string]}

### filetype

- text
- image

# DB Schema
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  uploadTime VARCHAR(50),
  fileType VARCHAR(50),
  fileName VARCHAR(300),
  fileData BYTEA, -- Assuming you're using PostgreSQL and Blob type is represented as BYTEA
  fileTest VARCHAR(50),
  mindsSummary VARCHAR(50)
