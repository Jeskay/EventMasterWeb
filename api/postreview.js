const {reviewsQuery} = require('../utils/queries');
const { Config } = require('../utils/config');

function command(client, req, body, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    const {id, token, score, text} = JSON.parse(body);
    const decode = jwt.verify(token, process.env.TOKEN);
    if(Config.tokens[id] != decode) 
        return {error: 'Invalid token'};
    return client.query(reviewsQuery())
    .then(result => {
        const response = result.rows;
        return response;
    });
}
module.exports = {command}