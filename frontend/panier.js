let teddie = JSON.parse(localStorage.getItem('teddie'))
let sex = document.querySelectorAll(".genre")
const cmdBtn = document.querySelector('.btn')

function displayBasket(){
    basketProduct = JSON.parse(localStorage.getItem('teddie'))
    //console.log(basketProduct);

    const basket = document.querySelector('.basket')
    if (basketProduct !== null){     // si il ya des articles dans le panier affiche les 
        basketProduct.forEach(function(items){   // boucle pour cree chaque element du panier tant quil ya des articles a afficher
            const list = document.createElement('li')
            list.classList.add('list-basket')
            const productImage = document.createElement('img')
            productImage.src = items.image
            productImage.classList.add('img-basket')
            const info = document.createElement('div')
            info.classList.add('info-basket')
            let productName = document.createElement('h2')
            productName.classList.add('product-name')
            productName.innerText = items.name
            let price = document.createElement('p')
            price.innerText = items.price/100+'.00 €'
            let colour = document.createElement('p')
            colour.innerText = items.select
            let quantity = document.createElement('p')
            quantity.innerText = items.quantity
            const stock = document.createElement('p')
            stock.innerText = 'En stock'
            const trash = document.createElement('button')
            trash.classList.add('trash')
            trash.innerText = 'supprimer produit'
            trash.onclick = function(){deleteProduct(items.id)}

            basket.appendChild(list)
            list.appendChild(productImage)
            list.appendChild(info)
            info.appendChild(productName)
            info.appendChild(price)
            info.appendChild(colour)
            info.appendChild(quantity)
            info.appendChild(stock)
            info.appendChild(trash)
            
            //trash.addEventListener('click', deleteProduct(items.id))

        })
    } else {    // ci il n'y a pas d'article affiche le message 'panier vide'
        const infoAnyProduct = document.createElement('li')
        infoAnyProduct.classList.add('list-basket')
        const anyProduct = document.createElement('h2')
        anyProduct.classList.add('any-item')
        anyProduct.style.margin = '10px auto'
        anyProduct.innerText = 'Votre panier est vide';

        const form = document.querySelector('.form')
        form.style.display = 'none'  // enleve le formulaire de commande en cas de panier vide 

        basket.appendChild(infoAnyProduct) 
        infoAnyProduct.appendChild(anyProduct)
    }
}
displayBasket()

function deleteProduct(id){
    let deleteItem = JSON.parse(localStorage.getItem('teddie'))
    const update = deleteItem.filter((items) => items.id !== id)
    localStorage.setItem('teddie',JSON.stringify(update))
    if (update == 0){
        localStorage.clear()
    }
    document.location.href = 'panier.html'
}

function getprice(){   // fonction de calcul du prix total
    let totalPrice = 0 
    JSON.parse(localStorage.getItem('teddie')).forEach((items)=>{   //boucle pour calculer le prix total en foction du nombre d'article et de la quantité de chacun 
        totalPrice += items.price*items.quantity/100
    })
    const total = document.querySelector('.total')   // affichage du prix total 
    orderPrice = document.createElement('p')
    orderPrice.innerText = totalPrice +'. 00 €'

    total.appendChild(orderPrice)
}
getprice()

// ============================ FORMULAIRE =================================
const lastName = document.getElementById('name')
const firstName = document.getElementById('first-name')
const mail = document.getElementById('mail')
const address = document.getElementById('address')
const city = document.getElementById('city')

const form = document.getElementById('form')

form.addEventListener('submit',(e) => {
    e.preventDefault()


        let contact = {
            lastName : lastName.value,
            firstName : firstName.value,
            email : mail.value,
            address : address.value,
            city : city.value
        }
        let products = [];
    
            teddie.forEach(p => {
                products.push(p.id)
            })
        
        let commandeContact = JSON.stringify({
            contact, products
    
        })
        console.log(commandeContact);
        fetch('http://localhost:3000/api/teddies/order',{
            method: 'POST',
            body: commandeContact,
            headers:{
                'Content-Type':'application/json',
            },
            
        }).then(response => {
            return response.json()
        }).then ((r) => {
        const orderId = r.orderId;
        if (orderId == undefined) {
            alert('veuillez remplir tous les champs')
        } else {
            window.location.href = `confirmation.html?commandId=${orderId}`
            localStorage.removeItem('teddie')
        }
        })
        .catch((error) => {
            alert(error)
        })
    }

    
)

itemNumber = JSON.parse(localStorage.getItem('teddie'))
numberItem = document.querySelector('.item-number')
numberItem.innerHTML = itemNumber.length

