const http = require('http');
const {URL} = require('whatwg-url');
const path = require('path');
const fs = require('fs');
const statik = require('@brettz9/node-static');
const {Client} = require('pg');
require('dotenv').config();

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const client = new Client({
    connectionString: process.env.CONNECTION,
    ssl: true
});

client.connect(err => {
    if (err) {
        console.error(err);
    } else {
        console.log('connected to database');
    }
});

const routePath = path.join(__dirname, ".", "client");
const fileServer = new statik.Server(routePath);

const server = http.createServer((req, res) => {
    const uri = new URL(`http://localhost:5000${req.url}`);
    const parsed = req.url.split('/');
    var body = '';
    req.on('data', (chunk) => body += chunk);
    req.on('end', () => {
        //API requests
        if(parsed[1] == "api"){
            const {command} = require(`${__dirname}${uri.pathname}.js`);
            command(client, req, body, res)
            .then(result => {
                res.statusCode = 200;
                res.end(JSON.stringify(result));
            })
            .catch(err => {
                res.statusCode = 400;
                res.end(JSON.stringify(err));
            });
        } else {
            //content requests
            fileServer.serve(req, res);
        }
        
    })
});
server.listen(5000);
