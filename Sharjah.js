function createSharjahPopup() {
  // Create a container for the Sharjah popup
  const SharjahPopup = document.createElement('div');
  SharjahPopup.id = 'Sharjah';
  SharjahPopup.className = 'popup';

  // Add the inner HTML for the Sharjah popup
  SharjahPopup.innerHTML = `
    <div class="popup-header">
      <a href="javascript:void(0);" onclick="closePopup()" class="close-link">Close</a>
      <p class="popup-title">Select the city in Sharjah</p>
      <hr>
    </div>
    <div class="popup-content">
      <a href="javascript:void(0);" onclick="openPopup('AlNadah')">Al Nadah</a>
      <a href="javascript:void(0);" onclick="openPopup('Buhairah)">Buhairah</a>
      <a href="javascript:void(0);" onclick="openPopup('AlTawun')">Al Tawun</a>
    </div>
  `;

  // Append the popup to the body or another container
  document.body.appendChild(SharjahPopup);
}

// Example usage
document.addEventListener('DOMContentLoaded', () => {
  createSharjahPopup();
});
