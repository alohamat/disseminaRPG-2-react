const btnRolagem = document.querySelector('#btnRolagem')
const btnEscolhas = document.querySelector('#btnEscolhas')

const formRolagem = document.querySelector('#formRolagem')
const formEscolha = document.querySelector('#formEscolha')

localStorage.setItem('votou', 'false')
const votou = localStorage.getItem('votou')

btnRolagem.addEventListener('click', () => {
    btnRolagem.disabled = true
    btnEscolhas.disabled = true
    setTimeout(() => {
        btnRolagem.disabled = false
        btnEscolhas.disabled = false
        formRolagem.submit()
    }, 3000)
})

formEscolha.addEventListener('submit', (event) => {
    votou = localStorage.getItem('votou')
    if(votou) {
        event.preventDefault()
    } else {
        localStorage.setItem('votou', 'true')
        formEscolha.submit()
    }
})