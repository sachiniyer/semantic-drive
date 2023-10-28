// import addTestDocument from './db.js'
// import { addTestDocument, printAllDocuments } from './db.js'
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

'use strict'
const simple = require('./handlers/simple.js')
const configured = require('./handlers/configured.js')

// module.exports = function (app, opts) {
// Setup routes, middleware, and handlers

const express = require("express");
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.get('/', (req, res) => {
  res.send('200 OK')
})

app.get('/listimg', async (req, res) => {
  const images = await getAllImages()
  res.send(images)
})

app.get('/listdoc', async (req, res) => {
  const documents = await getAllDocuments()
  res.send(documents)
})

app.get('/listall', async (req, res) => {
  const images = await getAllImages()
  const documents = await getAllDocuments()

  res.send(JSON.stringify(images) + '\n\n' + JSON.stringify(documents))
})

// tests
app.get('/addtestdoc', async (req, res) => {
  // addTestDocument() is async, so we need to use a promise
  // we want to do res send the test document after it is added
  const added = await addTestDocument()
  res.send('added test document!\n' + added)
})

app.get('/addtestimg', async (req, res) => {
  // addTestDocument() is async, so we need to use a promise
  // we want to do res send the test document after it is added
  const added = await addTestImage()
  res.send('added test image!\n' + added)
})

// add req 
// this should be made to be a post req
app.post('/adddoc', (req, res) => {
  addDocument(req.body)
  res.send('Submitted Successfully!')
})

app.post('/addimg', (req, res) => {
  addImage(req)
  res.send('Submitted Successfully!')
})

// del all 
app.get('/delalldoc', (req, res) => {
  deleteAllDocuments()
  res.send('Deleted All Docs!')
})

app.get('/delallimg', (req, res) => {
  deleteAllImages()
  res.send('Deleted All Images!')
})

app.get('/delall', (req, res) => {
  deleteAllDocuments()
  deleteAllImages()
  res.send('Deleted All!')
})



const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

