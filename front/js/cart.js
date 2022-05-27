// Récupération du panier sous forme de tableau
function getBasket(){
    let basket = localStorage.getItem("basket");
    let basketArray = JSON.parse(basket);
    return basketArray
}

// Ajouter un article (ajout d'un id pour y rattacher les éléments enfants)
function addArticle(basket, index){
    let article = document.createElement("article");
    article.setAttribute("class","cart__item cart__item-"+index); 
    article.setAttribute("data-id", basket[index].id);
    article.setAttribute("data-color", basket[index].color);
    document.getElementById("cart__items").appendChild(article);
    console.log(article);
}

// Ajouter une div contenant l'image 
function addImgContent(index){
    let cartItemImage = document.createElement("div");
    cartItemImage.setAttribute("class", "cart__item__img cart__item__img-"+index);
    document.getElementsByClassName("cart__item-"+index)[0].appendChild(cartItemImage);
}

// Insérer l'image du produit
function addImg(data,index){
    let img = document.createElement("img");
    img.setAttribute("alt", "Photographie d'un canapé");
    img.setAttribute("class","img-"+index)
    img.setAttribute("src", data.imageUrl)
    document.getElementsByClassName("cart__item__img-"+index)[0].appendChild(img);
}

// Ajouter une div avec le contenu du produit
function addItemContent(index){
    let content = document.createElement("div");
    content.setAttribute("class","cart__item__content cart__item__content-"+index);
    document.getElementsByClassName("cart__item-"+index)[0].appendChild(content);
}

// Ajouter une div avec la description du produit
function addItemDescription(index){
    let description = document.createElement("div");
    description.setAttribute("class","cart__item__content__description content__description-"+index)
    document.getElementsByClassName("cart__item__content-"+index)[0].appendChild(description)
}

// Ajouter nom du produit (h2)
function addItemTitle(data,index){
    let productTitle = document.createElement("h2");
    productTitle.setAttribute("id", "item__content__title-"+index)
    productTitle.textContent = data.name;
    document.getElementsByClassName("content__description-"+index)[0].appendChild(productTitle)
}

// Ajouter la couleur du produit (p)
function addItemColor(basket,index){
    let color = document.createElement("p");
    color.setAttribute("id", "item__color-"+index);
    color.textContent = basket[index].color;
    document.getElementsByClassName("content__description-"+index)[0].appendChild(color);
}

// Ajouter le prix du produit (p)
function addProductPrice(data,index){
    let price = document.createElement("p");
    price.setAttribute("id", "item__price-"+index);
    price.textContent = data.price + "€";
    document.getElementsByClassName("content__description-"+index)[0].appendChild(price)
}

// Contenu intéraction produit (ajouter/supprimer)
function addItemSettings(index){
    let settings = document.createElement("div");
    settings.setAttribute("class","cart__item__content__settings content__settings-"+index)
    document.getElementsByClassName("cart__item__content-"+index)[0].appendChild(settings)
}

// Ajouter contenu pour modifier quantité
function setItemQuantity(index){
    let setQuantity = document.createElement("div");
    setQuantity.setAttribute("class","cart__item__content__settings__quantity set__quantity-"+index)
    document.getElementsByClassName("content__settings-"+index)[0].appendChild(setQuantity)
}

// Ajouter affichage de la quantité du produit (p)
function addItemQuantity(index){
    let quantity = document.createElement("p");
    quantity.setAttribute("id", "quantity-"+index);
    quantity.textContent = "Qté =";
    document.getElementsByClassName("set__quantity-"+index)[0].appendChild(quantity)
}

// Ajouter input pour indiqué la quantité de base et pouvoir la modifier
function addInputQuantity(basket,index){
    let input = document.createElement("input");
    input.setAttribute("class","itemQuantity itemQuantity-"+index);
    input.setAttribute("name","itemQuantity");
    input.setAttribute("type","number");
    input.setAttribute("min","1");
    input.setAttribute("max","100");
    input.setAttribute("value",`${basket[index].quantity}`);
    document.getElementsByClassName("set__quantity-"+index)[0].appendChild(input)
}

// Ajouter contenant supprimer
function addContainerOfDelete(index){
    let containerOfDelete = document.createElement("div");
    containerOfDelete.setAttribute("class","cart__item__content__settings__delete settings__delete-"+index);
    document.getElementsByClassName("content__settings-"+index)[0].appendChild(containerOfDelete);
}

// Ajouter texte "supprimer" un produit du panier
function addDeleteProductContent(index){
    let deleteButton = document.createElement("p");
    deleteButton.setAttribute("class", "deleteItem deleteItem-"+index);
    deleteButton.textContent = "Supprimer";
    document.getElementsByClassName("settings__delete-"+index)[0].appendChild(deleteButton)
}

let basket = getBasket();

async function init() {
    for (let i = 0; i < basket.length; i++){
        // correspondance de l'url pour chaque produit du panier
        let response = await fetch(`http://localhost:3000/api/products/${basket[i].id}`);
        let data = await response.json();
        addArticle(basket,i)
        addImgContent(i)
        addImg(data,i)
        addItemContent(i)
        addItemDescription(i)
        addItemTitle(data,i)
        addItemColor(basket,i)
        addProductPrice(data,i)
        addItemSettings(i)
        setItemQuantity(i)
        addItemQuantity(i)
        addInputQuantity(basket,i)
        addContainerOfDelete(i)
        addDeleteProductContent(i)
    }
}

init();