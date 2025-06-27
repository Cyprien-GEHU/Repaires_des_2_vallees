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
          <p><stong></strong> ${article.picture ? `<img src="${article.picture}" alt="Image de l'article" />` : 'Aucune image'}</p>
            <h2>${article.Title || ''}</h2>
            <p>${article.description || ''}</p>
            <div>${article.contenu || ''}</div>
            <p style='margin-top:1rem;'><strong>Catégorie :</strong> ${article.categorie}</p>
            
          </div>
        </div>
      `;
      container.innerHTML = html;
    })
    .catch((err) => {
      container.innerHTML = `<p style="color:red;">Erreur : ${err.message}</p>`;
    });
});
