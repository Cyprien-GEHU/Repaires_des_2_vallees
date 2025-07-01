function toggleContact(id) {
  const infoDiv = document.getElementById(id);
  if (infoDiv.style.display === 'block') {
    infoDiv.style.display = 'none';
  } else {
    infoDiv.style.display = 'block';
  }
}

function copyText(elementId) {
  const text = document.getElementById(elementId).textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert('Copié : ' + text);
  }).catch(err => {
    console.error('Erreur de copie :', err);
    alert('Erreur lors de la copie.');
  });
}
