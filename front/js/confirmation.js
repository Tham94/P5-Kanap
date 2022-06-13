// récupération URL actuelle
let currentUrl = window.location.href;
let url = new URL(currentUrl);

// récupération de l'orderId à partir de l'url actuelle pour pouvoir l'afficher dans la page
let orderId = url.searchParams.get("orderId");

// affichage du numéro de commande
const txtOrderId = document.getElementById('orderId');
txtOrderId.textContent = orderId;

// RAZ du panier
localStorage.clear();


