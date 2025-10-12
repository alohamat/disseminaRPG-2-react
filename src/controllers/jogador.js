const personagens = require('../controllers/global').personagens
const dados = require('../controllers/dados').dados

exports.logIn = (req, res) => {
    res.render('login')
}

exports.jogador = (req, res) => {
    res.render('jogador', {
        dado:'full', 
        rolou:false,
        nomeDado: 'Dados', 
        passoAtual: personagens[String(req.params.jogador)].passoAtual, 
        votacaoAtual: personagens[String(req.params.jogador)].votacaoAtual, 
        votacaoAberta: personagens[String(req.params.jogador)].votacaoAberta, 
        resultadoVotacao: personagens[String(req.params.jogador)].mensagemVotacao, 
        jogador: req.params.jogador
    })
}

exports.full = (req, res) => {
    
    if (personagens[String(req.params.jogador)].rolagemAberta) {
        
        rollD6 = Math.floor(Math.random()*6)
        personagens[String(req.params.jogador)].d6[rollD6] = personagens[String(req.params.jogador)].d6[rollD6] + 1
        rollD6 = rollD6+1
        personagens[String(req.params.jogador)].rolagensD6++
        
        rollD10_1 = Math.floor(Math.random()*10)
        personagens[String(req.params.jogador)].d10_1[rollD10_1] = personagens[String(req.params.jogador)].d10_1[rollD10_1] + 1
        rollD10_1 = rollD10_1+1
        personagens[String(req.params.jogador)].rolagensD10_1++
        
        rollD10_2 = Math.floor(Math.random()*10)
        personagens[String(req.params.jogador)].d10_2[rollD10_2] = personagens[String(req.params.jogador)].d10_2[rollD10_2] + 1
        rollD10_2 = rollD10_2+1
        personagens[String(req.params.jogador)].rolagensD10_2++
        
        resultado = `Dado de ação (D6): ${rollD6} <br> <h1>Dado de desafio 1 (D10): ${rollD10_1}</h1> <br> <h1>Dado de desafio 2 (D10): ${rollD10_2}</h1>`
        resolucao = `Desconsiderando bônus/penalidade sua rolagem seria um: ${personagens[String(req.params.jogador)].resolucaoIronsworn(rollD6, rollD10_1, rollD10_2)}`
        console.log(`${personagens[String(req.params.jogador)].rolagensD10_2} rolagens no total, Dado de ação (D6): ${rollD6}`)

        res.render('jogador', {
            dado:'full', 
            nomeDado: 'Dados', 
            d_acao: rollD6,
            d_desafio_1: rollD10_1,
            d_desafio_2: rollD10_2,
            resolucao: personagens[String(req.params.jogador)].resolucaoIronsworn(rollD6, rollD10_1, rollD10_2),
            rolou:true, 
            passoAtual: personagens[String(req.params.jogador)].passoAtual, 
            votacaoAberta: personagens[String(req.params.jogador)].votacaoAberta, 
            votacaoAtual: personagens[String(req.params.jogador)].votacaoAtual, 
            jogador: req.params.jogador
        })
    } else {
        res.render('jogador', {
            dado:'full', 
            rolou:false, 
            nomeDado: 'Dados', 
            mensagem:'Rolagem de dados bloqueada pelo mestre do jogo.', 
            passoAtual: personagens[String(req.params.jogador)].passoAtual, 
            votacaoAberta: personagens[String(req.params.jogador)].votacaoAberta, 
            votacaoAtual: personagens[String(req.params.jogador)].votacaoAtual, 
            jogador: req.params.jogador        
        })
    }
}

exports.votacao = (req, res) => {
    if(personagens[String(req.params.jogador)].votacaoAberta) {
        res.render('votar', {
            jogador: req.params.jogador,
            opcoes: personagens[String(req.params.jogador)].opcoes,
            votacaoAberta: personagens[String(req.params.jogador)].votacaoAberta
        })
    } else {
        res.redirect(`/jogador/${req.params.jogador}`)
    }
}

exports.depositaVoto = (req, res) => {
    console.log(`Voto: ${req.params.voto}`)
    for(let opcao in personagens[String(req.params.jogador)].opcoes) {
        if(req.params.voto == personagens[String(req.params.jogador)].opcoes[opcao]) {
            personagens[String(req.params.jogador)].votacao[opcao]++
        }
    }
    personagens[String(req.params.jogador)].votacaoAtual++

    res.redirect(`/jogador/${req.params.jogador}`)
}