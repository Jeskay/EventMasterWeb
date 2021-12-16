const {removeReviewQuery} = require('../utils/queries');
const { Config } = require('../utils/config');

function command(client, req, body, res) {
    console.log(body);
    return new Promise((resolve, reject) => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        const {id, token, removeid} = JSON.parse(body);
        if(Config.tokens[id] != token) 
            reject({error: 'Invalid token'});
        if(!Config.admins.includes(id))
            reject({error: 'Access denied'});
        client.query(removeReviewQuery(removeid))
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