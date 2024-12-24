function createCity2Popup() {
  // Create a container for the popup
  const city2Popup = document.createElement('div');
  city2Popup.id = 'city2';
  city2Popup.className = 'popup';

  // Add the popup's inner HTML
  city2Popup.innerHTML = `
    <div class="popup-header">
      <a href="javascript:void(0);" onclick="goBack('city2', 'Abudhabi')" class="close-link">Back</a>
      <p class="popup-title">Select area</p>
      <hr>
    </div>
    <div class="popup-content">
<a href="https://city2-area1.com">City 2 - Area 1</a>
<a href="https://city2-area2.com">City 2 - Area 2</a>
<a href="https://city2-area3.com">City 2 - Area 3</a>
    </div>
  `;

  // Append the popup to the body
  document.body.appendChild(city2Popup);
}

// Popup utility function to handle navigation
function goBack(currentPopupId, parentPopupId) {
  // Hide the current popup
  document.getElementById(currentPopupId).style.display = 'none';

  // Show the parent popup
  document.getElementById(parentPopupId).style.display = 'block';
}

// Example usage
document.addEventListener('DOMContentLoaded', () => {
  createCity2Popup();
});

/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */

function createCity1Popup() {
  // Create a container for the city1 popup
  const city1Popup = document.createElement('div');
  city1Popup.id = 'city1';
  city1Popup.className = 'popup';

  // Add the inner HTML for the city1 popup
  city1Popup.innerHTML = `
    <div class="popup-header">
      <a href="javascript:void(0);" onclick="goBack('city1', 'Abudhabi')" class="close-link">Back</a>
      <p class="popup-title">Select area</p>
      <hr>
    </div>
    <div class="popup-content">
<a href="https://city1-area1.com">City 1 - Area 1</a>
<a href="https://city1-area2.com">City 1 - Area 2</a>
    </div>
  `;

  // Append the popup to the body or another container
  document.body.appendChild(city1Popup);
}

// Example usage
document.addEventListener('DOMContentLoaded', () => {
  createCity1Popup();
});

/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */

