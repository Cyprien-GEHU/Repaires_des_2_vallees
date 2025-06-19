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

      // Ordre fixe des jours
      const joursOrdre = ["lundi", "mardi", "mercredi", "jeudi", "vendredi"];

      // Groupe les événements par jour
      const grouped = {};

      data.forEach(item => {
        const jour = item.day.toLowerCase(); // ex: lundi, mardi
        if (!grouped[jour]) {
          grouped[jour] = [];
        }
        grouped[jour].push(item.event);
      });

      // Affiche les jours dans l'ordre
      joursOrdre.forEach(jour => {
        const jourBlock = document.createElement("div");
        jourBlock.classList.add("programme-jour"); // Card stylisée

        const titre = document.createElement("h3");
        titre.textContent = jour.charAt(0).toUpperCase() + jour.slice(1); // Majuscule

        const liste = document.createElement("ul");

        if (grouped[jour] && grouped[jour].length) {
          grouped[jour].forEach((act) => {
            const li = document.createElement("li");
            li.textContent = act;
            liste.appendChild(li);
          });
        } else {
          const li = document.createElement("li");
          li.textContent = "Aucune activité prévue.";
          liste.appendChild(li);
        }

        jourBlock.appendChild(titre);
        jourBlock.appendChild(liste);
        container.appendChild(jourBlock);
      });
    })
    .catch((error) => {
      container.innerHTML = `<p>Erreur : ${error.message}</p>`;
    });
});
