const param = new URLSearchParams(document.location.search);
const commandId = param.get('commandId');
console.log(commandId);

const idCommand = document.querySelector('.order-number')
idCommand.innerText = commandId