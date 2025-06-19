document.addEventListener("DOMContentLoaded", () => {
  const boutonsContainer = document.getElementById("jour-buttons");
  const cardsContainer = document.getElementById("programme-cards");

  fetch("http://localhost:3000/agenda/")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération du programme");
      }
      return response.json();
    })
    .then((data) => {
      if (!data.length) {
        cardsContainer.innerHTML = "<p>Aucun programme disponible pour le moment.</p>";
        return;
      }

      const joursOrdre = ["lundi", "mardi", "mercredi", "jeudi", "vendredi"];
      const grouped = {};

      // Regrouper les activités par jour
      data.forEach(item => {
        const jour = item.day.toLowerCase();
        if (!grouped[jour]) {
          grouped[jour] = [];
        }
        grouped[jour].push(item);
      });

      // Créer les boutons des jours
      joursOrdre.forEach(jour => {
        const btn = document.createElement("button");
        btn.textContent = jour.charAt(0).toUpperCase() + jour.slice(1);
        btn.addEventListener("click", () => {
          document.querySelectorAll(".jour-buttons button").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          afficherCartes(grouped[jour] || [], jour);
        });
        boutonsContainer.appendChild(btn);
      });

      // Affiche automatiquement le premier jour
      if (joursOrdre.length > 0) {
        boutonsContainer.querySelector("button").click();
      }

      // Fonction pour afficher les cartes d'activité
      function afficherCartes(activites, jour) {
        cardsContainer.innerHTML = "";

        if (!activites.length) {
          cardsContainer.innerHTML = `<p>Aucune activité prévue pour le ${jour}.</p>`;
          return;
        }

        activites.forEach(act => {
          const card = document.createElement("div");
          card.classList.add("card-activite");

          const titre = document.createElement("h4");
          titre.textContent = act.Title;

          const description = document.createElement("p");
          description.textContent = act.description || "Aucune description disponible.";

          const prix = document.createElement("p");
          prix.textContent = `Prix : ${act.price || "non renseigné"}`;

          card.appendChild(titre);
          card.appendChild(description);
          card.appendChild(prix);

          cardsContainer.appendChild(card);
        });
      }
    })
    .catch((error) => {
      cardsContainer.innerHTML = `<p>Erreur : ${error.message}</p>`;
    });
});
