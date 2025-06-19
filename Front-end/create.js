// Récupérer le type depuis l'URL
function getParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    type: params.get('type')
  };
}

const { type } = getParams();
const form = document.getElementById('create-form');
const backLink = document.getElementById('back-link');

// Lien de retour vers la page manage
let typePlural = '';
if (type === 'article') typePlural = 'articles';
else if (type === 'event') typePlural = 'events';
else if (type === 'agenda') typePlural = 'agenda';

backLink.href = `manage.html?type=${typePlural}`;

if (!type) {
  form.innerHTML = '<p class="error-message">Type manquant dans l’URL.</p>';
  throw new Error('Type manquant');
}

// Fonction pour créer un champ input ou textarea
function createField(labelText, typeInput, name) {
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

  wrapper.appendChild(label);
  wrapper.appendChild(input);
  return wrapper;
}

// Fonction pour créer un champ select avec les jours de la semaine
function createDaySelect(labelText, name) {
  const wrapper = document.createElement('div');

  const label = document.createElement('label');
  label.htmlFor = name;
  label.textContent = labelText;

  const select = document.createElement('select');
  select.name = name;
  select.id = name;

  const jours = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'];
  jours.forEach(jour => {
    const option = document.createElement('option');
    option.value = jour;
    option.textContent = jour.charAt(0).toUpperCase() + jour.slice(1);
    select.appendChild(option);
  });

  wrapper.appendChild(label);
  wrapper.appendChild(select);
  return wrapper;
}

// Créer les champs dynamiquement selon le type
if (type === 'article') {
  form.appendChild(createField('Titre', 'text', 'Title'));
  form.appendChild(createField('Description', 'textarea', 'description'));
} else if (type === 'event') {
  form.appendChild(createField('Titre', 'text', 'Title'));
  form.appendChild(createField('Date', 'date', 'day'));
  form.appendChild(createField('Description', 'textarea', 'description'));
} else if (type === 'agenda') {
  form.appendChild(createField('Événement', 'text', 'Title'));
  form.appendChild(createField('Price', 'number', 'price'));
  form.appendChild(createDaySelect('Jour de la semaine', 'day'));
} else {
  form.innerHTML = '<p class="error-message">Type invalide.</p>';
  throw new Error('Type invalide');
}

// ➕ Champ image (pour article et event uniquement)
if (type === 'article' || type === 'event') {
  const wrapper = document.createElement('div');
  const label = document.createElement('label');
  label.htmlFor = 'image';
  label.textContent = 'Image (optionnelle)';
  const input = document.createElement('input');
  input.type = 'file';
  input.name = 'image';
  input.id = 'image';
  input.accept = 'image/*';
  wrapper.appendChild(label);
  wrapper.appendChild(input);
  form.appendChild(wrapper);
}

// Bouton de soumission
const submitBtn = document.createElement('button');
submitBtn.type = 'submit';
submitBtn.textContent = 'Ajouter';
form.appendChild(submitBtn);

// Gestion de la soumission
form.addEventListener('submit', async e => {
  e.preventDefault();

  const token = getCookie('token');
  const imageFile = document.getElementById('image')?.files[0];
  const formData = new FormData(form);

  // Si pas d'image, supprimer le champ vide
  if (!imageFile) {
    formData.delete('image');
  }

  try {
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    };

    const res = await fetch(`http://localhost:3000/admin/${type}`, options);

    if (!res.ok) {
      const error = await res.json();
      alert(`Erreur : ${error.message || 'Création impossible.'}`);
      return;
    }

    alert('Création réussie !');
    window.location.href = `manage.html?type=${typePlural}`;
  } catch (err) {
    console.error(err);
    alert('Erreur réseau lors de la création.');
  }
});

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
