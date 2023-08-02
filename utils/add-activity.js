const { getClient } = require('./dbManager');

function addInDatabase(req, res, activityName) {
    const client = getClient();
    const db = client.db('axiologic');
    const collection = db.collection('todo');
    const newRecord = {
        activity: activityName,
        done: "no"
    };
    collection.insertOne(newRecord);
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end("ok");
}

function activityDone(req, res, activityName) {
    const client = getClient();
    const db = client.db('axiologic');
    const collection = db.collection('todo');
    const query = { activity: activityName };
    const update = { $set: { activity: activityName, done: "yes" } };
    const options = {};
    collection.updateOne(query, update, options);
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end("ok");
}

function deleteActivity(req, res, activityName) {
    const client = getClient();
    const db = client.db('axiologic');
    const collection = db.collection('todo');
    const query = { activity: activityName };
    collection.deleteOne(query);
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end("ok");
}

module.exports = { addInDatabase, activityDone, deleteActivity };