/***************************************   FONCTIONS POUR AJOUT DES ELEMENTS DANS LE DOM  **************************************/
// Ajouter un article (ajout d'un id pour y rattacher les éléments enfants)
function addArticle(basket, index) {
  let article = document.createElement('article');
  article.setAttribute('class', 'cart__item cart__item-' + index);
  article.setAttribute('data-id', basket[index].id);
  article.setAttribute('data-color', basket[index].color);
  document.getElementById('cart__items').appendChild(article);
}

// Ajouter une div contenant l'image
function addImgContent(index) {
  let cartItemImage = document.createElement('div');
  cartItemImage.setAttribute(
    'class',
    'cart__item__img cart__item__img-' + index
  );
  document
    .getElementsByClassName('cart__item-' + index)[0]
    .appendChild(cartItemImage);
}

// Insérer l'image du produit
function addImg(data, index) {
  let img = document.createElement('img');
  img.setAttribute('alt', "Photographie d'un canapé");
  img.setAttribute('class', 'img-' + index);
  img.setAttribute('src', data.imageUrl);
  document
    .getElementsByClassName('cart__item__img-' + index)[0]
    .appendChild(img);
}

// Ajouter une div avec le contenu du produit
function addItemContent(index) {
  let content = document.createElement('div');
  content.setAttribute(
    'class',
    'cart__item__content cart__item__content-' + index
  );
  document
    .getElementsByClassName('cart__item-' + index)[0]
    .appendChild(content);
}

// Ajouter une div avec la description du produit
function addItemDescription(index) {
  let description = document.createElement('div');
  description.setAttribute(
    'class',
    'cart__item__content__description content__description-' + index
  );
  document
    .getElementsByClassName('cart__item__content-' + index)[0]
    .appendChild(description);
}

// Ajouter nom du produit (h2)
function addItemTitle(data, index) {
  let productTitle = document.createElement('h2');
  productTitle.setAttribute('id', 'item__content__title-' + index);
  productTitle.textContent = data.name;
  document
    .getElementsByClassName('content__description-' + index)[0]
    .appendChild(productTitle);
}

// Ajouter la couleur du produit (p)
function addItemColor(basket, index) {
  let color = document.createElement('p');
  color.setAttribute('id', 'item__color-' + index);
  color.textContent = basket[index].color;
  document
    .getElementsByClassName('content__description-' + index)[0]
    .appendChild(color);
}

// Ajouter le prix du produit (p)
function addProductPrice(data, index) {
  let price = document.createElement('p');
  price.setAttribute('id', 'item__price-' + index);
  price.textContent = data.price + '€';
  document
    .getElementsByClassName('content__description-' + index)[0]
    .appendChild(price);
}

// Contenu intéraction produit (ajouter/supprimer)
function addItemSettings(index) {
  let settings = document.createElement('div');
  settings.setAttribute(
    'class',
    'cart__item__content__settings content__settings-' + index
  );
  document
    .getElementsByClassName('cart__item__content-' + index)[0]
    .appendChild(settings);
}

// Ajouter contenu pour modifier quantité
function setItemQuantity(index) {
  let setQuantity = document.createElement('div');
  setQuantity.setAttribute(
    'class',
    'cart__item__content__settings__quantity set__quantity-' + index
  );
  document
    .getElementsByClassName('content__settings-' + index)[0]
    .appendChild(setQuantity);
}

// Ajouter affichage de la quantité du produit (p)
function addItemQuantity(index) {
  let quantity = document.createElement('p');
  quantity.setAttribute('id', 'quantity-' + index);
  quantity.textContent = 'Qté =';
  document
    .getElementsByClassName('set__quantity-' + index)[0]
    .appendChild(quantity);
}

// Ajouter input pour indiqué la quantité de base et pouvoir la modifier
function addInputQuantity(basket, index) {
  let input = document.createElement('input');
  input.setAttribute('class', 'itemQuantity itemQuantity-' + index);
  input.setAttribute('name', 'itemQuantity');
  input.setAttribute('type', 'number');
  input.setAttribute('min', '1');
  input.setAttribute('max', '100');
  input.setAttribute('value', `${basket[index].quantity}`);
  document
    .getElementsByClassName('set__quantity-' + index)[0]
    .appendChild(input);
}

// Ajouter contenant supprimer
function addContainerOfDelete(index) {
  let containerOfDelete = document.createElement('div');
  containerOfDelete.setAttribute(
    'class',
    'cart__item__content__settings__delete settings__delete-' + index
  );
  document
    .getElementsByClassName('content__settings-' + index)[0]
    .appendChild(containerOfDelete);
}

