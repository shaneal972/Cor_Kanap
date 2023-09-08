import { getOneProduct } from "./api.js";
import { findProductInCart, updateCart } from "./utils.js";

let cartHTML = document.getElementById('cart__items');
// console.log(cart);
let myCart = JSON.parse(localStorage.getItem('panier'));
console.log(myCart);

let totalArticle = 0;
let totalPrice = 0;
let totalQty = document.querySelector("#totalQuantity");
let totalCartPrice = document.querySelector("#totalPrice");

// Affichage des produits qu panier
myCart.forEach(p => {
        totalArticle += Number(p.qty);
        totalPrice += Number((p.qty * p.price)); 
        cartHTML.innerHTML += `
            <article class="cart__item" data-id="${p.id}" data-color="${p.color}">
                <div class="cart__item__img">
                    <img src="../images/product01.jpg" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${p.name}</h2>
                        <p>${p.color}</p>
                        <p>${p.price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${p.qty}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>
        `;
});

// Calcul du total
totalQty.innerHTML = totalArticle;
totalCartPrice.innerHTML = totalPrice;

let inputs = document.querySelectorAll('.itemQuantity');
inputs.forEach(input => {
    input.addEventListener('change', function(event){
        let p = findProductInCart(input, myCart, 'article');
        p.qty = input.value;
        updateCart('panier', myCart);
        totalQty.innerHTML = totalArticle;
        totalCartPrice.innerHTML = totalPrice;
        location.reload();
    });
});

let btnDelete = document.querySelectorAll('.deleteItem');
btnDelete.forEach(del => {
    del.addEventListener('click', function(event){
        let p = findProductInCart(del, myCart, 'article');
        myCart.splice(myCart.indexOf(p), 1);
        updateCart('panier', myCart);
        location.reload();
    });
});



