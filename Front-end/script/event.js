document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/event")
    .then(response => {
      if (!response.ok) throw new Error("Erreur lors de la récupération des événements.");
      return response.json();
    })
    .then(events => {
      const groupesParDate = {};
      const moisFr = {
        janvier: "01", février: "02", mars: "03", avril: "04", mai: "05", juin: "06",
        juillet: "07", août: "08", septembre: "09", octobre: "10", novembre: "11", décembre: "12"
      };

      events.forEach(evt => {
        const dateStr = evt.day.trim();
        const matchFr = dateStr.match(/^(\d{1,2}) (\w+) (\d{4})$/);
        let formattedDate;

        if (matchFr && moisFr[matchFr[2].toLowerCase()]) {
          const [_, jour, mois, annee] = matchFr;
          formattedDate = `${annee}-${moisFr[mois.toLowerCase()]}-${jour.padStart(2, '0')}`;
        } else {
          const tempDate = new Date(dateStr);
          if (isNaN(tempDate)) return;
          formattedDate = tempDate.toISOString().slice(0, 10);
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
          weekday: "long", year: "numeric", month: "long", day: "numeric"
        })}`;
        bloc.appendChild(titre);

        const cardContainer = document.createElement("div");
        cardContainer.className = "card-container";

        evts.forEach(evt => {
          const card = document.createElement("div");
          card.className = "card";

          card.innerHTML = `
            ${evt.picture ? `<img src="${evt.picture}" alt="${evt.Title}">` : ""}
            <div class="card-body">
              <h2>${evt.Title}</h2>
              <p class="truncate">${evt.description}</p>
              <a href="gestion.html?type=event&id=${evt._id}" class="read-more-btn" style="margin-top:10px;display:inline-block;background:#00cc00;color:white;padding:8px 16px;border-radius:6px;text-decoration:none;transition:background 0.3s;">Lire plus</a>
            </div>
          `;

          cardContainer.appendChild(card);
        });

        bloc.appendChild(cardContainer);
        container.appendChild(bloc);
      });
    })
    .catch(err => {
      console.error("Erreur chargement événements :", err);
      const container = document.querySelector(".right");
      container.innerHTML = `<p style="color:red;">Erreur de chargement des événements.</p>`;
    });
});
