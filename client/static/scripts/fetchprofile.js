function fetchProfile(){
    console.log('fetching...');
    const id = localStorage.getItem('user_id');
    const avatar = localStorage.getItem('user_avatar');
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    
    document.getElementById('avatar_image').src = avatar;
    document.getElementById('username').textContent = username;

    fetch('./api/finduser', {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify({id: id, token: token})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById('played_stat').textContent = data.played;
        document.getElementById('hosted_stat').textContent = data.hosted;
        document.getElementById('likes_stat').textContent = data.likes;
        document.getElementById('dislikes_stat').textContent = data.dislikes;
        document.getElementById('score_stat').textContent = data.score ? data.score : 0;
        document.getElementById('banned_stat').textContent = data.banned;
    })
    .catch(error => console.error(error));
}
fetchProfile();