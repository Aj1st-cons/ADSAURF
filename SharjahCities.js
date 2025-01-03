
/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
function createAlNadahPopup() {
  // Create a container for the city1 popup
  const AlNadahPopup = document.createElement('div');
  AlNadahPopup.id = 'AlNadah';
  AlNadahPopup.className = 'popup';

  // Add the inner HTML for the city1 popup
  AlNadahPopup.innerHTML = `
    <div class="popup-header">
      <a href="javascript:void(0);" onclick="goBack('AlNadah', 'Sharjah')" class="close-link">Back</a>
      <p class="popup-title">Select area</p>
      <hr>
    </div>
    <div class="popup-content">
<a href="https://adsaurf.com/pages/shj-nadah">AlNadah - Nadah Park</a>
<a href="https://AlNadah-area2.com">AlNadah - Safeer mall</a>
    </div>
  `;

  // Append the popup to the body or another container
  document.body.appendChild(AlNadahPopup);
}

// Example usage
document.addEventListener('DOMContentLoaded', () => {
  createAlNadahPopup();
});

/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
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


/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */

