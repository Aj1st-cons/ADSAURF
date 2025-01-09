document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("items-container");
  fetch("https://adsaurf.pages.dev/recentitemsgreen.html")
    .then(response => response.text())
    .then(html => {
      container.innerHTML = html;
    })
    .catch(error => console.error("Error loading items:", error));
});
