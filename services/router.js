//Configuração de rotas
//Plugins
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');

//Arquivo controlador do carrinho
const cart = require('../controllers/CartController.js');

//Iniciando o roteador do Express
const router = new express.Router();

//Configurando o roteador
router.use("/", cors()) //Habilitando o cors para chamadas em aplicações
router.use("/", bodyParser.json()); //Converte o body das requisições em json;


//------------------------Endpoints------------------------
router.route('/cart/simulate').post(cart.checkout);
router.route('/produtos/:id?').get(cart.getProduct);


module.exports = router;