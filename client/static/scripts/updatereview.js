function updateReview() {
    const id = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    const text = document.getElementById('textarea2').value;
    if(text.length < 1) return;
    fetch('./api/updatereview', {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify({id: id, token: token, text: text})
    }).then(response => {
        console.log(response);
        M.toast({html: 'Review updated.'});
    })
    .catch(error => {
        M.toast({html: 'Unable to update the review.'});
        console.log(error);
    });
}
updateReview();
window.location.reload();