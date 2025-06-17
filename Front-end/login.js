const form = document.getElementById('login-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });


    const data = await response.json();
    if (response.ok) {
      alert('Connexion réussie !');
      // Redirection ou stockage d'un token peut se faire ici
      // window.location.href = "/dashboard.html";
    } else {
      alert('Erreur : ' + data.message);
    }
  } catch (err) {
    console.error('Erreur réseau :', err);
    alert('Erreur de connexion au serveur.');
  }
});
