import {getAllProducts} from "./api.js";

let products = [];
let sectionItems = document.querySelector('#items');


products = await getAllProducts();

// Parcours du tableau de produits
products.forEach(product => {
    // Affichage de chaque produit dans la page html
    sectionItems.innerHTML += `
        <a href="./product.html?id=${product._id}">
            <article>
                <img src="${product.imageUrl}" alt="${product.altTxt}">
                <h3 class="productName">${product.name}</h3>
                <p class="productDescription">${product.description}</p>
            </article>
        </a>
    `;
});