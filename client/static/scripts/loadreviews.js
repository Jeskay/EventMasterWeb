function createReview(text, score){
    const content = `
    <div class="card-stacked">
        <div class="card-content">
          <p>${text}</p>
          <p>${score}</p>
        </div>
    </div>
    <div class="card-image">
      <img src="static/images/community_in_discord.jpg">
    </div>
    `;
    const card = Object.assign(document.createElement('div'), {
        className: 'card horizontal left',
        innerHTML: content
    });
    const fragment = document.createDocumentFragment();
    fragment.appendChild(card);
    document.getElementById('container').appendChild(fragment);
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
            createReview(data[i].text, data[i].score);
        }
    })
    .catch(error => console.log(error));
}
loadReviews();