const Sequelize = require("sequelize-cockroachdb");
const { v4: uuidv4 } = require('uuid');

// For secure connection to CockroachDB
const fs = require('fs');

// Connect to CockroachDB through Sequelize
var sequelize = new Sequelize({
    dialect: "postgres",
    username: "brayton",
    password: "tvwWqV1_ccz5DB6dyfX_lg",
    host: "arid-molerat-6026.g8z.cockroachlabs.cloud",
    port: 26257,
    database: "defaultdb",
    dialectOptions: {
        ssl: {

            //For secure connection:
            ca: fs.readFileSync('/Users/brayton/.postgresql/root.crt')
                .toString()
        },
    },
    logging: false,
});

//Define the table we'll be working with in CockroachDB
const DocumentFiles = sequelize.define("documentFiles", {
    id: {
        type: Sequelize.UUID, // Change to INTEGER for 'int'
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING, // Change to STRING for 'str'
    },
    fileExtension: {
        type: Sequelize.STRING, // Change to STRING for 'str'
    },
    sizeMB: {
        type: Sequelize.INTEGER, // Change to INTEGER for 'int'
    },
    fileUploaded: {
        type: Sequelize.DATE, // Change to DATE for 'date'
    },
    dataAccessed: {
        type: Sequelize.DATE, // Change to DATE for 'date'
    },
    authorCreator: {
        type: Sequelize.STRING, // Change to STRING for 'str'
    },
    subject: {
        type: Sequelize.STRING, // Change to STRING for 'str'
    },
    tags: {
        type: Sequelize.TEXT,
    },
});

sequelize.drop()

const ImageFile = sequelize.define("ImageFile", {
    id: {
        type: Sequelize.UUID, // Change to INTEGER for 'int'
        primaryKey: true,
    },   
    nameOfFile: {
        type: Sequelize.STRING, // Change to STRING for 'str'
    },
    fileExtension: {
        type: Sequelize.STRING, // Change to STRING for 'str'
    },
    sizeOfFileMB: {
        type: Sequelize.INTEGER, // Change to INTEGER for 'int'
    },
    fileUploaded: {
        type: Sequelize.DATE, // Change to DATE for 'date'
    },
    dataAccessed: {
        type: Sequelize.DATE, // Change to DATE for 'date'
    },
    height: {
        type: Sequelize.INTEGER, // 'int'
    },
    width: {
        type: Sequelize.INTEGER, // 'int'
    },
    artist: {
        type: Sequelize.STRING, // 'str'
    },
    software: {
        type: Sequelize.STRING, // 'str'
    },
    dateAndTimeMetadata: {
        type: Sequelize.DATE, // 'date'
    },
    gpsInformationMetadata: {
        type: Sequelize.STRING, // 'str'
    },
    portraitLandscape: {
        type: Sequelize.BOOLEAN, // 'bool'
    },
    userComment: {
        type: Sequelize.STRING, // 'str'
    },
    imageDescription: {
        type: Sequelize.STRING, // 'str'
    },
});

// Create a test document
const testDocument = {
    name: 'Test Document',
    fileExtension: 'pdf',
    sizeMB: 5,
    fileUploaded: new Date(), // Replace with the desired date
    dataAccessed: new Date(), // Replace with the desired date
    authorCreator: 'Test Author',
    subject: 'Test Subject',
    tags: `
    Introduction to MindsDB
MindsDB is an AI Automation platform for building AI/ML powered features and applications. It works by connecting any source of data with any AI/ML model or framework and automating how real-time data flows between them.

MindsDB allows you to easily:

Connect to any store of data or end-user application.
Pass data to an AI model from any store of data or end-user application.
Plug the output of an AI model into any store of data or end-user application.
Fully automate these workflows to build AI-powered features and applications.
What is MindsDB

​
Build with MindsDB
As you can connect any data source with any AI/ML model, you can build and automate any AI/ML use case.

Here are some AI/LLM use cases:

Semantic Search and Q&A/RAG
Chatbots
Classification
Sentiment Analysis
Summarisation
Translation
You can use MindsDB for the following machine learning use cases:

Forecasting
Classification
Regression
Anomaly Detection
Recommenders
You can use one of MindsDB’s AutoMLs or you can bring your own, pre-trained model
`
};

// Create a test image
const testImage = {
    name: 'Test Image',
    fileExtension: 'jpg',
    sizeMB: 5,
    fileUploaded: new Date(), // Replace with the desired date
    dataAccessed: new Date(), // Replace with the desired date
    height: 100,
    width: 100,
    artist: 'Test Artist',
    software: 'Test Software',
    dateAndTimeMetadata: new Date(), // Replace with the desired date
    gpsInformationMetadata: 'Test GPS Info',
    portraitLandscape: true,
    userComment: 'Test Comment',
    imageDescription: 'Test Description',
};

const addDocument = async (document) => {
    // Synchronize the DocumentFiles table and insert the test document
    await DocumentFiles.sync({ force: false, })
    document.id = uuidv4();
    const newDoc = await DocumentFiles.bulkCreate([document]);
    console.log('Document added successfully.');
    console.log(newDoc);
    return newDoc;
}

const addImage = async (image) => {
    // Synchronize the DocumentFiles table and insert the test document
    await ImageFile.sync({ force: false, })
    image.id = uuidv4();
    const newImage = await ImageFile.bulkCreate([image]);
    console.log('Image added successfully.');
    console.log(newImage);
    return newImage;
}

// make a function to add a test document, and export it 
const addTestDocument = async () => {
    // add the test document
    return await addDocument(testDocument)
}

const addTestImage = async () => {
    // add the test document
    return await addImage(testImage)
}

// delete all documents
const deleteAllDocuments = async () => {
    // Synchronize the DocumentFiles table and insert the test document
    DocumentFiles.sync({
            force: false,
        })
        .then(function () {
            // Insert the test document into the DocumentFiles table
            return DocumentFiles.destroy({
                where: {},
                truncate: true
            });
        })
        .then(function () {
            console.log('All documents deleted successfully.');
        })
        // Error handling for database errors
        .catch(function (err) {
            console.error('Error: ' + err.message);
        });
}

const deleteAllImages = async () => {
    // Synchronize the DocumentFiles table and insert the test document
    ImageFile.sync({
            force: false,
        })
        .then(function () {
            // Insert the test document into the DocumentFiles table
            return ImageFile.destroy({
                where: {},
                truncate: true
            });
        })
        .then(function () {
            console.log('All images deleted successfully.');
        })
        // Error handling for database errors
        .catch(function (err) {
            console.error('Error: ' + err.message);
        });
}

// make a function that prints all 
const getAllDocuments = async () => {
    // Synchronize the DocumentFiles table and insert the test document
    await DocumentFiles.sync({force: false})
    const documents = await DocumentFiles.findAll();
    console.log('docs are\n'+documents); 
    return documents;
}

const getAllImages = async () => {
    // Synchronize the DocumentFiles table and insert the test document
    await ImageFile.sync({force: false})
    const images = await ImageFile.findAll();
    console.log('images are\n'+images); 
    return images;
}

module.exports = {
    testDocument,
    deleteAllDocuments,
    addDocument,
    addTestDocument,
    getAllDocuments,

    deleteAllImages,
    addImage,
    addTestImage,
    getAllImages
};