function createAbuDhabiPopup() {
  // Create a container for the Abudhabi popup
  const AbuDhabiPopup = document.createElement('div');
  AbuDhabiPopup.id = 'Abudhabi';
  AbuDhabiPopup.className = 'popup';

  // Add the inner HTML for the Abudhabi popup
  AbuDhabiPopup.innerHTML = `
    <div class="popup-header">
      <a href="javascript:void(0);" onclick="closePopup()" class="close-link">Close</a>
      <p class="popup-title">Select the city in Abu Dhabi</p>
      <hr>
    </div>
    <div class="popup-content">
      <a href="javascript:void(0);" onclick="openPopup('city1')">City 1</a>
      <a href="javascript:void(0);" onclick="openPopup('city2')">City 2</a>
    </div>
  `;

  // Append the popup to the body or another container
  document.body.appendChild(AbuDhabiPopup);
}

// Example usage
document.addEventListener('DOMContentLoaded', () => {
  createAbuDhabiPopup();
});
