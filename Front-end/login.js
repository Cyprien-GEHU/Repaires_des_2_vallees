const form = document.getElementById('login-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      // Redirection vers acceuil.html si la connexion réussit
      document.cookie = `token=${data.token}`
      window.location.href = 'acceuil.html';
    } else {
      // Affiche un message d'erreur et reste sur la même page
      alert('Erreur : ' + data.message);
    }
  } catch (err) {
    console.error('Erreur réseau :', err);
    alert('Erreur de connexion au serveur.');
  }
});
