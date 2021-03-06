const {reviewsQuery} = require('../utils/queries');

function command(client, req, body, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    return client.query(reviewsQuery())
    .then(result => {
        const response = result.rows;
        return response;
    })
    .catch(err => {
        console.log(err);
        return {error: err};
    })
}
module.exports = {command}