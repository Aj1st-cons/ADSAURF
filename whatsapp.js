// Create the floating WhatsApp icon
const whatsappIcon = document.createElement('div');
whatsappIcon.style.position = 'fixed';
whatsappIcon.style.bottom = '20%';
whatsappIcon.style.right = '1px';
whatsappIcon.style.width = '60px';
whatsappIcon.style.height = '60px';
whatsappIcon.style.backgroundColor = '';
whatsappIcon.style.borderRadius = '0';
whatsappIcon.style.display = 'flex';
whatsappIcon.style.justifyContent = 'center';
whatsappIcon.style.alignItems = 'center';
whatsappIcon.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0)';
whatsappIcon.style.cursor = 'pointer';
whatsappIcon.style.zIndex = '1000';

// Add an image to the icon
const whatsappImage = document.createElement('img');
whatsappImage.src = 'https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1736252219893.png?v=1736252784'; // Replace with your image link
whatsappImage.alt = 'WhatsApp Icon';
whatsappImage.style.width = '100%';
whatsappImage.style.height = '100%';
whatsappImage.style.borderRadius = '0';
whatsappIcon.appendChild(whatsappImage);

// Add click functionality to open WhatsApp
whatsappIcon.addEventListener('click', () => {
  const phoneNumber = '+971509880960';
  
  const whatsappUrl = `https://wa.me/${phoneNumber}`;
  window.open(whatsappUrl, '_blank');
});

// Add the WhatsApp icon to the body of the document
document.body.appendChild(whatsappIcon);

// Define the media query
const mediaQuery = window.matchMedia("(min-width: 768px)");

// Function to adjust the position of the WhatsApp icon
function adjustWhatsAppIconPosition(e) {
  if (e.matches) {
    // Viewport width is 768px or wider
    const windowWidth = window.innerWidth;
    const iconPositionFromCenter = 260; // Distance from the center
    const centerPosition = windowWidth / 2;

    // Position the icon 280px to the right of the center
    whatsappIcon.style.left = `${centerPosition + iconPositionFromCenter}px`;
    whatsappIcon.style.right = 'auto'; // Disable right positioning
  } else {
    // Viewport width is less than 768px, reset to default
    whatsappIcon.style.right = '1px';
    whatsappIcon.style.left = 'auto';
  }
}

// Initial adjustment
adjustWhatsAppIconPosition(mediaQuery);

// Listen for viewport changes
mediaQuery.addEventListener('change', adjustWhatsAppIconPosition);

// Ensure adjustment when resizing the browser
window.addEventListener('resize', () => adjustWhatsAppIconPosition(mediaQuery));
