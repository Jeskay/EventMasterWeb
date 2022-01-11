const {updateReviewQuery} = require('../utils/queries');
const { Config } = require('../utils/config');

function command(client, req, body, res) {
    console.log(body);
    return new Promise((resolve, reject) => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        const {id, token, text} = JSON.parse(body);
        if(Config.tokens[id] != token) 
            reject({error: 'Invalid token'});
        client.query(updateReviewQuery(id, text))
        .then(result => {
            const response = result.rows;
            console.log(response);
            resolve({status: 'success'});
        })
        .catch(err => {
            console.error(err);
            reject({error: err});
        });
    })
}
module.exports = {command}