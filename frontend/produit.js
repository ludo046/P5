let param = new URLSearchParams(document.location.search);
let id = param.get('id')
console.log(id);

function getOneTeddie(){
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
        for (let i in oneTeddie.colors){
            select.innerHTML += `<option value='${oneTeddie.colors[i]}' selected='selected'>${oneTeddie.colors[i]}</option>`
        }
        const quantity = document.querySelector('.input')
        localStorage.setItem(id, oneTeddie._id)
        localStorage.setItem(select, colors)
    })
}
getOneTeddie()