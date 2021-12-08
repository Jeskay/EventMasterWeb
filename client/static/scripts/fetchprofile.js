function fetchProfile(){
    console.log('fetching...');
    const id = localStorage.getItem('user_id');
    const avatar = localStorage.getItem('user_avatar');
    const username = localStorage.getItem('username');
    
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
        body: JSON.stringify({id: id})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById('played_stat').textContent = data.played;
        document.getElementById('hosted_stat').textContent = data.hosted;
    })
    .catch(error => console.error(error));
}
fetchProfile();