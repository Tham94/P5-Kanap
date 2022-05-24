
function addLink(data, index){ //Ajouter une balise <a>
    let a = document.createElement("a");
    a.setAttribute("class", "card-link-"+index);
    a.setAttribute("href", `./product.html?id=${data[index]._id}`);
    document.getElementById("items").appendChild(a);
}
function addArticle(index){ //Ajouter une balise <article>
    let article = document.createElement("article");
    article.setAttribute("class", "card-content-"+index);
    document.getElementsByClassName("card-link-"+index)[0].appendChild(article);
}
function addProductImage(data, index){ //Ajouter une balise <img>
    let image = document.createElement("img");
    image.setAttribute("class","card-content__image");
    image.setAttribute("src",data[index].imageUrl);
    image.setAttribute("alt",data[index].altTxt);
    document.getElementsByClassName("card-content-"+index)[0].appendChild(image); 
}
function addProductTitle(data, index){ //Ajouter une balise <h3>
    let productTitle = document.createElement("h3");
    productTitle.setAttribute("class","productName");
    productTitle.textContent= data[index].name;
    document.getElementsByClassName("card-content-"+index)[0].appendChild(productTitle);
}
function addProductDescription(data, index){ //Ajouter une balise <p>
    let productDescription = document.createElement("p"); 
    productDescription.setAttribute("class","productDescription");
    productDescription.textContent= data[index].description;
    document.getElementsByClassName("card-content-"+index)[0].appendChild(productDescription);
}

async function init() {
    let response = await fetch("http://localhost:3000/api/products");
    let data = await response.json();

    for (let i=0; i < data.length; i++){
        addLink(data, i);
        addArticle(i);
        addProductImage(data, i);
        addProductTitle(data, i);
        addProductDescription(data, i);
    }
}

init();


/*
fetch("http://localhost:3000/api/products")
    .then(async function (response) {
        let data = await response.json();
        console.log(data); //Consultation de l'ensemble de l'API    
    })
    .catch(function (error){
        console.log("Erreur : " + error)
    })

fetch("http://localhost:3000/api/products")
    .then(async (response) => {
        let data = await response.json();
        console.log(data); //Consultation de l'ensemble de l'API    
    })
    .catch((error) => {
        console.log("Erreur : " + error)
    });
*/

/*
fetch("http://localhost:3000/api/produts")
    .then(function (response) {
        return response.json()
    }) //Retourne la réponse au format JSON
    .then(function (response) {
        let data = response.json();
        console.log(data); //Consultation de l'ensemble de l'API    
        for (let i=0; i<data.length;i++){
            function addLink(){ //Ajouter une balise <a>
                let a = document.createElement("a");
                a.setAttribute("class", "card-link"+[i]);
                a.setAttribute("href", "./product.html?id="+data[i]._id);
                document.getElementById("items").appendChild(a);
            }
            function addArticle(){ //Ajouter une balise <article>
                let article = document.createElement("article");
                article.setAttribute("class", "card-content"+[i]);
                document.getElementsByClassName("card-link"+[i])[0].appendChild(article);
            }
            function addProductImage(){ //Ajouter une balise <img>
                let image = document.createElement("img");
                image.setAttribute("class","card-content__image");
                image.setAttribute("src",data[i].imageUrl);
                image.setAttribute("alt",data[i].altTxt);
                document.getElementsByClassName("card-content"+[i])[0].appendChild(image); 
            }
            function addProductTitle(){ //Ajouter une balise <h3>
                let productTitle = document.createElement("h3");
                productTitle.setAttribute("class","productName");
                productTitle.textContent= data[i].name;
                document.getElementsByClassName("card-content"+[i])[0].appendChild(productTitle);
            }
            function addProductDescription(){ //Ajouter une balise <p>
                let productDescription = document.createElement("p"); 
                productDescription.setAttribute("class","productDescription");
                productDescription.textContent= data[i].description;
                document.getElementsByClassName("card-content"+[i])[0].appendChild(productDescription);
            }
        addLink(i);
        addArticle(i);
        addProductImage(i);
        addProductTitle(i);
        addProductDescription(i);
        }
    
    })
    .catch(function (error){
        console.log("Erreur : " + error)
    })
*/
