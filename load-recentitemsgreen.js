// loadItems.js
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("vertical-items");

  // Fetch items.html file and load its content into the container
  fetch('https://adsaurf.pages.dev/recentitemsgreen.html')
    .then(response => response.text())
    .then(data => {
      container.innerHTML = data;
    })
    .catch(error => {
      console.error('Error loading items:', error);
    });
});
