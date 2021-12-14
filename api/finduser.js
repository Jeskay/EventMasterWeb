const {userQuery} = require('../utils/queries');
const { Config } = require('../utils/config');

function command(client, req, body, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    const {id, token} = JSON.parse(body);
    if(Config.tokens[id] != token) 
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