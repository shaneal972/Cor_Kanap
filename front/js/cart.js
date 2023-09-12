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


// Préparation de la commande.
function getById(id) {
    return document.getElementById(id);
}

/*
* let getById = (id) => document.getElementById(id); //ES6
*
*/

let prenom = getById('firstName');
let nom = getById('lastName');
let address = getById('address');
let city = getById('city');
let email = getById('email');
let firstNameError = getById('firstNameErrorMsg');
let lastNameError = getById('lastNameErrorMsg');
let addressError = getById('addressErrorMsg');
let cityError = getById('cityErrorMsg');
let emailError = getById('emailErrorMsg');
let btnOrder = getById('order');


//Envoie des infos du client et du panier vers l'API en POST
let postCommand = async (contact, products) => {
    try {
        const URL_POST = 'http://localhost:3000/api/products/' + 'order';
        let response = await fetch(URL_POST, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contact: contact,
                products: products
            })
        }); 

        let data = await response.json();

        let commande = {
            'contact': data.contact,
            'orderId': data.orderId,
            'products': data.products
        }

        return commande;
        
    } catch (error) {
        console.log(error.message);
    }
}

let validate = (element, message, error) => {
    let valid = false;
    if(element.value.trim() === "" || element.value.trim().length < 2){
        valid = false;
        error.innerHTML = message;
    }else {
        error.innerHTML = "";
        valid = true;
    }

    if (element.getAttribute("type") === 'email') {
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (element.value.match(validRegex)) {
            error.innerHTML = "";
            valid = true;
        } else {
            error.innerHTML = "Votre email n'est pas un email valide, merci de le retaper!";
            valid = false;
        }
    }

    if ((element.getAttribute('id') === 'firstName') || (element.getAttribute('id') === 'lastName')) {
        if (element.value.match(/^[a-zà-ï- ]+$/gi)) {
            error.innerHTML = "";
            valid = true;
        }else {
            error.innerHTML = "Ce champ ne doit pas contenir de chiffre, merci de le retaper !";
            valid = false;
        }
    }
    return valid;
};



btnOrder.addEventListener('click', (event) => {
    console.log('test');
    
    let validPrenom = validate(
        prenom, 
        "Le champ prénom ne doit pas être vide et doit avoir plus de 2 caractères!", 
        firstNameError
    );
    let validNom = validate(
        nom, 
        "Le champ nom ne doit pas être vide et doit avoir plus de 2 caractères!", 
        lastNameError
    );
    let validAddress = validate(
        address, 
        "Le champ adresse ne doit pas être vide et doit avoir plus de 2 caractères!", 
        addressError
    );
    let validCity = validate(
        city, 
        "Le champ city ne doit pas être vide et doit avoir plus de 2 caractères!", 
        cityError
    );
    let validEmail = validate(
        email, 
        "Le champ email ne doit pas être vide et doit avoir plus de 2 caractères!", 
        emailError
    );

    console.log(validPrenom);

    if (validPrenom && validNom && validAddress && validCity && validEmail) {
        console.log('ici');
        // On va créer  l'objet contact
        let contact = {
            firstName: prenom.value,
            lastName: nom.value,
            address: address.value,
            city: city.value,
            email: email.value
        };

        // On récupère les id des produits
        let productsId = [];
        myCart.forEach(p => {
            productsId.push(p.id);
        });

        try {
            let com = postCommand(contact, productsId);
            console.log(com);
            document.location = `
            confirmation.html?orderId=${com.orderId}`;
        } catch (error) {
            console.log(error.message);
        }
        event.preventDefault();
    } else {
        event.preventDefault();
    }

    
    
});




