function createReview(text, avatar, username, id, discriminator){
    let content = `
    <img id="${discriminator}" src="${avatar}" class="circle">
    <span class="title">${username}</span>
    <p>${text}</p>
    `;
    if(localStorage.getItem('credentials') == 'admin') content += `<button id="${id}" class="btn secondary-content"><i class="material-icons">delete</i></button>`;
    if(localStorage.getItem('user_id') == id ) localStorage.setItem('own_review', text);
    const card = Object.assign(document.createElement('li'), {
        className: 'collection-item avatar',
        innerHTML: content
    });
    const fragment = document.createDocumentFragment();
    fragment.appendChild(card);
    document.getElementById('review_collection').appendChild(fragment);
}
function loadReviews(){
    localStorage.removeItem('own_review');
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
            createReview(data[i].text, data[i].avatar, data[i].name, data[i].authorId, data[i].discriminator);
        }
        $.getScript( "static/scripts/reviewaction.js");
    })
    .catch(error => console.log(error));
}
loadReviews();