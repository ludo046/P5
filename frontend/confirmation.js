let param = window.location.href
const urlPrice = param.split('%price=')
const price = urlPrice[1]
const urlIdCommand = param.split('commandId=')
const urlCommand = urlIdCommand[1]
const justIdCommand = urlCommand.split('%price')
const idCommand = justIdCommand[0]

const command = document.querySelector('.order-number')
command.innerText = idCommand

const displayPrice = document.querySelector('.price-command')
displayPrice.innerText = price
