function findProductInCart(element, cart, parent){
    return cart.find(p => p.id === element.closest(parent).dataset.id);
}

function updateCart(key, cart){
    localStorage.setItem(key, JSON.stringify(cart));
}


export {
    findProductInCart,
    updateCart
} 