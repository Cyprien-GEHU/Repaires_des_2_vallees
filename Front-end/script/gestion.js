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
      // On accepte imageUrl ou picture comme nom de champ image
      const imageSrc = article.imageUrl || article.picture || '';
      const html = `
        <div class="card-horizontal" style="display:flex;flex-direction:row;align-items:stretch;max-width:1400px;width:99vw;margin:3rem auto;background:#fff;border-radius:22px;box-shadow:0 12px 40px rgba(67,160,71,0.18);overflow:hidden;">
          <div style="width:50%;display:flex;align-items:center;justify-content:center;">
            ${imageSrc ? `<img src="${imageSrc}" alt="Image de l'article" style="max-width:97%;max-height:520px;border-radius:16px;box-shadow:0 4px 18px rgba(67,160,71,0.18);">` : '<span style="color:#bbb;font-style:italic;">Aucune image</span>'}
          </div>
          <div class="card-body" style="padding:3.2rem 2.7rem;display:flex;flex-direction:column;justify-content:center;width:50%;">
            <h2 style="font-size:2.7rem;margin-bottom:1.5rem;color:#1b5e20;letter-spacing:1.5px;">${article.Title || ''}</h2>
            <p style="font-size:1.25rem;color:#444;margin-bottom:1.6rem;">${article.description || ''}</p>
            <div style="font-size:1.12rem;line-height:1.8;color:#222;margin-bottom:1.6rem;">${article.contenu || ''}</div>
            <div style="margin-top:auto;">
              ${article.categorie ? `<span style='display:inline-block;background:#e8f5e9;color:#1b5e20;padding:0.6rem 1.4rem;border-radius:22px;font-weight:500;font-size:1.13rem;box-shadow:0 2px 8px rgba(67,160,71,0.10);'><strong>Catégorie :</strong> ${article.categorie}</span>` : ''}
            </div>
          </div>
        </div>
      `;
      container.innerHTML = html;
    })
    .catch((err) => {
      container.innerHTML = `<p style=\"color:red;\">Erreur : ${err.message}</p>`;
    });
});
