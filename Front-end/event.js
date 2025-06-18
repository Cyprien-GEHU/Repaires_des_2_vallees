document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/event")
    .then(response => {
      if (!response.ok) throw new Error("Erreur lors de la récupération des événements.");
      return response.json();
    })
    .then(events => {
      const groupesParDate = {};

      events.forEach(evt => {
        // Normalise les noms de mois en français/anglais
        const moisFr = {
          janvier: "01", février: "02", mars: "03", avril: "04", mai: "05", juin: "06",
          juillet: "07", août: "08", septembre: "09", octobre: "10", novembre: "11", décembre: "12"
        };

        let dateStr = evt.day.trim();

        // Si la date est en français
        const matchFr = dateStr.match(/^(\d{1,2}) (\w+) (\d{4})$/);
        const matchEn = dateStr.match(/^(\d{1,2}) (\w+) (\d{4})$/);

        let formattedDate;

        if (matchFr && moisFr[matchFr[2].toLowerCase()]) {
          const [_, jour, mois, annee] = matchFr;
          formattedDate = `${annee}-${moisFr[mois.toLowerCase()]}-${jour.padStart(2, '0')}`;
        } else {
          // Fallback en anglais (si le mois est anglais ou inconnu)
          formattedDate = new Date(dateStr);
          if (isNaN(formattedDate)) {
            console.warn("Date invalide pour l’événement :", evt);
            return; // On saute cet event
          }
          formattedDate = formattedDate.toISOString().slice(0, 10); // YYYY-MM-DD
        }

        if (!groupesParDate[formattedDate]) groupesParDate[formattedDate] = [];
        groupesParDate[formattedDate].push(evt);
      });

      const container = document.querySelector(".right");
      container.innerHTML = "";

      Object.entries(groupesParDate).sort().forEach(([date, evts]) => {
        const bloc = document.createElement("div");
        bloc.className = "day-card";

        const titre = document.createElement("h3");
        titre.textContent = `📅 ${new Date(date).toLocaleDateString("fr-FR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric"
        })}`;

        bloc.appendChild(titre);

        evts.forEach(evt => {
          const div = document.createElement("div");
          div.className = "event";
          div.innerHTML = `
            <h4>${evt.Title}</h4>
            <p>${evt.description}</p>
          `;
          bloc.appendChild(div);
        });

        container.appendChild(bloc);
      });
    })
    .catch(err => {
      console.error("Erreur chargement événements :", err);
      const container = document.querySelector(".right");
      if (container) {
        container.innerHTML = `<p style="color:red;">Erreur de chargement des événements.</p>`;
      }
    });
});
