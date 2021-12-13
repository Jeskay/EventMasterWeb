const {userQuery} = require('../utils/queries');
const jwt = require('jsonwebtoken');
const { Config } = require('../utils/config');

function command(client, req, body, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    const {id, token} = JSON.parse(body);
    const decode = jwt.verify(token, process.env.TOKEN);
    if(Config.tokens[id] != decode) 
        return {error: 'Invalid token'};
    return client.query(userQuery(id))
    .then(result => {
        const {id, eventsPlayed, eventsHosted, score, banned, minutesPlayed, likes, dislikes} = result.rows[0];
        return {
            id: id,
            played: eventsPlayed,
            hosted: eventsHosted,
            likes: likes,
            dislikes: dislikes,
            score: score,
            banned: banned,
            minutes: minutesPlayed,
        };
    });
}
module.exports = {command}