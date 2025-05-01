const btnRolagem = document.querySelector('#btnRolagem')
const btnEscolhas = document.querySelector('#btnEscolhas')

const formRolagem = document.querySelector('#formRolagem')

btnRolagem.addEventListener('click', () => {
    btnRolagem.disabled = true
    btnEscolhas.disabled = true
    setTimeout(() => {
        btnRolagem.disabled = false
        btnEscolhas.disabled = false
        formRolagem.submit()
    }, 3000)
})