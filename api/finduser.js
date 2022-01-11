const {userQuery} = require('../utils/queries');
const { Config } = require('../utils/config');

function command(client, req, body, res) {
    return new Promise((resolve, reject) => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        const {id, token} = JSON.parse(body);
        if(Config.tokens[id] != token) 
            reject({error: 'Invalid token'});
        client.query(userQuery(id))
        .then(result => {
            if(!result.rows[0]) reject({error: 'User not found'});
            const {id, eventsPlayed, eventsHosted, score, banned, minutesPlayed, likes, dislikes} = result.rows[0];
            resolve({
                id: id,
                played: eventsPlayed,
                hosted: eventsHosted,
                likes: likes,
                dislikes: dislikes,
                score: score,
                banned: banned,
                minutes: minutesPlayed,
            });
        })
        .catch(err => {
            console.error(err);
            reject({error: err});
        });
    });
}
module.exports = {command}