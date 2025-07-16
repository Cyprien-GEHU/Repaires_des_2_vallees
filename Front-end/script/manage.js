// Récupère le paramètre type dans l'URL
function getTypeFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('type') || 'articles';
}


const type = getTypeFromUrl();
let typePlural = '';
if (type === 'articles') typePlural = 'article';
else if (type === 'events') typePlural = 'event';
else if (type === 'agenda') typePlural = 'agenda';
const addButton = document.getElementById('add-button');
console.log('Type récupéré :', type, 'Type pluriel :', typePlural);

if (type === 'articles' || type === 'events' || type === 'agenda') {
  const typeForCreate = type === 'articles' ? 'article' : type === 'events' ? 'event' : 'agenda';
  addButton.href = `create.html?type=${typeForCreate}`;
  addButton.textContent = `Ajouter un ${typeForCreate === 'article' ? 'article' : typeForCreate === 'event' ? 'événement' : 'élément d\'agenda'}`;
} else {
  addButton.style.display = 'none';
}


const pageTitle = document.getElementById('page-title');
const container = document.getElementById('items-container');

function showMessage(msg) {
  container.innerHTML = `<p>${msg}</p>`;
}

function createItemElement(item) {
  const div = document.createElement('div');
  div.classList.add('item');

  let innerHTML = '';
  if (type === 'articles') {
    innerHTML = `
      <h3>${item.Title}</h3>
      <p>${item.description}</p>
      <p><strong>ID :</strong> ${item._id}</p>
      ${item.image ? `<img src="/uploads/${item.image}" alt="Image de l'article" />` : ''}
    `;
  } else if (type === 'events') {
    innerHTML = `
      <h3>${item.Title}</h3>
      <p><strong>Date :</strong> ${new Date(item.day).toLocaleDateString()}</p>
      <p>${item.description || ''}</p>
      <p><strong>ID :</strong> ${item._id}</p>
    `;
  } else if (type === 'agenda') {
    innerHTML = `
      <h3>${item.Title}</h3>
      <p><strong>Date :</strong> ${item.day}</p>
      <p><strong>Description :</strong> ${item.description || 'Aucune description'}</p>
      <p><strong>prix :</strong> ${item.price || 'Gratuit'}</p>
      <p><strong>ID :</strong> ${item._id}</p>
    `;
  }

  div.innerHTML = innerHTML;

  // Boutons modifier / supprimer
  const btnContainer = document.createElement('div');
  btnContainer.classList.add('item-buttons');

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Modifier';
  editBtn.classList.add('edit-btn');
  editBtn.addEventListener('click', () => {
    // Redirection vers la page d'édition avec id et type
    window.location.href = `edit.html?type=${typePlural}&id=${item._id}`;
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Supprimer';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) return;

    try {
      const token = getCookie('token');
      const res = await fetch(`http://localhost:3000/admin/${type}/${item._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        const error = await res.json();
        alert(`Erreur : ${error.message || 'Impossible de supprimer.'}`);
        return;
      }

      alert('Élément supprimé avec succès !');
      loadItems(); // Recharge la liste après suppression
    } catch (err) {
      console.error(err);
      alert('Erreur réseau lors de la suppression.');
    }
  });

  btnContainer.appendChild(editBtn);
  btnContainer.appendChild(deleteBtn);
  div.appendChild(btnContainer);

  return div;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

async function loadItems() {
  pageTitle.textContent = type.charAt(0).toUpperCase() + type.slice(1);

  let url = '';

  if (type === 'articles') {
    url = 'http://localhost:3000/article';
  } else if (type === 'events') {
    url = 'http://localhost:3000/event';
  } else if (type === 'agenda') {
    url = 'http://localhost:3000/agenda';
  }

  try {
    const res = await fetch(url);
    if (!res.ok) {
      showMessage('Erreur lors du chargement des données.');
      return;
    }
    const items = await res.json();

    if (!items.length) {
      showMessage('Aucun élément trouvé.');
      return;
    }

    container.innerHTML = '';
    items.forEach(item => {
      container.appendChild(createItemElement(item));
    });
  } catch (err) {
    console.error(err);
    showMessage('Erreur réseau lors du chargement.');
  }
}

loadItems();
