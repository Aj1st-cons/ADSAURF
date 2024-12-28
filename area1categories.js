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