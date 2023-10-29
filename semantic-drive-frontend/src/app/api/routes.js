/*
 * # API Route
 *
 * ## POST file
 *
 * Req - {uploadTime: utcdate, fileType: string, fileName: string, file: [byte]}
 * Res - {fileId: string}
 *
 * ## DELETE file
 *
 * Req - {fileId: string}
 * Res - {}
 *
 * ## GET file
 *
 * Req - {fileId: string}
 * Res - {uploadTime: utcdate, fileType: string, fileName: string, file: [byte], summary: string}
 *
 * ## GET files
 *
 * Req - {}
 * Res - {fileIds: [string]}
 *
 * ## GET search
 *
 * Req - {terms: [string]}
 * Res - {fileIds: [string]}
 *
 * ### filetype
 *
 * - text
 * - image
 *
 * # DB Schema
 * id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   uploadTime VARCHAR(50),
 *   fileType VARCHAR(50),
 *   fileName VARCHAR(300),
 *   fileData BYTEA, -- Assuming you're using PostgreSQL and Blob type is represented as BYTEA
 *   fileTest VARCHAR(50),
 *   mindsSummary VARCHAR(50)
 */

let IMG_EXTENSIONS = ['jpg', 'png', 'tiff', 'gif', 'bmp', 'jpeg', 'webp'];
let AUDIO_EXTENSION = ['mp3', 'wav', 'ogg', 'm4a', 'flac', 'aac', 'opus', 'wma', 'aiff', 'alac'];
let MOV_EXTENSIONS = ['mp4', 'mov', 'wmv', 'flv', 'avi', 'avchd', 'webm', 'mkv', 'm4v', '3gp', '3g2'];

export function uploadFile(fileName, file) {
  let uploadTime = new Date().toISOString();

  let fileType = fileName.split('.').pop();

  if (IMG_EXTENSIONS.includes(fileType)) {
    fileType = 'image';
  }
  else if (AUDIO_EXTENSION.includes(fileType)) {
    fileType = 'audio';
  }
  else if (MOV_EXTENSIONS.includes(fileType)) {
    fileType = 'video';
  }
  else {
    fileType = 'text';
  }
  fetch('/file', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ uploadTime: uploadTime, fileType: fileType, fileName: fileName, file: file })
  })
    .then(response => response.json())
    .then(data => { return (data.fileId) });
}

export function downloadFile(fileId) {
  fetch('/file', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ fileId: fileId })
  })
    .then(response => response.json())
    .then(data => {
      return ({
        fileData: data.file,
        fileName: data.fileName
      })
    });
}

export function metaFile(fileId) {
  fetch('/file', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ fileId: fileId })
  })
    .then(response => response.json())
    .then(data => {
      return ({
        uploadTime: data.uploadTime,
        fileType: data.fileType,
        fileName: data.fileName,
        summary: data.summary
      })
    });
}

export function deleteFile(fileId) {
  fetch('/file', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ fileId: fileId })
  })
    .then(response => response.json())
    .then(data => { return (data) });
}

export function getFiles() {
  fetch('/files', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  })
    .then(response => response.json())
    .then(data => { return (data.fileIds) });
}

export function searchFiles(terms) {
  fetch('/search', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ terms: terms })
  })
    .then(response => response.json())
    .then(data => { return (data.fileIds) });
}
