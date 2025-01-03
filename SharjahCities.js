
/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
function createIndustrialPopup() {
  // Create a container for the city1 popup
  const IndustrialPopup = document.createElement('div');
  IndustrialPopup.id = 'Industrial';
  IndustrialPopup.className = 'popup';

  // Add the inner HTML for the city1 popup
  IndustrialPopup.innerHTML = `
    <div class="popup-header">
      <a href="javascript:void(0);" onclick="goBack('Industrial', 'Sharjah')" class="close-link">Back</a>
      <p class="popup-title">Select area</p>
      <hr>
    </div>
    <div class="popup-content">
<a href="https://adsaurf.com/pages/shj-ind">Industrial Area - 1</a>
<a href="https://adsaurf.com/pages/shj-ind">Industrial Area - 2</a>
<a href="https://adsaurf.com/pages/shj-ind">Industrial Area - 3</a>
<a href="https://adsaurf.com/pages/shj-ind">Industrial Area - 4</a>
<a href="https://adsaurf.com/pages/shj-ind">Industrial Area - 5</a>
<a href="https://adsaurf.com/pages/shj-ind">Industrial Area - 6</a>
<a href="https://adsaurf.com/pages/shj-ind">Industrial Area - 7</a>
<a href="https://adsaurf.com/pages/shj-ind">Industrial Area - 8</a>
<a href="https://adsaurf.com/pages/shj-ind">Industrial Area - 9</a>
<a href="https://adsaurf.com/pages/shj-ind">Industrial Area - 10</a>
    </div>
  `;

  // Append the popup to the body or another container
  document.body.appendChild(IndustrialPopup);
}

// Example usage
document.addEventListener('DOMContentLoaded', () => {
  createIndustrialPopup();
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

