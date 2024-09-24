const express = require('express');
const router = express.Router();
const redirecionamentoControllers = require('../controllers/redirecionamento');

router.get('/home', redirecionamentoControllers.direcionamentoHome );
router.get('/', redirecionamentoControllers.direcionamentoHome );

module.exports = router;