
let currentUrl = window.location.href; // URL actuelle
console.log(currentUrl);

let url = new URL(currentUrl);
let id = url.searchParams.get("id"); // récupération de l'id du produit à partir de l'url actuelle
console.log(id);



function addProductImage(data){ //Ajouter une image au produit 
    let image = document.createElement("img");
    image.setAttribute("src", data .imageUrl);
    image.setAttribute("alt", data .altTxt);
    document.getElementsByClassName("item__img")[0].appendChild(image);
}

function addProductTitle(data){ //Ajouter titre au produit
    let productTitle = document.getElementById("title");
    productTitle.textContent= data.name;
    document.getElementsByClassName("item__content__titlePrice")[0].appendChild(productTitle);
}

function addProductPrice(data){ // Ajouter prix au produit
    let productPrice = document.getElementById("price");
    productPrice.textContent= data.price;
}

function addProductDescription(data){ // Ajouter une description au produit
    let productDescription = document.getElementById("description");
    productDescription.textContent= data.description;
}



function addOptionValue(data, index){
    let OptionValue = document.createElement("option");
    OptionValue.setAttribute("value",data .colors[index]);
    document.getElementById("colors").appendChild(OptionValue);
    OptionValue.textContent= data .colors[index];
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
