const btnCriaOpcao = document.querySelector("#criaOpcao")
const divOpcoes = document.querySelector("#opcoes")



document.addEventListener('click', (e) => {
    const elemento = e.target
    if(elemento.id == 'criaOpcao') {
        console.log('oi')
        const inputOpcao = document.createElement("input")
        inputOpcao.type = "text"
        inputOpcao.name = "opcao[]"
        inputOpcao.placeholder = "Digite uma opção"
        
        const btnDeleteOpcao = document.createElement("button")
        btnDeleteOpcao.textContent = "X"
        btnDeleteOpcao.classList.add("btnDeleteOpcao")
        
        const opcaoContainer = document.createElement("div")
        opcaoContainer.appendChild(inputOpcao)
        opcaoContainer.appendChild(btnDeleteOpcao)
        divOpcoes.appendChild(opcaoContainer)
    }

    if(elemento.classList.contains('btnDeleteOpcao')) {
        elemento.parentElement.remove()
    }
})