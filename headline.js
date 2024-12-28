document.addEventListener('DOMContentLoaded', () => {
  // Dynamically create the Google Fonts link
  const link = document.createElement('link');
  link.href = "https://fonts.googleapis.com/css2?family=Krona+One&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link); // Append the link to the <head> section

  // Function to create and append the section wherever you need it
  function createPlaceholder(container) {
    // Remove default margin and padding on the body and html elements to allow full-width container
    const style = document.createElement('style');
    style.textContent = `
      html, body {
        margin: 0;
        padding: 0;
        width: 100%;
      }
    `;
    document.head.appendChild(style);

    // Create the section element
    const section = document.createElement('section');
    section.style.textAlign = 'left';
    section.style.margin = '0'; // Remove any margin
    section.style.marginLeft = '-10px';
    section.style.padding = '10px'; // Adjust padding as needed
    section.style.background = '#009500';
    section.style.width = '100vw'; // Make the width 100% of the viewport
    section.style.boxSizing = 'border-box'; // Include padding in the total width

    // Create the h1 element
    const heading = document.createElement('h1');
    heading.style.fontSize = '0.7em';
    heading.style.textAlign = 'left';
    heading.style.color = '#fff';
    heading.style.lineHeight = '1.5';
    heading.style.marginTop = '-10px';
    heading.style.fontFamily = "'Krona One', sans-serif"; // Apply Krona One font

    // Create the ordered list (ol)
    const list = document.createElement('ol');

    // Add list items
    const items = [
      'Easy Selections',
      'Competitive Prices',
      '30 minutes area-wise & 48-Hours Normal Delivery',
      'Cash on Delivery!'
    ];

    items.forEach(text => {
      const listItem = document.createElement('li');
      listItem.textContent = text;
      list.appendChild(listItem);
    });

    // Append the list to the h1
    heading.appendChild(list);

    // Create the hr element
    const hr = document.createElement('hr');
    hr.style.width = '25%';
    hr.style.border = '1px solid white';
    hr.style.marginTop = '-5px';
    hr.style.marginLeft = '20px';
    hr.style.marginBottom = '-10px';
    hr.style.display = 'inline-block';

    // Append h1 and hr to the section
    section.appendChild(heading);
    section.appendChild(hr);

    // Append the section to the specified container
    container.appendChild(section);
  }

  // Example usage: 
  // Create the placeholder and place it in any element you want
  const container = document.querySelector('#placeholder-container'); // Replace with your container's ID or class
  if (container) {
    createPlaceholder(container);
  }
});
