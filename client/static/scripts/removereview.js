$('#review_collection').on("click", ".secondary-content" , function(event){
    console.log('clicked');
    const id = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    var removed = event.currentTarget.id;
    fetch('./api/removereview', {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify({id: id, token: token, removeid: removed})
    })
    .then(response => {
        console.log(response);
        console.log('review removed');
        window.location.reload();
    })                
    .catch(error => console.log(error));
});