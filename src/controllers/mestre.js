const recursos = require('../controllers/global').recursos


exports.index = (req, res) => {
    res.render('mestre')
}

exports.resetaDados = (req, res) => {
    recursos.resetaDado(recursos.d6, 6)
    recursos.rolagensD6 = 0
    recursos.resetaDado(recursos.d10_1, 10)
    recursos.rolagensD10_1 = 0
    recursos.resetaDado(recursos.d10_2, 10)
    recursos.rolagensD10_2 = 0
    recursos.rolagemAberta = true
    res.render('esperaRolagens')
}