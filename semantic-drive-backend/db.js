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
        type: Sequelize.STRING, // Change to STRING for 'str'
    },
});

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
    tags: 'Tag1,Tag2', // Replace with desired tags
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