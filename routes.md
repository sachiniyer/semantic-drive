# POST file

Req - {uploadTime: utcdate, fileType: string, fileName: string, file: [byte]}
Res - {fileId: string}

# GET file

Req - {fileId: string}
Res - {uploadTime: utcdate, fileType: string, fileName: string, file: [byte]}

# GET files

Req - {}
Res - {fileIds: [string]}

# GET search

Req - {terms: [string]}
Res - {fileIds: [string]}

## filetype

- text
- image
