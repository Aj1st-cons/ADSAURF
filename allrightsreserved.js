    // Create a script to dynamically add the footer content
(function () {
    // Create a new div element
    const footerDiv = document.createElement("div");

    // Set the inner HTML for the footer
    footerDiv.innerHTML = `
        <p style="text-align:center; color:#000; margin-bottom: -20px; margin-top:10px;">
            <span style="font-family: 'Krona One', serif;">ADSAURF</span> ©2024<br> All Rights Reserved.
        </p>
    `;

    // Add a link to the Krona One font
    const fontLink = document.createElement("link");
    fontLink.href = "https://fonts.googleapis.com/css2?family=Krona+One&display=swap";
    fontLink.rel = "stylesheet";

    // Append the font link to the document head
    document.head.appendChild(fontLink);

    // Find the footer element
    const footer = document.querySelector("footer");

    // Insert the new footerDiv above the footer, or at the end if no footer exists
    if (footer) {
        footer.insertAdjacentElement("beforebegin", footerDiv);
    } else {
        document.body.appendChild(footerDiv);
    }
})();