// Ajouter texte "supprimer" un produit du panier
function addDeleteProductContent(index) {
  let deleteButton = document.createElement('p');
  deleteButton.setAttribute('class', 'deleteItem deleteItem-' + index);
  deleteButton.textContent = 'Supprimer';
  document
    .getElementsByClassName('settings__delete-' + index)[0]
    .appendChild(deleteButton);
}

/********************************************************   GESTION DU PANIER  *************************************************************/
// initialisation panier
function getBasket() {
  let basket = localStorage.getItem('basket');

  if (basket !== null) {
    return JSON.parse(basket);
  }

  return [];
}

// Affichage quantité totale : filtrage avec map(), addition par paire de chaque quantité avec reduce()
function updateTextQuantity() {
  const totalQuantity = getBasket()
    .map((p) => p.quantity)
    .reduce((prevTotal, quantity) => prevTotal + quantity, 0);
  const textQuantity = document.getElementById('totalQuantity');
  textQuantity.textContent = totalQuantity;
}

// Affichage prix total :

// création d'un objet avec clé/value = id/prix (1/2)
let productPriceMapping = {};

function updateTotalPrice() {
  const totalPrice = getBasket()
    .map((p) => ({
      id: p.id,
      quantity: p.quantity,
    }))
    .reduce(
      (prevTotal, currentItem) =>
        prevTotal + currentItem.quantity * productPriceMapping[currentItem.id],
      0
    );

  const textTotalPrice = document.getElementById('totalPrice');
  textTotalPrice.textContent = totalPrice;
}

// sauvegarder  le panier de l'API au format JSON
function saveToBasket(basket) {
  localStorage.setItem('basket', JSON.stringify(basket));
}

// Supprimer le produit du panier et du DOM
function deleteProduct() {
  let basket = getBasket();

  for (let j = 0; j < basket.length; j++) {
    const clickToDelete = document.getElementsByClassName('deleteItem-' + j)[0];
    const currentItem = basket[j];

    clickToDelete.addEventListener('click', () => {
      let basket = getBasket();
      const itemsToKeep = basket.filter(
        (p) => p.id !== currentItem.id || p.color !== currentItem.color
      );

      let section = document.getElementById('cart__items');
      let article = document.getElementsByClassName('cart__item-' + j)[0];
      section.removeChild(article);

      saveToBasket(itemsToKeep);
      updateTextQuantity();
      updateTotalPrice();
    });
  }
}

// Modifier la quantité d'un produit
function modifyQuantity() {
  let basket = getBasket();

  for (let k = 0; k < basket.length; k++) {
    let input = document.getElementsByClassName('itemQuantity-' + k)[0];
    let product = document.getElementsByClassName('cart__item-' + k)[0];

    input.addEventListener('change', (e) => {
      // quantité modifiée
      const updateQuantity = Number(e.target.value);
      // détermination de l'index du produit selectionné
      const addedProductIndex = basket.findIndex(
        (p) => p.id === product.dataset.id && p.color === product.dataset.color
      );
      const addedProduct = basket[addedProductIndex];

      // Changement de la quantité du produit du panier
      addedProduct.quantity = updateQuantity;

      // Plafonnement de la quantité à 100
      if (addedProduct.quantity > 100) {
        addedProduct.quantity = 100;
        alert(
          'Vous avez atteint la limite de quantité à 100 par commande pour ce produit'
        );
      }

      saveToBasket(basket);
      updateTextQuantity();
      updateTotalPrice();
    });
  }
}

/**********************************************************  VALIDATION DU FORMULAIRE  ***************************************************************/

const RegExpName = new RegExp(/^[A-Za-z\é\è\ê\ñ\ë\Ë\Ê\-]+$/);

// Validation prénom
const inputFirstName = document.getElementById('firstName');
inputFirstName.addEventListener('input', () => {
  validateFirstName(this);
});

function validateFirstName() {
  let validationTxt = document.getElementById('firstNameErrorMsg');

  if (inputFirstName.value.match(RegExpName)) {
    validationTxt.textContent = '\u2705';
    inputFirstName.style.backgroundColor = 'lightgreen';

    return true;
  } else {
    validationTxt.textContent = 'Prénom non valide';
    inputFirstName.style.backgroundColor = '#fbbcbc';

    return false;
  }
}

// Validation nom
const inputName = document.getElementById('lastName');
inputName.addEventListener('input', () => {
  validateName(this);
});

function validateName() {
  let validationTxt = document.getElementById('lastNameErrorMsg');

  if (inputName.value.match(RegExpName)) {
    validationTxt.textContent = '\u2705';
    inputName.style.backgroundColor = 'lightgreen';

    return true;
  } else {
    validationTxt.textContent = 'Nom non valide';
    inputName.style.backgroundColor = '#fbbcbc';

    return false;
  }
}

// Validation ville
const inputCity = document.getElementById('city');
inputCity.addEventListener('input', () => {
  validateCity(this);
});

