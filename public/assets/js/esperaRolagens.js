//código do arquigo esperaRolagens.ejs, serve pra atualizar a contagem de rolagens que o mestre ta vendo e pra checar se ele colocou bonus ou penalidade.

const total = document.querySelector('#total')
const checaBonus = document.querySelector('#checaBonus')
const jogador = document.querySelector('#jogador-info').dataset.jogador



console.log(jogador)
checaBonus.addEventListener('click', () => {
  if (bonus.value == "") {
    alert('Você esqueceu de digitar o bônus/penalidade, Mestre.');
  } else {
    formExibirRolagens.submit();
  }
})

document.addEventListener('DOMContentLoaded', () => {
  setInterval(checaRolagens, 5000)

  function checaRolagens() {
    fetch(`/mestre/${encodeURIComponent(jogador)}/rolagensEstado`)
      .then(response => response.json())
      .then(data => {
        total.innerHTML = data.rolagens
      })
      .catch(error => console.error('Erro:', error))
  }
})