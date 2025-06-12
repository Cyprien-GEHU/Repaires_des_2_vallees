document.querySelector('.form-section form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const Title = document.getElementById('titre').value;
  const description = document.getElementById('contenu').value;

  if (!Title || !description) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/admin/article', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Title, description })
    });
    console.log(response.body);

    if (!response.ok) {
      const errorData = await response.json();
      alert(`Erreur : ${errorData.message || 'Une erreur est survenue.'}`);
      return;
    }

    alert("Article ajouté avec succès !");
    e.target.reset(); // Réinitialise le formulaire
  } catch (error) {
    console.error("Erreur réseau :", error);
    alert("Une erreur réseau est survenue. Vérifiez votre connexion.");
  }
});
document.querySelectorAll('.form-section form')[1].addEventListener('submit', function (e) {
  e.preventDefault();

  const id = document.getElementById('article-id').value;
  const Title = document.getElementById('nouveau-titre').value;
  const description = document.getElementById('nouveau-contenu').value;

  fetch(`http://localhost:3000/admin/article/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ Title, description })
  })
    .then(res => res.json())
    .then(data => alert("Article modifié !"))
    .catch(err => console.error(err));
});

document.querySelectorAll('.form-section form')[2].addEventListener('submit', function (e) {
  e.preventDefault();

  const id = document.getElementById('supprimer-id').value;

  fetch(`http://localhost:3000/admin/article/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
});

document.getElementById('load-articles').addEventListener('click', () => {
  fetch('http://localhost:3000/article')
    .then(response => response.json())
    .then(articles => {
      const list = document.getElementById('articles-list');
      list.innerHTML = ''; // Vider la liste avant de recharger

      if (articles.length === 0) {
        const li = document.createElement('li');
        li.textContent = "Aucun article trouvé.";
        list.appendChild(li);
        return;
      }

      articles.forEach(article => {
        const li = document.createElement('li');
        li.innerHTML = `
          <h3>${article.Title}</h3>
          <p>${article.description}</p>
          <p><strong>Créé par :</strong> ${article.creator}</p>
          <p>${article._id}</p>
          ${article.image ? `<img src="/uploads/${article.image}" alt="Image de l'article" style="max-width:100%; border-radius: 10px;">` : ''}
          <hr>
        `;
        list.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Erreur lors du chargement des articles :', error);
      alert("Impossible de charger les articles.");
    });
});

