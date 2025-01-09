// loadItems.js
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("vertical-container");

  // Fetch items.html file and load its content into the container
  fetch('items.html')
    .then(response => response.text())
    .then(data => {
      container.innerHTML = data;
    })
    .catch(error => {
      console.error('Error loading items:', error);
    });
});
