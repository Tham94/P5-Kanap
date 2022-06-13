//Ajouter une balise <a>
function addLink(data, index) {
  let a = document.createElement('a');
  a.setAttribute('class', 'card-link-' + index);
  a.setAttribute('href', `./product.html?id=${data[index]._id}`);
  document.getElementById('items').appendChild(a);
}

//Ajouter une balise <article>
function addArticle(index) {
  let article = document.createElement('article');
  article.setAttribute('class', 'card-content-' + index);
  document.getElementsByClassName('card-link-' + index)[0].appendChild(article);
}

//Ajouter une balise <img>
function addProductImage(data, index) {
  let image = document.createElement('img');
  image.setAttribute('class', 'card-content__image');
  image.setAttribute('src', data[index].imageUrl);
  image.setAttribute('alt', data[index].altTxt);
  document
    .getElementsByClassName('card-content-' + index)[0]
    .appendChild(image);
}

//Ajouter une balise <h3>
function addProductTitle(data, index) {
  let productTitle = document.createElement('h3');
  productTitle.setAttribute('class', 'productName');
  productTitle.textContent = data[index].name;
  document
    .getElementsByClassName('card-content-' + index)[0]
    .appendChild(productTitle);
}

//Ajouter une balise <p>
function addProductDescription(data, index) {
  let productDescription = document.createElement('p');
  productDescription.setAttribute('class', 'productDescription');
  productDescription.textContent = data[index].description;
  document
    .getElementsByClassName('card-content-' + index)[0]
    .appendChild(productDescription);
}

// Contact de l'API , appel des fonctions pour l'ajout des éléments dans le DOM
async function init() {
  try {
    const response = await fetch('http://localhost:3000/api/products');
    const data = await response.json();
    //Consultation de l'ensemble de l'API
    console.log(data);

    for (let i = 0; i < data.length; i++) {
      addLink(data, i);
      addArticle(i);
      addProductImage(data, i);
      addProductTitle(data, i);
      addProductDescription(data, i);
    }
  } catch (error) {
    alert(`Serveur indisponible : ' ${error}`);
  }
}

init();
