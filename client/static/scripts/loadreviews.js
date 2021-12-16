function createReview(text, avatar, username, id){
    const content = `
    <img src="${avatar}" class="circle">
    <span class="title">${username}</span>
    <p>${text}</p>
    <button id="${id}" class="btn secondary-content"><i class="material-icons">delete</i></button>
    `;
    const card = Object.assign(document.createElement('li'), {
        className: 'collection-item avatar',
        innerHTML: content
    });
    const fragment = document.createDocumentFragment();
    fragment.appendChild(card);
    document.getElementById('review_collection').appendChild(fragment);
}
function loadReviews(){
    fetch('./api/getreviews', {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            createReview(data[i].text, data[i].avatar, data[i].name, data[i].authorId);
        }
    })
    .catch(error => console.log(error));
}
loadReviews();