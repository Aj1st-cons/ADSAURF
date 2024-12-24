function openPopup(popupId) {
        
document.getElementById('overlay').style.display = 'block';  
            document.getElementById(popupId).style.display = 'block';
        }

        function closePopup(popupId) {
        
document.getElementById('overlay').style.display = 'none';                
            document.querySelectorAll('.popup').forEach(popup => {
                popup.style.display = 'none';
            });
        }

        function goBack(currentPopupId, previousPopupId) {
            document.getElementById(currentPopupId).style.display = 'none';
            document.getElementById(previousPopupId).style.display = 'block';
        }
        
        
              document.querySelector('.location-button').addEventListener('click', () => {
      const menu = document.querySelector('.location-menu');
      const overlay = document.querySelector('.dim-overlay');
      const isMenuVisible = menu.style.display === 'block';

      // Toggle the menu and dimmed background
      menu.style.display = isMenuVisible ? 'none' : 'block';
      overlay.style.display = isMenuVisible ? 'none' : 'block';
    });

    // Close the menu when the dimmed background is clicked
    document.querySelector('.dim-overlay').addEventListener('click', () => {
      const menu = document.querySelector('.location-menu');
      const overlay = document.querySelector('.dim-overlay');
      menu.style.display = 'none';
      overlay.style.display = 'none';
    });

    // Sliding cards logic
    const cards = document.querySelectorAll('.card');
    let currentIndex = 0;

    // Activate the first card immediately
    window.onload = () => {
      if (cards.length > 0) {
        cards[0].classList.add('active');
      }
    };

    setInterval(() => {
      // Remove 'active' class from all cards
      cards.forEach(card => card.classList.remove('active'));

      // Add 'active' class to the current card
      cards[currentIndex].classList.add('active');

      // Increment the index for the next card (loop back to 0 after last card)
      currentIndex = (currentIndex + 1) % cards.length;
    }, 1000); // Faster interval (2 seconds)