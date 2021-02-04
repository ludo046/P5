//recuperatio de l'id du produit 
let param = new URLSearchParams(document.location.search);
let id = param.get('id')
console.log(id);

function getOneTeddie(){    //fonction pour afficher le produit selectionner 
    fetch(`http://localhost:3000/api/teddies/${id}`)
    .then((response) => response.json())
    .then(oneTeddie  => {
        console.log(oneTeddie.colors);
        //affichage des element du produit 
        const name = document.querySelector('.teddie-name')
        name.innerText = oneTeddie.name;
        const img = document.querySelector('.img')
        img.src = oneTeddie.imageUrl;
        const description = document.querySelector('.description')
        description.innerText = oneTeddie.description
        const price = document.querySelector('.price')
        price.innerText = 'prix :' + oneTeddie.price/100+`.00€`
        //choix couleur 
        const select = document.getElementById('color')
        //boucle pour recuperer les options de chaque produit
        for (let i in oneTeddie.colors){
            select.innerHTML += `<option value='${oneTeddie.colors[i]}' selected='selected'>${oneTeddie.colors[i]}</option>`
        }
        //recuperation de l'option 
       let optionValue  = document.getElementById("color").value;
       console.log(optionValue);
        //recuperation de la quantité 
       let quantity = document.querySelector('.input').value;
       console.log(quantity);
    })
}
getOneTeddie() //appel de la fonction 



function addToCard(){
    const addcard = document.querySelector('.btn')
        addcard.addEventListener('click', function(){
            localStorage.setItem(name, oneTeddie.name);
            localStorage.setItem(select,optionValue);
            localStorage.setItem(quantity, quantity);
            localStorage.setItem(price, oneTeddie.price);
       })
}
addToCard()
