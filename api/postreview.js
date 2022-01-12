const {postreviewQuery} = require('../utils/queries');
const { Config } = require('../utils/config');

function command(client, req, body, res) {
    return new Promise((resolve, reject) => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        const {id, token, avatar, username, text, discriminator} = JSON.parse(body);
        if(Config.tokens[id] != token) 
            reject({error: 'Invalid token'});
        client.query(postreviewQuery(text, avatar, username, id, discriminator))
        .then(result => {
            const response = result.rows;
            resolve(response);
        })
        .catch(err => {
            console.error(err);
            reject({error: err});
        });
    })
}
module.exports = {command}