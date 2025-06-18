// Récupérer type et id depuis l'URL
function getParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    type: params.get('type'),
    id: params.get('id')
  };
}

const { type, id } = getParams();
const form = document.getElementById('edit-form');
const backLink = document.getElementById('back-link');

// Définit le lien retour vers manage.html avec le bon type
let typePlural = '';
if (type === 'articles') typePlural = 'articles';
else if (type === 'events') typePlural = 'events';
else if (type === 'agenda') typePlural = 'agenda'; // pas de changement ici
console.log('type avant transformation:', type);

backLink.href = `manage.html?type=${typePlural}`;


if (!type || !id) {
  form.innerHTML = '<p class="error-message">Paramètres manquants.</p>';
  throw new Error('Paramètres manquants');
}

// Fonction pour créer un champ label + input
function createField(labelText, typeInput, name, value = '') {
  const wrapper = document.createElement('div');

  const label = document.createElement('label');
  label.htmlFor = name;
  label.textContent = labelText;

  let input;
  if (typeInput === 'textarea') {
    input = document.createElement('textarea');
  } else {
    input = document.createElement('input');
    input.type = typeInput;
  }
  input.id = name;
  input.name = name;
  input.value = value;

  wrapper.appendChild(label);
  wrapper.appendChild(input);

  return wrapper;
}

// Charger les données existantes
async function loadData() {
  let url = '';

  if (type === 'article') url = `http://localhost:3000/article/${id}`;
  else if (type === 'event') url = `http://localhost:3000/event/${id}`;
  else if (type === 'agenda') url = `http://localhost:3000/agenda/${id}`;
  else {
    form.innerHTML = '<p class="error-message">Type inconnu.</p>';
    return;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) {
      form.innerHTML = '<p class="error-message">Élément introuvable.</p>';
      return;
    }
    const data = await res.json();

    form.innerHTML = ''; // Vide le formulaire

    // Selon le type on injecte les champs
    if (type === 'articles') {
      form.appendChild(createField('Titre', 'text', 'Title', data.Title));
      form.appendChild(createField('Description', 'textarea', 'description', data.description));
      // Optionnel : ajout upload image si tu veux
    } else if (type === 'events') {
      form.appendChild(createField('Titre', 'text', 'title', data.title));
      form.appendChild(createField('Date', 'date', 'date', data.date ? data.date.slice(0,10) : ''));
      form.appendChild(createField('Description', 'textarea', 'description', data.description || ''));
    } else if (type === 'agenda') {
      form.appendChild(createField('Événement', 'text', 'event', data.event));
      form.appendChild(createField('Date', 'date', 'date', data.date ? data.date.slice(0,10) : ''));
    }

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Enregistrer';
    form.appendChild(submitBtn);

  } catch (err) {
    console.error(err);
    form.innerHTML = '<p class="error-message">Erreur réseau.</p>';
  }
}

// Gestion de la soumission du formulaire
form.addEventListener('submit', async e => {
  e.preventDefault();

  // Récupérer les données du formulaire
  const formData = new FormData(form);
  let body = {};

  for (const [key, value] of formData.entries()) {
    body[key] = value;
  }

  try {
    const token = getCookie('token');
    const url = `http://localhost:3000/admin/${type}/${id}`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const error = await res.json();
      alert(`Erreur : ${error.message || 'Impossible de modifier.'}`);
      return;
    }

    alert('Modification réussie !');
    // Retour à la page gestion
    window.location.href = `manage.html?type=${type}`;
  } catch (err) {
    console.error(err);
    alert('Erreur réseau lors de la modification.');
  }
});

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Chargement initial
loadData();
