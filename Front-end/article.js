document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("article-container");

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    container.innerHTML = "<p>Article introuvable.</p>";
    return;
  }

  fetch(`http://localhost:3000/article/${id}`) // Remplace par l'URL correcte de ton backend
    .then((response) => {
      if (!response.ok) throw new Error("Erreur lors de la récupération de l'article.");
      return response.json();
    })
    .then((article) => {
      const html = `
        <h2 style="color: #2e7d32;">${article.Title}</h2>
        ${article.imageUrl ? `<img src="${article.imageUrl}" alt="${article.Title}" style="width:100%;max-width:600px;margin:1rem 0;">` : ''}
        <p>${article.description || ''}</p>
        <div style="margin-top: 1rem;">${article.contenu || ''}</div>
      `;
      container.innerHTML = html;
    })
    .catch((err) => {
      container.innerHTML = `<p style="color:red;">Erreur : ${err.message}</p>`;
    });
});