function validateCity() {
  let validationTxt = document.getElementById('cityErrorMsg');
  const regExpCity = new RegExp(/^[A-Za-z\à\é\è\ê\ñ\ë\Ë\Ê\-]{1,45}$/);

  if (inputCity.value.match(regExpCity)) {
    validationTxt.textContent = '\u2705';
    inputCity.style.backgroundColor = 'lightgreen';

    return true;
  } else {
    validationTxt.textContent = 'Ville non valide';
    inputCity.style.backgroundColor = '#fbbcbc';

    return false;
  }
}

// Validation de l'adresse
const inputAddress = document.getElementById('address');
inputAddress.addEventListener('input', () => {
  validateAddress(this);
});

function validateAddress() {
  let validationTxt = document.getElementById('addressErrorMsg');
  const regExpAdress = new RegExp(/^[a-zA-Z0-9\à\é\è\ê\ñ\ë\Ë\Ê\s,'-]{5,}$/);

  if (inputAddress.value.match(regExpAdress)) {
    validationTxt.textContent = '\u2705';
    inputAddress.style.backgroundColor = 'lightgreen';

    return true;
  } else {
    validationTxt.textContent = 'Adresse non valide';
    inputAddress.style.backgroundColor = '#fbbcbc';

    return false;
  }
}

// Validation du format de l'e-mail
const inputEmail = document.getElementById('email');
inputEmail.addEventListener('input', () => {
  validateeMail(this);
});

function validateeMail() {
  let validationTxt = document.getElementById('emailErrorMsg');
  const regExpMail = new RegExp(
    /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/,
    'g'
  );

  if (inputEmail.value.match(regExpMail)) {
    validationTxt.textContent = '\u2705';
    inputEmail.style.backgroundColor = 'lightgreen';

    return true;
  } else {
    validationTxt.textContent = 'E-mail non valide';
    inputEmail.style.backgroundColor = '#fbbcbc';

    return false;
  }
}

/**************************************************   ENVOI DU FORMULAIRE  *******************************************************/

// Récupération des Ids des produits seulement si le panier est existant
function getAllProductId() {
  if (getBasket() != null) {
    return getBasket().map((p) => p.id);
  }
  return [];
}

// Définition du tableau products contenant les Ids des produits
const products = getAllProductId();

// Envoi du formulaire de contact et récupération de l'orderId
document.getElementById('order').addEventListener('click', async (e) => {
  e.preventDefault();

  // Empêcher l'envoi de la commande si le panier est vide ou inexistant (dans le localStorage)
  if (getBasket() == false || getBasket() == null) {
    alert(
      `Vous devez constituer un panier d'achat avant d'envoyer votre commande`
    );
  } else {
    // Construction de l'objet contact
    const contact = {
      firstName: inputFirstName.value,
      lastName: inputName.value,
      address: inputAddress.value,
      city: inputCity.value,
      email: inputEmail.value,
    };

    const order = { contact, products };

    // Envoi de la commande uniquement si les champs correctement remplis
    if (
      validateFirstName() &&
      validateName() &&
      validateAddress() &&
      validateCity() &&
      validateeMail()
    ) {
      const result = await fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
        },
      });
      // récupération de la réponse du back-end contenant l'orderId
      const data = await result.json();
      // redirection vers l'url de la page de confirmation en fonction de l'orderId
      window.location.href = `confirmation.html?orderId=${data.orderId}`;
    } else {
      alert(
        'Merci de renseigner correctement tous les champs pour envoyer votre commande'
      );
    }
  }
});

/**************************************************   DEFINITION DES ARTICLES DU PANIER  *******************************************************/

async function init() {
  try {
    let basket = getBasket();
    for (let i = 0; i < basket.length; i++) {
      // correspondance de l'url pour chaque produit du panier par rapport à son id
      const response = await fetch(
        `http://localhost:3000/api/products/${basket[i].id}`
      );
      const data = await response.json();

      // création d'un objet avec clé/value = id/prix (2/2)
      productPriceMapping[data._id] = data.price;

      addArticle(basket, i);
      addImgContent(i);
      addImg(data, i);
      addItemContent(i);
      addItemDescription(i);
      addItemTitle(data, i);
      addItemColor(basket, i);
      addProductPrice(data, i);
      addItemSettings(i);
      setItemQuantity(i);
      addItemQuantity(i);
      addInputQuantity(basket, i);
      addContainerOfDelete(i);
      addDeleteProductContent(i);
    }

    deleteProduct();
    modifyQuantity();
    updateTextQuantity();
    updateTotalPrice();

    validateeMail();
    validateName();
    validateFirstName();
    validateCity();
    validateAddress();

    getAllProductId();
  } catch {
    alert(`Serveur indisponible : ${error}`);
  }
}

init();
