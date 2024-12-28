    // Load the Krona One font
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Krona+One&display=swap';
document.head.appendChild(fontLink);

// Create the content container
const contentDiv = document.createElement('div');
contentDiv.classList.add('content0');
contentDiv.style.cssText = `
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #333;
    text-align: center;
    padding: 10px 0;
    width: 100%;
`;

// Create the footer paragraph
const footerParagraph = document.createElement('p');
footerParagraph.classList.add('sticky-footer');
footerParagraph.style.cssText = `
    margin-top: auto;
    width: 100%;
    text-align: center;
    font-family: 'Krona One', sans-serif;
    font-size: 10px;
    margin: 0;
`;

// Create the ADSAURF span
const adsaurfSpan = document.createElement('span');
adsaurfSpan.classList.add('krona-font');
adsaurfSpan.style.cssText = `
    font-weight: bold;
    font-size: 11px;
`;
adsaurfSpan.textContent = 'ADSAURF';

// Append content to the footer
footerParagraph.appendChild(adsaurfSpan);
footerParagraph.innerHTML += ' ©2024<br>All Rights Reserved.';

// Append the footer to the content container
contentDiv.appendChild(footerParagraph);

// Append the content container to the body
document.body.style.cssText = `
    height: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
`;
document.body.appendChild(contentDiv);