function getTeddies(){
    //appel de l'api
    fetch("http://localhost:3000/api/teddies")
    .then(response =>{
        response.json()
        .then((allTeddies) => {
            //creation des cartes produit
           for(let i = 0; i < allTeddies.length; i++){
            const card = document.createElement('li')
            card.classList.add('card')
            const image = document.createElement('img')
            image.src = allTeddies[i].imageUrl
            const name = document.createElement('h2')
            name.innerHTML = allTeddies[i].name;
            const price = document.createElement('h3')
            price.innerHTML = allTeddies[i].price/100 + '.00€';
            const link =document.createElement('a')
            link.setAttribute('href', 'produit.html?id=' + allTeddies[i]._id)

            link.appendChild(image)
            link.appendChild(name)
            link.appendChild(price)
            card.appendChild(link)
            teddiesList.appendChild(card)
           }
           
        }) 
    })
}
getTeddies();

