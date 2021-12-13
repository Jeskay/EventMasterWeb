const jwt = require('jsonwebtoken');
const { Config } = require('../utils/config');
const fetch = require('node-fetch');

function command(client, req, body, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    const {code} = JSON.parse(body);
    console.log(code);
    return fetch('https://discord.com/api/oauth2/token', {
				method: 'POST',
				body: new URLSearchParams({
					client_id: process.env.CLIENT_ID,
					client_secret: process.env.CLIENT_SECRET,
					code: code,
					grant_type: 'authorization_code',
					redirect_uri: `http://localhost:5000/`,
                    scope: 'identify'
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				}
	})
    .then(oauthResult => oauthResult.json())
    .then(oauthData => fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `${oauthData.token_type} ${oauthData.access_token}`,
        }
    }))
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const {id, username, discriminator, avatar, accent_color} = data;
        const credentials = id == "322356862748065792" ? 'admin' : 'user';
        const token = jwt.sign({id: id}, process.env.TOKEN);
        Config.tokens[id] = token;
        return {
            jwt: token,
            id: id,
            username: username,
            discriminator: discriminator,
            avatar: avatar,
            accent_color: accent_color,
            credentials: credentials
        }
    });
       
}

module.exports = {command}