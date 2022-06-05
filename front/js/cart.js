
/********************************************************   AJOUT DES ELEMENTS DANS LE DOM  *************************************************************/ 

// Ajouter un article (ajout d'un id pour y rattacher les éléments enfants)
function addArticle(basket, index) {
    let article = document.createElement("article");
    article.setAttribute("class","cart__item cart__item-"+index); 
    article.setAttribute("data-id", basket[index].id);
    article.setAttribute("data-color", basket[index].color);
    document.getElementById("cart__items").appendChild(article);
}

// Ajouter une div contenant l'image 
function addImgContent(index) {
    let cartItemImage = document.createElement("div");
    cartItemImage.setAttribute("class", "cart__item__img cart__item__img-"+index);
    document.getElementsByClassName("cart__item-"+index)[0].appendChild(cartItemImage);
}

// Insérer l'image du produit
function addImg(data,index) {
    let img = document.createElement("img");
    img.setAttribute("alt", "Photographie d'un canapé");
    img.setAttribute("class","img-"+index)
    img.setAttribute("src", data.imageUrl)
    document.getElementsByClassName("cart__item__img-"+index)[0].appendChild(img);
}

// Ajouter une div avec le contenu du produit
function addItemContent(index) {
    let content = document.createElement("div");
    content.setAttribute("class","cart__item__content cart__item__content-"+index);
    document.getElementsByClassName("cart__item-"+index)[0].appendChild(content);
}

// Ajouter une div avec la description du produit
function addItemDescription(index) {
    let description = document.createElement("div");
    description.setAttribute("class","cart__item__content__description content__description-"+index)
    document.getElementsByClassName("cart__item__content-"+index)[0].appendChild(description)
}

// Ajouter nom du produit (h2)
function addItemTitle(data,index) {
    let productTitle = document.createElement("h2");
    productTitle.setAttribute("id", "item__content__title-"+index)
    productTitle.textContent = data.name;
    document.getElementsByClassName("content__description-"+index)[0].appendChild(productTitle)
}

// Ajouter la couleur du produit (p)
function addItemColor(basket,index) {
    let color = document.createElement("p");
    color.setAttribute("id", "item__color-"+index);
    color.textContent = basket[index].color;
    document.getElementsByClassName("content__description-"+index)[0].appendChild(color);
}

// Ajouter le prix du produit (p)
function addProductPrice(data,index) {
    let price = document.createElement("p");
    price.setAttribute("id", "item__price-"+index);
    price.textContent = data.price + "€";
    document.getElementsByClassName("content__description-"+index)[0].appendChild(price)
}

// Contenu intéraction produit (ajouter/supprimer)
function addItemSettings(index) {
    let settings = document.createElement("div");
    settings.setAttribute("class","cart__item__content__settings content__settings-"+index)
    document.getElementsByClassName("cart__item__content-"+index)[0].appendChild(settings)
}

// Ajouter contenu pour modifier quantité
function setItemQuantity(index) {
    let setQuantity = document.createElement("div");
    setQuantity.setAttribute("class","cart__item__content__settings__quantity set__quantity-"+index)
    document.getElementsByClassName("content__settings-"+index)[0].appendChild(setQuantity)
}

// Ajouter affichage de la quantité du produit (p)
function addItemQuantity(index) {
    let quantity = document.createElement("p");
    quantity.setAttribute("id", "quantity-"+index);
    quantity.textContent = "Qté =";
    document.getElementsByClassName("set__quantity-"+index)[0].appendChild(quantity)
}

// Ajouter input pour indiqué la quantité de base et pouvoir la modifier
function addInputQuantity(basket,index) {
    let input = document.createElement("input");
    input.setAttribute("class","itemQuantity itemQuantity-"+index);
    input.setAttribute("name","itemQuantity");
    input.setAttribute("type","number");
    input.setAttribute("min","1");
    input.setAttribute("max","100");
    input.setAttribute("value",`${basket[index].quantity}`);
    document.getElementsByClassName("set__quantity-"+index)[0].appendChild(input);
}

