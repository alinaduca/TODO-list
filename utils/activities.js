const { getClient } = require('./dbManager');

const getActivities = async(req, res)=> {
    const client = getClient();
    const db = client.db('axiologic');
    const collection = db.collection('todo');
    const activities = await collection.find().toArray();
    const infos = [];
    for(let activity of activities) {
        infos.push({"activity" : activity.activity, "done" : activity.done});
    }
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify(infos));
};

module.exports = getActivities;