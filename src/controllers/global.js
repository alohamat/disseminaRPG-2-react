let d6 = [], d10_1 = [], d10_2 = []
let rolagensD6 = 0, rolagensD10_1 = 0, rolagensD10_2 = 0
let rolagemAberta = false, votacaoAberta = false
let votosItem = 0, votosFugir = 0, votosRanged = 0, votosMeele = 0
let passoAtual = -1, votacaoAtual = 0, mensagemVotacao

console.log(d6, d10_1, d10_2, rolagensD6, rolagensD10_1, rolagensD10_2, rolagemAberta, votacaoAberta, votosItem, votosFugir, votosRanged, votosMeele, passoAtual, votacaoAtual, mensagemVotacao)

function maioria() {
    const maior = Math.max(votosItem, votosFugir, votosMeele, votosRanged)
    if (maior === votosRanged) { 
        return `Ataque à distância`
    } else if (maior === votosMeele) { 
        return `Ataque corpo-a-corpo`
    } else if (maior === votosItem) { 
        return `Usar Item`
    } else { 
        return `Fugir`
    }
}

function resetaDado(dado, lados) {
    for (let i=0; i<lados; i++) {
        dado[i] = 0
    }
}

function moda(dado, lados) {
    let resultado = 0, check = 0
    for (let i=0; i<lados; i++) {
        if (lados==6 && dado[i] >= check) {
            check = dado[i]
            resultado = i
        }
        if (lados==10 && dado[i] > check) {
            check = dado[i]
            resultado = i
        }
    }
    resultado++
    return resultado
}

function resolucaoIronsworn(total, desafio1, desafio2) {
    let resolucao
    if (total > desafio1 && total > desafio2 && desafio1 == desafio2)
        resolucao = 'Acerto Crítico!' 
    else if (total > desafio1 && total > desafio2)
        resolucao = 'Acerto Forte!'
    else if (total <= desafio1 && total <= desafio2 && desafio1 == desafio2)
        resolucao = 'Erro Crítico!'
    else if (total <= desafio1 && total <= desafio2)
        resolucao = 'Erro!'
    else
        resolucao = 'Acerto Fraco.'
    return resolucao
}



module.exports.recursos = {
    d6,
    d10_1,
    d10_2,
    rolagensD6,
    rolagensD10_1,
    rolagensD10_2,
    rolagemAberta,
    votacaoAberta,
    votosItem,
    votosFugir,
    votosRanged,
    votosMeele,
    passoAtual,
    votacaoAtual,
    mensagemVotacao,
    resetaDado,
    moda,
    maioria,
    resolucaoIronsworn
}

