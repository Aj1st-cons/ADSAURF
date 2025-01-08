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
const mediaQuery = window.matchMedia("(max-width: 600px)");

// Function to handle the position adjustment
function adjustWhatsAppIcon(e) {
  if (e.matches) {
    // Centered max-width adjustment for smaller screens
    const windowWidth = window.innerWidth;
    const maxWidth = 600;

    // Calculate left offset for centered alignment
    const leftOffset = (windowWidth - maxWidth) / 2;

    if (leftOffset > 0) {
      whatsappIcon.style.right = 'auto';
      whatsappIcon.style.left = `${leftOffset + maxWidth - 60}px`; // Align to the edge of the max-width area
    } else {
      whatsappIcon.style.right = '1px'; // Default position when screen width is less than max-width
      whatsappIcon.style.left = 'auto';
    }
  } else {
    // Restore position for larger screens
    whatsappIcon.style.right = '1px';
    whatsappIcon.style.left = 'auto';
  }
}

// Initial adjustment
adjustWhatsAppIcon(mediaQuery);

// Listen for changes in the viewport size
mediaQuery.addEventListener('change', adjustWhatsAppIcon);

// Ensure adjustment when resizing the browser
window.addEventListener('resize', () => adjustWhatsAppIcon(mediaQuery));
