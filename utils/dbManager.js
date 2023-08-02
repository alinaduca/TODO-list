const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb+srv://alinaduca:OWITcJZSDjWb2alY@cluster0.jxnvlp6.mongodb.net/';
let client;

// const uri = 'mongodb+srv://dbUser:1234@cluster0.fnjk4yn.mongodb.net/';

async function connectToDatabase() {
    try {
        client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Conexiunea la baza de date a fost stabilită cu succes');
    } catch (error) {
        console.error('Eroare la conectarea la baza de date:', error);
        throw error;
    }
}

function getClient() {
    return client;
}

module.exports = { connectToDatabase, getClient };