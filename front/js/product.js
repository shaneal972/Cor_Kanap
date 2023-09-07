import { getOneProduct } from "./api.js";

let product = {};
let img = document.querySelector(".item__img");
let title = document.getElementById("title");
let price = document.getElementById("price");
let description = document.getElementById("description");
let colors = document.querySelector("#colors");
let productToAdd = {};
let quantity = document.getElementById("quantity");
let btnAddtoCart = document.querySelector("#addToCart");
let productsToBuy = [];


let str = window.location.href;
let url = new URL(str);

let params = new URLSearchParams(url.search);
let _id = params.get('id');

product = await getOneProduct(_id);


img.innerHTML =  `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
title.innerText = product.name;
price.innerHTML = `${product.price} `; 
description.innerHTML = product.description;

let couleurs = product.colors;
couleurs.forEach(couleur => {
    colors.innerHTML += `
    <option value="${couleur}">${couleur}</option>  
    `;
});


// Gestion du clic sur Ajouter au panier
btnAddtoCart.addEventListener('click', function(event){
    let productToAdd = {
        id : _id,
        qty : Number(quantity.value),
        color : colors.options[colors.selectedIndex].text,
        name: product.name,
        price: Number(product.price)
    };

    productsToBuy.push(productToAdd);

    if (localStorage.getItem('panier') !== null) {
        let monPanier = JSON.parse(localStorage.getItem('panier'));
        let productExist = monPanier.find(p => p.id === productToAdd.id && p.color === productToAdd.color);
        console.log(productExist);
        if(productExist !== undefined){
            productExist.qty += productToAdd.qty;
            localStorage.setItem('panier', JSON.stringify(monPanier));
        }else{
            monPanier.push(productToAdd);
            localStorage.setItem('panier', JSON.stringify(monPanier));
        }
    }else{
        // Stockage dans le localStorage
        localStorage.setItem('panier', JSON.stringify(productsToBuy));        
    }

    location.href = "../html/cart.html";
});



