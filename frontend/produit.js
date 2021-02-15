function getOneTeddie() {    //fonction pour afficher le produit selectionner 
    //recuperation de l'id du produit 
    const param = new URLSearchParams(document.location.search);
    const id = param.get('id');
    console.log(id);


    return fetch(`http://localhost:3000/api/teddies/${id}`)
        .then((response) => response.json())
        .then(oneTeddie => oneTeddie)
        .catch((error) => {alert(error)})
}


// la fonction s'auto appelle au chargement de la page
(async function createElements() { // la fonction sert uniquement a creer les elements du dom dynamiquement

    const oneTeddie = await getOneTeddie(); // attend que la fonction lui retourne le resultat du fetch requetant l'api back-end

    console.log(oneTeddie.colors);
    //affichage des element du produit 
    const name = document.querySelector('.teddie-name');
    name.innerText = oneTeddie.name;
    const img = document.querySelector('.img');
    img.src = oneTeddie.imageUrl;
    const description = document.querySelector('.description');
    description.innerText = oneTeddie.description;
    const price = document.querySelector('.price');
    price.innerText = 'prix :' + oneTeddie.price / 100 + `.00€`;
    //choix couleur 
    const select = document.getElementById('color');
    //boucle pour recuperer les options de chaque produit
    for (let i in oneTeddie.colors) {
        if (i < 1) {
            select.innerHTML += `<option value='${oneTeddie.colors[i]}' selected='selected'>${oneTeddie.colors[i]}</option>`;
        } else {
            select.innerHTML += `<option value='${oneTeddie.colors[i]}'>${oneTeddie.colors[i]}</option>`;

        }
    }
})();

function getValues() {
    //recuperation de l'option 
    let optionValue = document.getElementById('color').value;
    console.log(optionValue);
    //recuperation de la quantité 
    let quantity = document.querySelector('.input').value;
    console.log(quantity);

    let customerChoice = { // on créé ue variable avec les valuers récupérées
        optionValue: optionValue,
        quantity: quantity
    };

    console.log('choix client', customerChoice); // on affiche dans la console pour verifier si l'objet n'est pas vide
    return customerChoice; // on retourne l'objet
}


const addCard = document.querySelector('.btn');

addCard.addEventListener('click', async function () {
    const customerChoice = await getValues(); // on attend de recevoir les values (l'objet customerChoice)
    const oneTeddie = await getOneTeddie();

    //on cree un objet avec les information du produit 
    let completeTeddies = {
        name : oneTeddie.name,
        select : customerChoice.optionValue,
        quantity : customerChoice.quantity,
        price : oneTeddie.price,
        image : oneTeddie.imageUrl,
        id : oneTeddie._id
    }
    console.log(completeTeddies);

    let card = JSON.parse(localStorage.getItem('teddie'));

    if(!card) {    //ajoute au tableau ci pas de panier 
        let card = []
        card.push(completeTeddies)
        localStorage.setItem('teddie',JSON.stringify(card))
        window.location.href = `index.html`
    } else if (!card.some(teddie => teddie == teddie.id === completeTeddies.id)){    //si panier verifier que je n'ai pas le meme produit a l'interieur avant d'ajouter le nouveau 
        card.push(completeTeddies)
        localStorage.setItem('teddie',JSON.stringify(card))
        window.location.href = `index.html`
    } else {      //ci je l'ai deja je l'enleve pour le remplacer 
        const newCard = card.filter(teddie => teddie == teddie.id !== completeTeddies.id)
        newCard.push(completeTeddies)
        localStorage.setItem('teddie', JSON.stringify(newCard))
        window.location.href = `index.html`
    }
});


itemNumber = JSON.parse(localStorage.getItem('teddie'))
numberItem = document.querySelector('.item-number')
numberItem.innerHTML = itemNumber.length