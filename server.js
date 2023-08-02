const http = require('http');
const path = require('path');
const fs = require('fs');
const { connectToDatabase } = require('./utils/dbManager')
const getActivities= require('./utils/activities');
const { addInDatabase, activityDone, deleteActivity } = require('./utils/add-activity')

connectToDatabase();
const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, req.url);
    const fileExtension = path.extname(filePath);
    if (req.url === '/get-activities' && req.method === 'GET') {
        getActivities(req, res);
    } else if (req.url.startsWith('/add-in-database/') && req.method === 'GET') {
        const activityName = req.url.substring('/add-in-database/'.length);
        addInDatabase(req, res, activityName);
    } else if (req.url.startsWith('/activity-done/') && req.method === 'GET') {
        const activityName = req.url.substring('/activity-done/'.length);
        activityDone(req, res, activityName);
    } else if (req.url.startsWith('/delete-activity/') && req.method === 'GET') {
        const activityName = req.url.substring('/delete-activity/'.length);
        deleteActivity(req, res, activityName);
    } else if (fileExtension === '.css') {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('404 Not Found');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(data);
            }
        });
    } else if (fileExtension === '.js') {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('404 Not Found');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.end(data);
            }
        });
    }
    else {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('404 Not Found');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }
});

const port = 3000;

server.listen(port, () => {
    console.log(`Serverul a pornit pe portul ${port}`);
});