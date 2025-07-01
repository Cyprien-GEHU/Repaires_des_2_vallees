const params = new URLSearchParams(window.location.search);
const file = params.get("file");

const iframe = document.getElementById("pdf-frame");
const downloadLink = document.getElementById("download-link");

if (!file) {
  document.body.innerHTML = "<p style='color:red; padding: 20px;'>Aucun fichier PDF spécifié dans l’URL.</p>";
} else {
  const filePath = `pdf/${file}`;
  iframe.src = filePath;
  downloadLink.href = filePath;
}
