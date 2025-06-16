document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("programme-container");

  fetch("http://localhost:3000/agenda/") // adapte l'URL si besoin
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération du programme");
      }
      return response.json();
    })
    .then((data) => {
      if (!data.length) {
        container.innerHTML = "<p>Aucun programme disponible pour le moment.</p>";
        return;
      }

      data.forEach(jour => {
        const jourBlock = document.createElement("div");
        jourBlock.classList.add("jour-block");

        const titre = document.createElement("h3");
        titre.textContent = jour.jour;

        const liste = document.createElement("ul");
        jour.activites.forEach((act) => {
          const li = document.createElement("li");
          li.textContent = act;
          liste.appendChild(li);
        });

        jourBlock.appendChild(titre);
        jourBlock.appendChild(liste);
        container.appendChild(jourBlock);
      });
    })
    .catch((error) => {
      container.innerHTML = `<p>Erreur : ${error.message}</p>`;
    });
});
