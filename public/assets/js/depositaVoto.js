const opcoesContainer = document.getElementById('opcoesContainer')
const opcoes = document.querySelector('#opcoes-info').dataset.opcoes.split(',')
const jogador = document.querySelector('#jogador-info').dataset.jogador

document.addEventListener('DOMContentLoaded', () => {
    opcoes.forEach(opcao => {
        const form = document.createElement('form')
        form.action = `/jogador/${encodeURIComponent(jogador)}/votacao/${encodeURIComponent(opcao)}`
        form.method = 'POST'

        const button = document.createElement('button')
        button.textContent = opcao
        button.type = 'submit'
        form.appendChild(button)
        opcoesContainer.appendChild(form)
    })

    localStorage.setItem('votou', 'false')    
})