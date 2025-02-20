// script.js
function addToCart(productName, price) {
    let cart = document.getElementById("cart-items");
    let listItem = document.createElement("li");
    listItem.textContent = `${productName} - ${price} AED`;
    cart.appendChild(listItem);
}