const express = require('express')   //pegando o express q eu baixei
const route = express.Router()
const jogador = require('./src/controllers/jogador') //importando o arquivo global.js
const mestre = require('./src/controllers/mestre') //importando o arquivo mestre.js
const dados = require('./src/controllers/dados').dados //importando o arquivo dados.js


// Rotas da raiz do site
route.get('/', jogador.logIn)

//Rotas do mestre
route.get('/mestre', mestre.index)
route.post('/mestre/:jogador', mestre.controle)
route.get('/mestre/:jogador', mestre.controle)
route.get('/mestre/:jogador/resetaDados', mestre.resetaDados)
route.get('/mestre/:jogador/rolagensEstado', mestre.rolagensEstado)
route.post('/mestre/:jogador/exibeRolagem', mestre.exibeRolgem)
route.post('/mestre/:jogador/voltar', mestre.voltar)

//rotas do jogador
route.post('/jogador/:jogador', jogador.jogador)
route.post('/jogador/:jogador/full', jogador.full)
route.post('/jogador/:jogador/d6', dados.d6)
route.post('/jogador/:jogador/d10_1', dados.d10_1)
route.post('/jogador/:jogador/d10_2', dados.d10_2)
route.post('/jogador/:jogador/desafio1', dados.desafio1)
route.post('/jogador/:jogador/desafio2', dados.desafio2)


module.exports = route
