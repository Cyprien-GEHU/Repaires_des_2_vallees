// articles.js
window.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/articles')
    .then(res => res.json())
    .then(articles => {
      const container = document.querySelector('.articles');
      container.innerHTML = ''; // Vide les articles statiques

      articles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
          <img src="${article.picture || 'default.jpg'}" alt="${article.Title}">
          <div class="card-body">
            <h2>${article.Title}</h2>
            <p>${article.description}</p>
            <a href="article.html?id=${article._id}">Lire plus</a>
          </div>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => console.error('Erreur chargement articles:', err));
});
