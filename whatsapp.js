// Create the floating WhatsApp icon
const whatsappIcon = document.createElement('div');
whatsappIcon.style.position = 'fixed';
whatsappIcon.style.bottom = '25%';
whatsappIcon.style.right = '20px';
whatsappIcon.style.width = '80px';
whatsappIcon.style.height = '80px';
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
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(whatsappUrl, '_blank');
});

// Add the WhatsApp icon to the body of the document
document.body.appendChild(whatsappIcon);
