function fetch_header(){
	console.log("loaded");
	const urlParams = new URLSearchParams(window.location.search);
	const code = urlParams.get("code");
	if (!code) {
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

	fetch('./api/login', {
			method: 'POST',
			mode: 'cors',
			cache: 'default',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			redirect: 'follow',
			body: JSON.stringify({code: code})
	})
	.then(result => result.json())
	.then(response => {
		const { jwt, id, username, discriminator, avatar, accent_color } = response;
		console.log(`${username}#${discriminator}`);
		localStorage.setItem('token', jwt);
		localStorage.setItem('user_id', id);
		localStorage.setItem('username', username);
		localStorage.setItem('user_avatar', `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`);
		localStorage.setItem('user_discriminator', discriminator);
		localStorage.setItem('user_accent_color', accent_color);
		window.location.assign("./");
	})
}
fetch_header();