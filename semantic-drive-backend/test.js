const {
    testDocument,
    deleteAllDocuments,
    addDocument,
    addTestDocument,
    getAllDocuments,

    deleteAllImages,
    addImage,
    addTestImage,
    getAllImages
} = require('./db.js');


const axios = require('axios');
// axios.defaults.baseURL = 'http://localhost:3000';
// axios.post('/adddoc', {
//     firstName: 'Fred',
//     lastName: 'Flintstone'
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

const doc = testDocument
var request = require('request');
request.post({ headers: {'content-type' : 'application/json'}
               , url: "http://localhost:3000/adddoc", body: JSON.stringify(doc) }); 
