function fetch_header(){
	console.log("loaded");
	const fragment = new URLSearchParams(window.location.hash.slice(1));
	const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];
	if (!accessToken) {
		const avatar = localStorage.getItem('user_avatar');
		if(!avatar) return;
		document.getElementById('avatar_item').style.display = 'block';
		document.getElementById('user_avatar').src = avatar;

		document.getElementById('login_btn').style.display = 'none';
		return;
	}

	fetch('https://discord.com/api/users/@me', {
		headers: {
			authorization: `${tokenType} ${accessToken}`,
		},
	})
	.then(result => result.json())
	.then(response => {
		const { id, username, discriminator, avatar } = response;
		console.log(`${username}#${discriminator}`);
		localStorage.setItem('user_id', id);
		localStorage.setItem('username', username);
		localStorage.setItem('user_avatar', `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`);
		localStorage.setItem('user_discriminator', discriminator);
		window.location.assign("./");
	})
	.catch(console.error);
}
fetch_header();