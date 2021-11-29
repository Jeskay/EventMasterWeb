const http = require('http');
const url = require('whatwg-url');
const path = require('path');

const routePath = path.join(__dirname, ".", "routes");

const server = http.createServer((req, res) => {
    console.log(req.url);
    var body = '';
    req.on('data', (chunk) => body += chunk);
    req.on('end', () => {
        try {
            const {command} = require(`${routePath}${req.url}/${req.method ? req.method.toLowerCase() : 'index' }.js`);
            console.log(command);
            const data = command(req, body);
            res.writeHead(200, {ContentType: 'application/json'});
            res.end(JSON.stringify(data));
        } catch(err){
            console.log(err);
            res.writeHead(404, 'Content-Type', 'text/plain');
            res.end('Invalid request');
        }
    })
    
});
server.listen(5000);
