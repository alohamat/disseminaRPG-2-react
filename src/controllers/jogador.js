const recursos = require('../controllers/global').recursos
const dados = require('../controllers/dados').dados

exports.logIn = (req, res) => {
    res.render('login')
}

exports.jogador = (req, res) => {
    res.render('jogador', {
        dado:'full', 
        nomeDado: 'Dados', 
        passoAtual: recursos.passoAtual, 
        votacaoAtual: recursos.votacaoAtual, 
        votacaoAberta: recursos.votacaoAberta, 
        resultadoVotacao: recursos.mensagemVotacao, 
        votosFugir: recursos.votosFugir, 
        votosItem: recursos.votosItem, 
        votosMeele: recursos.votosMeele, 
        votosRanged: recursos.votosRanged,
        jogador: req.params.jogador
    })
}

exports.full = (req, res) => {
    if (recursos.rolagemAberta) {
        
        rollD6 = Math.floor(Math.random()*6)
        recursos.d6[rollD6] = recursos.d6[rollD6] + 1
        rollD6 = rollD6+1
        recursos.rolagensD6++
        
        rollD10_1 = Math.floor(Math.random()*10)
        recursos.d10_1[rollD10_1] = recursos.d10_1[rollD10_1] + 1
        rollD10_1 = rollD10_1+1
        recursos.rolagensD10_1++
        
        rollD10_2 = Math.floor(Math.random()*10)
        recursos.d10_2[rollD10_2] = recursos.d10_2[rollD10_2] + 1
        rollD10_2 = rollD10_2+1
        recursos.rolagensD10_2++
        
        resultado = `Dado de ação (D6): ${rollD6} <br> Dado de desafio 1 (D10): ${rollD10_1} <br> Dado de desafio 2 (D10): ${rollD10_2}`
        resolucao = `Desconsiderando bônus/penalidade sua rolagem seria um: ${recursos.resolucaoIronsworn(rollD6, rollD10_1, rollD10_2)}`
        console.log(`${recursos.rolagensD10_2} rolagens no total, Dado de ação (D6): ${rollD6}`)

        res.render('jogador', {
            dado:'full', 
            nomeDado: 'Dados', 
            resultado, 
            rolagem: recursos.rolagensD6, 
            resolucao: resolucao, 
            passoAtual: recursos.passoAtual, 
            votacaoAberta: recursos.votacaoAberta, 
            votacaoAtual: recursos.votacaoAtual, 
            votosFugir: recursos.votosFugir, 
            votosItem: recursos.votosItem, 
            votosMeele: recursos.votosMeele, 
            votosRanged: recursos.votosRanged,
            jogador: req.params.jogador
        })
    } else {
        res.render('jogador', {
            dado:'full', 
            nomeDado: 'Dados', 
            mensagem:'Rolagem de dados bloqueada pelo mestre do jogo.', 
            passoAtual: recursos.passoAtual, 
            votacaoAberta: recursos.votacaoAberta, 
            votacaoAtual: recursos.votacaoAtual, 
            votosFugir: recursos.votosFugir, 
            votosItem: recursos.votosItem, 
            votosMeele: recursos.votosMeele, 
            votosRanged: recursos.votosRanged,
            jogador: req.params.jogador        
        })
    }
}