// Ajouter contenant supprimer
function addContainerOfDelete(index) {
    let containerOfDelete = document.createElement("div");
    containerOfDelete.setAttribute("class","cart__item__content__settings__delete settings__delete-"+index);
    document.getElementsByClassName("content__settings-"+index)[0].appendChild(containerOfDelete);
}

// Ajouter texte "supprimer" un produit du panier
function addDeleteProductContent(index) {
    let deleteButton = document.createElement("p");
    deleteButton.setAttribute("class", "deleteItem deleteItem-"+index);
    deleteButton.textContent = "Supprimer";
    document.getElementsByClassName("settings__delete-"+index)[0].appendChild(deleteButton)
}


/********************************************************   GESTION DU PANIER  *************************************************************/ 
// Récupération du panier sous forme de tableau
function getBasket() {
    let basket = localStorage.getItem("basket");
    let basketArray = JSON.parse(basket);
    return basketArray
}

// Affichage quantité totale : filtrage avec map(), addition par paire de chaque quantité avec reduce()
function updateTextQuantity() {

    const TOTALQUANTITY = getBasket()
        .map(p => p.quantity)
        .reduce(
            (quantity1, quantity2) => quantity1 + quantity2, 
            0
        );
    const TEXTQUANTITY = document.getElementById("totalQuantity");
    TEXTQUANTITY.textContent = TOTALQUANTITY;
}

// Affichage prix total :

    // création d'un objet avec clé/value = id/prix (1/2)
let productPriceMapping = {};

function updateTotalPrice() {
    const TOTALPRICE = getBasket()
        .map(p => ({ 
            id: p.id, 
            quantity: p.quantity }))
        .reduce(
            (prevTotal, currentItem) => prevTotal + currentItem.quantity * productPriceMapping[currentItem.id], 
            0
        );

    const TEXTTOTALPRICE = document.getElementById("totalPrice");
    TEXTTOTALPRICE.textContent = TOTALPRICE;
}

// sauvegarder  le panier de l'API au format JSON
function saveToBasket(basket) {
    localStorage.setItem("basket",JSON.stringify(basket));
}

// Supprimer le produit du panier et du DOM  
function deleteProduct (){
    let basket = getBasket();

    for (let j = 0; j < basket.length; j++) {
        let clickToDelete = document.getElementsByClassName("deleteItem-" + j)[0];
        let currentItem = basket[j];

        clickToDelete.addEventListener("click", () => {
            let basket = getBasket();
            let itemsToKeep = basket.filter(p => p.id !== currentItem.id || p.color !== currentItem.color)

            let section = document.getElementById("cart__items");
            let article = document.getElementsByClassName("cart__item-"+ j)[0];
            section.removeChild(article);
            saveToBasket(itemsToKeep);
            updateTextQuantity();
            updateTotalPrice();
        })
    }
}

// Modifier la quantité d'un produit
function modifyQuantity () {
    let basket = getBasket();
    for (let k = 0; k < basket.length; k++) {
        let input = document.getElementsByClassName("itemQuantity-" + k)[0];
        let product = document.getElementsByClassName("cart__item-" + k )[0];

        input.addEventListener("change", (e) => {
            // quantité modifiée
            let updateQuantity = Number(e.target.value); 
            // détermination de l'index du produit selectionné
            let addedProductIndex = basket.findIndex( p => p.id === product.dataset.id && p.color === product.dataset.color);
            let addedProduct = basket[addedProductIndex];
            // Changement de la quantité du produit du panier
            addedProduct.quantity = updateQuantity;

            // Plafonnement de la quantité à 100
            if ( addedProduct.quantity > 100) {
                addedProduct.quantity = 100;
                alert('Vous avez atteint la limite de quantité à 100 par commande pour ce produit')
            }
            
            saveToBasket(basket);
            updateTextQuantity();
            updateTotalPrice();
        })
    }
}


/************************************************************  FORMULAIRE  *******************************************************************/ 
const REGEXPNAME = new RegExp(/^[A-Za-z\é\è\ê\ñ\ë\Ë\Ê\-]+$/);

