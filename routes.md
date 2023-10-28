# API Route

## POST file

Req - {uploadTime: utcdate, fileType: string, fileName: string, file: [byte]}
Res - {fileId: string}

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

uploadTime: utcdate,
fileType: string,
fileName: string,
fileData: Blob,
fileTest: string,
mindsSummary: string,
