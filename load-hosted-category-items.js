document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("category-items");
  fetch("https://adsaurf.pages.dev/hosted-category-items.html")
    .then(response => response.text())
    .then(html => {
      container.innerHTML = html;
    })
    .catch(error => console.error("Error loading items:", error));
});
