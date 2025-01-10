document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("home-hz-items");
  fetch("https://adsaurf.pages.dev/home-hz-items.html")
    .then(response => response.text())
    .then(html => {
      container.innerHTML = html;
    })
    .catch(error => console.error("Error loading items:", error));
});
