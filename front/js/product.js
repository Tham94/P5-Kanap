// récupération URL actuelle
let currentUrl = window.location.href; 
let url = new URL(currentUrl);
// récupération de l'id du produit à partir de l'url actuelle pour pouvoir contacter l'API
let id = url.searchParams.get("id"); 

//Ajouter image du produit 
function addProductImage(data){ 
    let image = document.createElement("img");
    image.setAttribute("src", data .imageUrl);
    image.setAttribute("alt", data .altTxt);
    document.getElementsByClassName("item__img")[0].appendChild(image);
}

//Ajouter titre du produit
function addProductTitle(data){ 
    let productTitle = document.getElementById("title");
    productTitle.textContent= data.name;
    document.getElementsByClassName("item__content__titlePrice")[0].appendChild(productTitle);
}

// Ajouter prix du produit
function addProductPrice(data){ 
    let productPrice = document.getElementById("price");
    productPrice.textContent= data.price;
}

// Ajouter une description du produit
function addProductDescription(data){ 
    let productDescription = document.getElementById("description");
    productDescription.textContent= data.description;
}

// Ajouter un selecteur de couleur au produit
function addOptionValue(data, index){ 
    let optionValue = document.createElement("option");
    optionValue.setAttribute("value",data .colors[index]);
    document.getElementById("colors").appendChild(optionValue);
    optionValue.textContent= data .colors[index];
}

/*_____ GESTION PANIER__________*/ 

// initialisation panier
function getBasket(){
    let basket = localStorage.getItem("basket");

    if (basket !== null) {
        return JSON.parse(basket);
    }
        
    return [];
}

// définition d'un produit 
function getProductDetails(){
    let qtyOfProduct = Number(document.getElementById("quantity").value);
    let listOfOptions = document.getElementById("colors");
    let colorOfProduct = listOfOptions.options[listOfOptions.selectedIndex].value;

    return {"id": id, "quantity" : qtyOfProduct, "color": colorOfProduct};
}

// sauvegarder le produit dans le panier de l'API au format JSON
function saveToBasket(basket){
    localStorage.setItem("basket",JSON.stringify(basket));
}

// Ajouter le produit au panier au clic du bouton
let clickToAdd = document.getElementById("addToCart");
clickToAdd.addEventListener("click",() => {
    let product = getProductDetails();
    if (product.quantity < 1 || product.quantity > 100) {
        alert('Veuillez entrer une quantité entre 1 et 100 inclus');

        return;
    }
    if (product.color == '') {
        alert('Veuillez choisir une couleur');

        return;
    }
// Incrémentation de la quantité si le produit est existant ou ajouter un nouveau produit
    let basket = getBasket();
    let addedProductIndex = basket.findIndex( p => p.id === product.id && p.color === product.color);

    if (addedProductIndex != -1) {
        let addedProduct = basket[addedProductIndex];
        addedProduct.quantity += product.quantity;
        // Plafonnement de la quantité à 100
        if ( addedProduct.quantity > 100) {
            addedProduct.quantity = 100;
            alert('Vous avez atteint la limite de quantité à 100 par commande pour ce produit')
        }
        basket[addedProductIndex] = addedProduct;
    } else {
        basket.push(product);
    }

    saveToBasket(basket);
});


// contact de l'API
async function init() {
    let response = await fetch(`http://localhost:3000/api/products/${id}`);
    let data = await response.json();
    console.log(data);

    addProductImage(data);
    addProductTitle(data);
    addProductPrice(data);
    addProductDescription(data)
    for (let i=0; i < data .colors.length; i++) {
        addOptionValue(data, i);
    }
}

init()
