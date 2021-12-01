const http = require('http');
const url = require('whatwg-url');
const path = require('path');
const fs = require('fs');

const routePath = path.join(__dirname, ".", "client");

const server = http.createServer((req, res) => {
    const parsed = req.url.split('/');
    var body = '';
    req.on('data', (chunk) => body += chunk);
    req.on('end', () => {
        //API requests
        if(parsed[1] == "api"){
            const {command} = require(`${__dirname}${req.url}.js`);
            const result = command(req, body, res);
            res.end(JSON.stringify(result));
        } else {
            //content requests
            const path = `${routePath}/pages/${req.url == '/' ? 'index' : req.url}.html`;
            fs.readFile(path, (error, html) => {
                if(error) {
                        console.log(error);
                        res.writeHead(404, 'Content-Type', 'text/plain');
                        res.end('Invalid request');
                } else {
                    res.writeHead(200, {ContentType: 'text/html'});
                    res.write(html);
                    res.end();
                }
            });
        }
        
    })
});
server.listen(5000);
