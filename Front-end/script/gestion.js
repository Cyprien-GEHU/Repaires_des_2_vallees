document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("article-container");

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    container.innerHTML = "<p>Article introuvable.</p>";
    return;
  }

  fetch(`http://localhost:3000/article/${id}`)
    .then((response) => {
      if (!response.ok) throw new Error("Erreur lors de la récupération de l'article.");
      return response.json();
    })
    .then((article) => {
      const html = `
        <div class="card-horizontal">
          <div class="card-body">
            <h2>${article.Title || ''}</h2>
            <p>${article.description || ''}</p>
            <div>${article.contenu || ''}</div>
            ${article.categorie ? `<p style='margin-top:1rem;'><strong>Catégorie :</strong> ${article.categorie}</p>` : ''}
            ${article.day ? `<p><strong>Date :</strong> ${article.day}</p>` : ''}
            ${article.price ? `<p><strong>Prix :</strong> ${article.price} €</p>` : ''}
          </div>
        </div>
      `;
      container.innerHTML = html;
    })
    .catch((err) => {
      container.innerHTML = `<p style="color:red;">Erreur : ${err.message}</p>`;
    });
});
