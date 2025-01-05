// Create a function to dynamically generate the content
function generateRecentItems() {
  const body = document.body;
  body.style.margin = '0';
  body.style.padding = '0';
  body.style.backgroundColor = '#f5f5f5';

  const recentContainer = document.createElement('div');
  recentContainer.className = 'recent-container';
  recentContainer.style.background = '#fff';
  recentContainer.style.padding = '5px';

  const heading = document.createElement('h1');
  heading.textContent = 'recently added items ..';
  heading.className = 'center-h1';
  heading.style.textAlign = 'left';
  heading.style.fontWeight = 'bold';
  heading.style.fontSize = '16px';
  heading.style.marginLeft = '50px';
  heading.style.marginTop = '5px';
  heading.style.marginBottom = '20px';
  recentContainer.appendChild(heading);

  const verticalContainer = document.createElement('div');
  verticalContainer.className = 'vertical-container';
  verticalContainer.style.display = 'grid';
  verticalContainer.style.gridTemplateColumns = 'repeat(3, 125px)';
  verticalContainer.style.gridAutoRows = '150px';
  verticalContainer.style.gap = '0px';
  verticalContainer.style.padding = '0px';
  verticalContainer.style.margin = '0 10px';

  // Apply desktop-specific styles
function applyDesktopStyles() {
    if (window.matchMedia('(min-width: 768px)').matches) {
        verticalContainer.style.justifyContent = 'center'; 
        heading.style.textAlign = 'center';
        heading.style.marginLeft = '0';
    } else {
        verticalContainer.style.justifyContent = ''; 
        heading.style.textAlign = 'left';
        heading.style.marginLeft = '50px';
    }
}

// Call the function on load and resize
window.addEventListener('resize', applyDesktopStyles);
applyDesktopStyles();

  const items = [
    { name: 'MOBILE PHONES', price: '1500 Dhs', img: 'https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1733977371928.png?v=1734156081' },
    { name: 'TABLETS', price: '', img: 'https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1733985875402.png?v=1734160126' },
    { name: 'LADIES FASHION', price: '', img: 'https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1733977132590.png?v=1734178547' },
    { name: 'MEN\'S FASHION', price: '', img: 'https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1733984179860.png?v=1734161963' },
    { name: 'KIDS FASHION', price: '', img: 'https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1734022393725.png?v=1734161958' },
    { name: 'LAPTOPS', price: '', img: 'https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1733995545933.png?v=1734160114' },
    { name: 'HOME APPLIANCES', price: '', img: 'https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1733996195377.png?v=1734168828' },
    { name: 'KITCHEN APPLIANCES', price: '', img: 'https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1733996745868.png?v=1734168852' },
    { name: 'FOR VEHICLES', price: '', img: 'https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1734005537299.png?v=1734005577' },
    { name: 'FOR BABIES', price: '', img: 'https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1734008191764.png?v=1734279094' },
  ];

  items.forEach(item => {
    const verticalItem = document.createElement('div');
    verticalItem.className = 'vertical-item';
    verticalItem.style.textAlign = 'center';
    verticalItem.style.width = '100px';
    verticalItem.style.height = '100px';

    const link = document.createElement('a');
    link.href = 'https://www.adsaurf.com';
    link.style.textDecoration = 'none';

    const imageSpace = document.createElement('div');
    imageSpace.className = 'image-space';
    imageSpace.style.width = '100px';
    imageSpace.style.height = '100px';
    imageSpace.style.display = 'inline-block';
    imageSpace.style.background = 'linear-gradient(to bottom right, #00950025, #ffffff)';
    imageSpace.style.margin = '0';
    imageSpace.style.borderRadius = '10px';

    const image = document.createElement('img');
    image.src = item.img;
    image.alt = item.name;
    image.style.width = '80%';
    image.style.height = '80%';
    image.style.display = 'block';
    image.style.margin = '0 auto';
    image.style.marginTop = '10px';
    imageSpace.appendChild(image);

    const name = document.createElement('div');
    name.className = 'name';
    name.textContent = item.name;
    name.style.fontSize = '9px';
    name.style.fontWeight = 'bold';
    name.style.color = '#1e90ff';
    name.style.marginTop = '5px';
    link.appendChild(imageSpace);
    link.appendChild(name);

    if (item.price) {
      const price = document.createElement('div');
      price.className = 'price';
      price.textContent = item.price;
      price.style.fontSize = '10px';
      price.style.fontWeight = 'bold';
      price.style.color = '#009500';
      price.style.marginTop = '5px';
      link.appendChild(price);
    }

    verticalItem.appendChild(link);
    verticalContainer.appendChild(verticalItem);
  });

  recentContainer.appendChild(verticalContainer);
  body.appendChild(recentContainer);
}

// Call the function to generate the content
generateRecentItems();


  // Function to dynamically insert the div and script
  function insertRecentItems(targetSelector) {
    // Select the target element where the script will be placed
    const targetElement = document.querySelector(targetSelector);

    if (targetElement) {
      // Create a container div
      const container = document.createElement('div');

      // Create the script element
      const script = document.createElement('script');
      script.src = "";
      script.defer = true;

      // Append the script to the container
      container.appendChild(script);

      // Insert the container into the target element
      targetElement.appendChild(container);
    } else {
      console.error(`Target element "${targetSelector}" not found.`);
    }
  }

  // Call the function and specify the target selector (e.g., "body" or ".target-class")
  insertRecentItems("#recentitemsplaceholder"); // Change "body" to your desired selector
