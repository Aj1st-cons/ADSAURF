document.addEventListener('DOMContentLoaded', () => {
  // Main container for categories
  const mainContainer = document.createElement('div');
  mainContainer.classList.add('main-containerA1');

  // Category container
  const categoryContainer = document.createElement('div');
  categoryContainer.classList.add('category-containerA1');

  // Categories array to dynamically generate category blocks
  const categories = [
    {
      image: 'https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1733977371928.png?v=1734156081',
      text: 'MOBILE PHONES',
      id: 1
    },
    {
      image: 'https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1733985875402.png?v=1734160126',
      text: 'TABLETS',
      id: 2
    },
    {
      image: 'https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1733977371928.png?v=1734156081',
      text: 'MOBILE PHONES',
      id: 3
    },
    {
      image: 'https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1733985875402.png?v=1734160126',
      text: 'TABLETS',
      id: 4
    },
    {
      image: 'https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1733977371928.png?v=1734156081',
      text: 'MOBILE PHONES',
      id: 5
    },
    {
      image: 'https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1733985875402.png?v=1734160126',
      text: 'TABLETS',
      id: 6
    },
    {
      image: 'https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1733977371928.png?v=1734156081',
      text: 'MOBILE PHONES',
      id: 7
    },
    {
      image: 'https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1733985875402.png?v=1734160126',
      text: 'TABLETS',
      id: 8
    }
  ];

  // Dynamically create category blocks
  categories.forEach(category => {
    const categoryElement = document.createElement('div');
    categoryElement.classList.add('categoryA1');
    categoryElement.setAttribute('onclick', `openpopupA1(${category.id})`);

    const img = document.createElement('img');
    img.setAttribute('src', category.image);
    img.setAttribute('alt', `categoryA1 ${category.id}`);

    const textDiv = document.createElement('div');
    textDiv.classList.add('categoryA1-text');
    textDiv.textContent = category.text;

    categoryElement.appendChild(img);
    categoryElement.appendChild(textDiv);
    categoryContainer.appendChild(categoryElement);
  });

  mainContainer.appendChild(categoryContainer);
  document.body.appendChild(mainContainer);

  // Overlay for background dimming
  const overlay = document.createElement('div');
  overlay.classList.add('overlayA1');
  overlay.setAttribute('id', 'overlayA1');
  overlay.setAttribute('onclick', 'closepopupA1()');
  document.body.appendChild(overlay);

  // Popup template
  const popup = document.createElement('div');
  popup.classList.add('popupA1');
  popup.setAttribute('id', 'popupA1');

  const imagesContainer = document.createElement('div');
  imagesContainer.classList.add('images-containerA1');
  imagesContainer.setAttribute('id', 'popupA1-images-containerA1');
  popup.appendChild(imagesContainer);
  document.body.appendChild(popup);
});

// Example of the openpopupA1 and closepopupA1 functions
function openpopupA1(id) {
  const popup = document.getElementById('popupA1');
  const overlay = document.getElementById('overlayA1');
  
  // Add dynamic content to the popup based on category id
  const imagesContainer = document.getElementById('popupA1-images-containerA1');
  imagesContainer.innerHTML = `<p>Content for category ${id}</p>`;
  
  popup.style.display = 'block';
  overlay.style.display = 'block';
}

function closepopupA1() {
  const popup = document.getElementById('popupA1');
  const overlay = document.getElementById('overlayA1');
  
  popup.style.display = 'none';
  overlay.style.display = 'none';
}



        const categoryA1Data = {
            1: [
                { img: "https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1733977371928.png?v=1734156081", text: "Samsung Fold Z6", link: "https://adsaurf.com" },
                { img: "https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1733977371928.png?v=1734156081", text: "Samsung Fold Z6", link: "https://adsaurf.com" }                
            ],
            2: [
                { img: "https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1733985875402.png?v=1734160126", text: "iPad Pro", link: "https://adsaurf.com" }
            ],
            3: [
                { img: "https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1733977371928.png?v=1734156081", text: "Samsung Fold Z6", link: "https://adsaurf.com" }
            ],
            4: [
                { img: "https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1733985875402.png?v=1734160126", text: "iPad Pro", link: "https://adsaurf.com" }
            ],
            5: [
                { img: "https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1733977371928.png?v=1734156081", text: "Samsung Fold Z6", link: "https://adsaurf.com" },
                { img: "https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1733977371928.png?v=1734156081", text: "Samsung Fold Z6", link: "https://adsaurf.com" }                
            ],
            6: [
                { img: "https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1733985875402.png?v=1734160126", text: "iPad Pro", link: "https://adsaurf.com" }
            ],
            7: [
                { img: "https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1733977371928.png?v=1734156081", text: "Samsung Fold Z6", link: "https://adsaurf.com" }
            ],
            8: [
                { img: "https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1733985875402.png?v=1734160126", text: "iPad Pro", link: "https://adsaurf.com" }
            ],            
        };

        function openpopupA1(categoryA1Id) {
            const popupA1 = document.getElementById("popupA1");
            const overlay = document.getElementById("overlayA1");
            const imagesContainer = document.getElementById("popupA1-images-containerA1");

            // Clear previous popupA1 content
            imagesContainer.innerHTML = "";

            // Populate popupA1 with categoryA1-specific items
            categoryA1Data[categoryA1Id].forEach(item => {
                const a = document.createElement("a");
                a.href = item.link;
                a.target = "_blank";

                const img = document.createElement("img");
                img.src = item.img;
                img.alt = item.text;

                const text = document.createElement("div");
                text.classList.add("popupA1-text");
                text.innerText = item.text;

                a.appendChild(img);
                a.appendChild(text);
                imagesContainer.appendChild(a);
            });

            const categoryA1Rect = document.querySelectorAll(".categoryA1")[categoryA1Id - 1].getBoundingClientRect();
            const isRightSide = categoryA1Rect.left + 200 > window.innerWidth; // Check if popupA1 overflows
            popupA1.style.top = `${categoryA1Rect.top + window.scrollY}px`;
            popupA1.style.left = isRightSide
                ? `${categoryA1Rect.right - 200}px` // Align to right edge if overflowing
                : `${categoryA1Rect.left}px`; // Align to left edge

            // Show popupA1 and overlay
            popupA1.style.display = "block";
            overlay.style.display = "block";
        }

        function closepopupA1() {
            const popupA1 = document.getElementById("popupA1");
            const overlay = document.getElementById("overlayA1");
            popupA1.style.display = "none";
            overlay.style.display = "none"; // Hide overlay
        }
        
/* placeholder */   
document.addEventListener('DOMContentLoaded', () => {
  const placeholder = document.createElement('div');
  placeholder.id = 'category-placeholder';
  placeholder.innerText = 'Loading content...';
  
  placeholder.style.position = 'fixed';
  placeholder.style.top = '0';
  placeholder.style.left = '0';
  placeholder.style.width = '100%';
  placeholder.style.backgroundColor = '#009500';
  placeholder.style.color = '#fff';
  placeholder.style.padding = '10px';
  placeholder.style.textAlign = 'center';
  placeholder.style.zIndex = '1000';
  
  document.body.appendChild(placeholder);

  setTimeout(() => {
    placeholder.innerText = 'Content Loaded!';
  }, 2000);
});
