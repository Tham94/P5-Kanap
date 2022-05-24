
let currentUrl = window.location.href; // récupération URL actuelle
let url = new URL(currentUrl);
let id = url.searchParams.get("id"); // récupération de l'id du produit à partir de l'url actuelle

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
    if(basket != null){
        return JSON.parse(basket);
    }else{
        return[];
    }
}

// Ajouter le produit au panier au clic du bouton
let clickToAdd = document.getElementById("addToCart");
clickToAdd.addEventListener("click",function addToBasket(){
    // définition d'un produit 
    let qtyOfProduct = Number(document.getElementById("quantity").value);
    let listOfOptions = document.getElementById("colors");
    let colorOfProduct = listOfOptions.options[listOfOptions.selectedIndex].value;
    // Conditions pour ne pas ajouter un produit avec 1>quantité>100 ou si sa couleur n'est pas définie
    if (qtyOfProduct < 1 || qtyOfProduct > 100 || colorOfProduct == ""){
        let product = null;
        if(qtyOfProduct < 1 || qtyOfProduct > 100){
            alert('Veuillez entrer une quantité entre 0 et 100')
        }
        if(colorOfProduct == ""){
            alert('Veuillez choisir une couleur')
        }
    }else{
        let basket = getBasket()
        let product = {"id": id, "quantity" : qtyOfProduct, "color": colorOfProduct};
        let addedProduct = basket.find(p => p.color == product.color)
        if (addedProduct!=undefined){
            addedProduct.quantity += qtyOfProduct;
        }else{
            product.quantity = qtyOfProduct;
            basket.push(product);
        }
        saveToBasket(basket);
    }
});

// sauvegarder le panier dans l'API au format JSON
function saveToBasket(basket){
    localStorage.setItem("basket",JSON.stringify(basket));
}

async function init() {
    let response = await fetch(`http://localhost:3000/api/products/${id}`);
    let data = await response.json();
    console.log(data);

    addProductImage(data)
    addProductTitle(data)
    addProductPrice(data)
    addProductDescription(data)
    for (let i=0; i < data .colors.length; i++){
        addOptionValue(data, i)
    }
}

init()
