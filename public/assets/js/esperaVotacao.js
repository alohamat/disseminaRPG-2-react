const total = document.querySelector('#total')
const jogador = document.querySelector('#jogador-info').dataset.jogador

document.addEventListener('DOMContentLoaded', () => { 
    setInterval(checaRolagens, 5000)
    
    function checaRolagens() {
      fetch(`/mestre/${encodeURIComponent(jogador)}/votacaoEstado`) 
      .then(response => response.json()) 
      .then(data => {
        total.innerHTML = data.escolhas
      }) 
      .catch(error => console.error('Erro:', error))
    }
})