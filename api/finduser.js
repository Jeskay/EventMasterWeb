const {userQuery} = require('../utils/queries');

function command(client, req, body, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    const {id} = JSON.parse(body);
    return client.query(userQuery(id))
    .then(result => {
        const {id, eventsPlayed, eventsHosted, score, banned, minutesPlayed} = result.rows[0];
        return {
            id: id,
            played: eventsPlayed,
            hosted: eventsHosted,
            score: score,
            banned: banned,
            minutes: minutesPlayed,
        };
    });
}
module.exports = {command}