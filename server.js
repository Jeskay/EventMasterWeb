const http = require('http');
const {URL} = require('whatwg-url');
const path = require('path');
const fs = require('fs');
const statik = require('@brettz9/node-static');

const routePath = path.join(__dirname, ".", "client/pages");
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
            const result = command(req, body, res);
            res.end(JSON.stringify(result));
        } else {
            //content requests
            fileServer.serve(req, res);
        }
        
    })
});
server.listen(5000);
