const {userQuery} = require('../utils/queries');

function command(client, req, body, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    const {id} = JSON.parse(body);
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