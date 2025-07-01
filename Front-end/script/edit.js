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

let typePlural = '';
if (type === 'article') typePlural = 'articles';
else if (type === 'event') typePlural = 'events';
else if (type === 'agenda') typePlural = 'agenda';

backLink.href = `manage.html?type=${typePlural}`;

if (!type || !id) {
  form.innerHTML = '<p class="error-message">Paramètres manquants.</p>';
  throw new Error('Paramètres manquants');
}

function createField(labelText, typeInput, name, value = '') {
  const wrapper = document.createElement('div');

  const label = document.createElement('label');
  label.htmlFor = name;
  label.textContent = labelText;

  let input;
  if (typeInput === 'textarea') {
    input = document.createElement('textarea');
    input.value = value;
  } else {
    input = document.createElement('input');
    input.type = typeInput;
    if (typeInput !== 'file') input.value = value;
  }

  input.id = name;
  input.name = name;

  wrapper.appendChild(label);
  wrapper.appendChild(input);

  return wrapper;
}

function createCategorySelect(labelText, name, selectedValue = '') {
  const wrapper = document.createElement('div');

  const label = document.createElement('label');
  label.htmlFor = name;
  label.textContent = labelText;

  const select = document.createElement('select');
  select.id = name;
  select.name = name;

  const categories = ['3-6 ans', '6-12 ans', '12-18 ans', 'periscolaire'];
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    if (cat === selectedValue) option.selected = true;
    select.appendChild(option);
  });

  wrapper.appendChild(label);
  wrapper.appendChild(select);
  return wrapper;
}


function createSelectField(labelText, name, selectedValue = '') {
  const wrapper = document.createElement('div');

  const label = document.createElement('label');
  label.htmlFor = name;
  label.textContent = labelText;

  const select = document.createElement('select');
  select.id = name;
  select.name = name;

  const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  days.forEach(day => {
    const option = document.createElement('option');
    option.value = day;
    option.textContent = day.charAt(0).toUpperCase() + day.slice(1);
    if (day === selectedValue) option.selected = true;
    select.appendChild(option);
  });

  wrapper.appendChild(label);
  wrapper.appendChild(select);

  return wrapper;
}

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

    form.innerHTML = '';

    if (type === 'article') {
      form.appendChild(createField('Titre', 'text', 'Title', data.Title));
      form.appendChild(createField('Description', 'textarea', 'description', data.description));
      form.appendChild(createCategorySelect('Catégorie', 'categorie', data.categorie || ''));
    } else if (type === 'event') {
      form.appendChild(createField('Titre', 'text', 'Title', data.Title));
      form.appendChild(createField('Date', 'date', 'day', data.day ? data.day.slice(0, 10) : ''));
      form.appendChild(createField('Description', 'textarea', 'description', data.description || ''));
    } else if (type === 'agenda') {
      form.appendChild(createField('Événement', 'text', 'Title', data.Title));
      form.appendChild(createField('Price', 'number', 'price', data.price || ''));
      form.appendChild(createField('Description', 'textarea', 'description', data.description || ''));
      form.appendChild(createSelectField('Jour de la semaine', 'day', data.day));
    }

    // ➕ Champ image pour article et event
    if (type === 'article' || type === 'event') {
      form.appendChild(createField('Image (optionnelle)', 'file', 'image'));
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

form.addEventListener('submit', async e => {
  e.preventDefault();

  const token = getCookie('token');
  const formData = new FormData(form);
  const imageFile = document.getElementById('image')?.files[0];

  if (!imageFile) {
    formData.delete('image'); // Empêche l'envoi d'un champ vide
  }

  try {
    const url = `http://localhost:3000/admin/${type}/${id}`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
        // Ne pas définir Content-Type si on utilise FormData
      },
      body: formData
    });

    if (!res.ok) {
      const error = await res.json();
      alert(`Erreur : ${error.message || 'Impossible de modifier.'}`);
      return;
    }

    alert('Modification réussie !');
    window.location.href = `manage.html?type=${typePlural}`;
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

loadData();
