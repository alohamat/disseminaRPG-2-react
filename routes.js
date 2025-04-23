const express = require('express')   //pegando o express q eu baixei
const route = express.Router()
const jogador = require('./src/controllers/jogador') //importando o arquivo global.js
const mestre = require('./src/controllers/mestre') //importando o arquivo mestre.js


// Rotas da raiz do site
route.get('/', jogador.logIn)

//Rotas do mestre
route.get('/mestre', mestre.index)
route.get('/mestre/resetaDados', mestre.resetaDados)

//rotas do jogador
route.post('/jogador/:jogador', jogador.jogador)
route.post('/jogador/:jogador/full', jogador.full)

module.exports = route
