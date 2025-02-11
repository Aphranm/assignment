/* script.js */

/**
 * Wait for the DOM content to load before executing scripts.
 */
document.addEventListener("DOMContentLoaded", function () {
  // Fetch the XML data from the file
  fetch("perfumes.xml")
    .then((response) => response.text())
    .then((data) => {
      // Parse the XML string into an XML document
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "application/xml");
      displayProducts(xmlDoc);
    })
    .catch((error) => {
      console.error("Error loading XML data:", error);
    });
});

/**
 * Display products by reading data from the XML document.
 * @param {XMLDocument} xml - The XML document containing product data.
 */
function displayProducts(xml) {
  // Get all <perfume> elements from the XML
  const products = xml.getElementsByTagName("perfume");
  const container = document.getElementById("product-container");

  // Loop through each product and create HTML elements to display its details
  for (let i = 0; i < products.length; i++) {
    // Extract product details from XML
    const name = products[i].getElementsByTagName("name")[0].textContent;
    const description = products[i].getElementsByTagName("description")[0].textContent;
    const price = products[i].getElementsByTagName("price")[0].textContent;
    const image = products[i].getElementsByTagName("image")[0].textContent;

    // Create a container div for the product
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    // Create and set up the image element
    const imgElem = document.createElement("img");
    imgElem.src = image;  // Image path provided in the XML file
    imgElem.alt = name;

    // Create the product name element
    const productName = document.createElement("h3");
    productName.textContent = name;

    // Create the description paragraph
    const productDesc = document.createElement("p");
    productDesc.textContent = description;

    // Create the price element
    const productPrice = document.createElement("p");
    productPrice.textContent = "Price: $" + price;

    // Append all elements to the product container div
    productDiv.appendChild(imgElem);
    productDiv.appendChild(productName);
    productDiv.appendChild(productDesc);
    productDiv.appendChild(productPrice);

    // Append the product div to the main product container in the HTML
    container.appendChild(productDiv);
  }
}
