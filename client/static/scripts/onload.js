function fetch_header(){
	console.log("loaded");
	const fragment = new URLSearchParams(window.location.hash.slice(1));
	const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];
	if (!accessToken) {
		const avatar = localStorage.getItem('user_avatar');
		const username = localStorage.getItem('username');
		if(!avatar || !username) return;
		document.getElementById('avatar_item').style.display = 'block';
		document.getElementById('mobile_profile').style.display = 'block';
		document.getElementById('mobile_logout').style.display = 'block';

		document.getElementById('mobile_avatar').src = avatar;
		document.getElementById('mobile_name').textContent = username;
		document.getElementById('user_avatar').src = avatar;

		document.getElementById('login_btn').style.display = 'none';
		document.getElementById('mobile_login').style.display = 'none';
		return;
	}

	fetch('https://discord.com/api/users/@me', {
		headers: {
			authorization: `${tokenType} ${accessToken}`,
		},
	})
	.then(result => result.json())
	.then(response => {
		const { id, username, discriminator, avatar, accent_color } = response;
		console.log(`${username}#${discriminator}`);
		localStorage.setItem('user_id', id);
		localStorage.setItem('username', username);
		localStorage.setItem('user_avatar', `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`);
		localStorage.setItem('user_discriminator', discriminator);
		localStorage.setItem('user_accent_color', accent_color);
		window.location.assign("./");
	})
	.catch(console.error);
}
fetch_header();