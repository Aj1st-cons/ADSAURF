document.addEventListener("DOMContentLoaded", function () {
    // Function to insert a placeholder
    function insertPlaceholder(targetSelector, placeholderId) {
        const targetElement = document.querySelector(targetSelector);

        if (targetElement) {
            if (!document.getElementById(placeholderId)) {
                const placeholder = document.createElement("div");
                placeholder.id = placeholderId;
                targetElement.insertAdjacentElement("afterend", placeholder);
                console.log(`Placeholder with ID "${placeholderId}" inserted successfully.`);
                return placeholder;
            } else {
                console.warn(`Placeholder with ID "${placeholderId}" already exists.`);
                return document.getElementById(placeholderId);
            }
        } else {
            console.error(`Target element "${targetSelector}" not found.`);
            return null;
        }
    }

    // Insert the placeholder
    const placeholder = insertPlaceholder("#hrzcategory1");

    if (placeholder) {
        // Create and append a simple subcategory section inside the placeholder
        const subcategoryContainer = document.createElement("div");
        subcategoryContainer.className = "subcategory2-container";       

        const subCategory = document.createElement("div");
        subCategory.className = "sub-category";
        subCategory.innerHTML = `
            <span>Sub Category</span>
            <a href="https://adsaurf.com" target="_blank">View All</a>
        `;

        const horizontalContainer = document.createElement("div");
        horizontalContainer.className = "horizontal-container";

        const items = [
            { name: "MOBILE PHONES", img: "https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1733977371928.png?v=1734156081" },
            { name: "TABLETS", img: "https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1733985875402.png?v=1734160126" },
            { name: "LADIES FASHION", img: "https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1733977132590.png?v=1734178547" },
            { name: "MEN'S FASHION", img: "https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1733984179860.png?v=1734161963" },
            { name: "KIDS FASHION", img: "https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1734022393725.png?v=1734161958" },
            { name: "LAPTOPS", img: "https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1733995545933.png?v=1734160114" },
            { name: "HOME APPLIANCES", img: "https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1733996195377.png?v=1734168828" },
            { name: "KITCHEN APPLIANCES", img: "https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1733996745868.png?v=1734168852" },
            { name: "FOR VEHICLES", img: "https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1734005537299.png?v=1734005577" },
            { name: "FOR BABIES", img: "https://cdn.shopify.com/s/files/1/0702/6055/5812/files/1734008191764.png?v=1734279094" }
        ];


        items.forEach(item => {
            const horizontalItem = document.createElement("div");
            horizontalItem.className = "horizontal-item";
            horizontalItem.innerHTML = `
                <a href="https://www.adsaurf.com">
                    <div class="image-space">
                        <img src="${item.img}" alt="${item.name}">
                    </div>
                    <div class="name">${item.name}</div>
                </a>
            `;
            horizontalContainer.appendChild(horizontalItem);
        });

        subcategoryContainer.appendChild(subCategory);
        subcategoryContainer.appendChild(horizontalContainer);

        // Append subcategoryContainer to placeholder
        placeholder.appendChild(subcategoryContainer);
    }
});