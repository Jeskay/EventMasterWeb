function submitReview() {
    console.log('submitting a review...');
    const id = localStorage.getItem('user_id');
    const avatar = localStorage.getItem('user_avatar');
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const discriminator = localStorage.getItem('user_discriminator');
    const text = document.getElementById('textarea2').value;
    if(text.length < 1) return;
    fetch('./api/postreview', {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify({id: id, token: token, avatar: avatar, username: username, text: text, discriminator: discriminator})
    }).then(response => {
        console.log(response);
        console.log('success');
    })
    .catch(error => console.error(error));
}
submitReview();
window.location.reload();