// Validation prénom
const INPUTFIRSTNAME = document.getElementById('firstName');
INPUTFIRSTNAME.addEventListener('input', () => {
    validateFirstName(this);
});

function validateFirstName () {
    let validationTxt = document.getElementById('firstNameErrorMsg');

    if (INPUTFIRSTNAME.value.match(REGEXPNAME)) {
        validationTxt.textContent = '\u2705';
        INPUTFIRSTNAME.style.backgroundColor = 'lightgreen';
    } else {
        validationTxt.textContent = 'Prénom non valide';
        INPUTFIRSTNAME.style.backgroundColor = '#fbbcbc';
    }
}

// Validation nom
const INPUTNAME = document.getElementById('lastName');
INPUTNAME.addEventListener('input', () => {
    validateName(this);
});

function validateName () {
    let validationTxt = document.getElementById('lastNameErrorMsg');

    if (INPUTNAME.value.match(REGEXPNAME)) {
        validationTxt.textContent = '\u2705';
        INPUTNAME.style.backgroundColor = 'lightgreen';
    } else {
        validationTxt.textContent = 'Nom non valide';
        INPUTNAME.style.backgroundColor = '#fbbcbc';
    }
}

// Validation ville
const INPUTCITY = document.getElementById('city');
INPUTCITY.addEventListener('input', () => {
    validateCity(this);
});

function validateCity () {
    let validationTxt = document.getElementById('cityErrorMsg');
    const REGEXPCITY = new RegExp(/^[A-Za-z\é\è\ê\ñ\ë\Ë\Ê\-]{1,45}$/);

    if (INPUTCITY.value.match(REGEXPCITY)) {
        validationTxt.textContent = '\u2705';
        INPUTCITY.style.backgroundColor = 'lightgreen';
    } else {
        validationTxt.textContent = 'Ville non valide';
        INPUTCITY.style.backgroundColor = '#fbbcbc';
    }
}

// Validation de l'adresse
const INPUTADDRESS = document.getElementById('address');
INPUTADDRESS.addEventListener('input', () => {
    validateAddress(this);
});

function validateAddress () {
    let validationTxt = document.getElementById('addressErrorMsg')
    const REGEXPADRESS = new RegExp(/^[a-zA-Z0-9\é\è\ê\ñ\ë\Ë\Ê\s,'-]{10,}$/);

    if (INPUTADDRESS.value.match(REGEXPADRESS)) {
        validationTxt.textContent = '\u2705';
        INPUTADDRESS.style.backgroundColor = 'lightgreen';
    } else {
        validationTxt.textContent = 'Adresse non valide';
        INPUTADDRESS.style.backgroundColor = '#fbbcbc';
    }
}

// Validation du format de l'e-mail
const INPUTEMAIL = document.getElementById('email');
INPUTEMAIL.addEventListener('input', () => {
    validateeMail(this);
});

function validateeMail () {
    let validationTxt = document.getElementById('emailErrorMsg');
    const REGEXEPMAIL = new RegExp(/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/, 'g');

    if (INPUTEMAIL.value.match(REGEXEPMAIL)) {
        validationTxt.textContent = '\u2705';
        INPUTEMAIL.style.backgroundColor = 'lightgreen';
    } else {
        validationTxt.textContent = 'E-mail non valide';
        INPUTEMAIL.style.backgroundColor = '#fbbcbc';
    }
}



/**************************************************   DEFINITION DES ARTICLES DU PANIER  *******************************************************/ 

async function init() {
    let basket = getBasket();
    for ( let i = 0; i < basket.length; i++ ) {
        // correspondance de l'url pour chaque produit du panier par rapport à son id
        let response = await fetch (`http://localhost:3000/api/products/${basket[i].id}`);
        let data = await response.json ();

        // création d'un objet avec clé/value = id/prix (2/2)
        productPriceMapping[data._id] = data.price;

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

    deleteProduct();
    modifyQuantity();
    updateTextQuantity();
    updateTotalPrice();

    validateeMail();
    validateName()
    validateFirstName();
    validateCity();
    validateAddress();
}

init();