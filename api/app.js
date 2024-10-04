const express = require("express");
const router = require('./src/routes/routesapp')
const expressLayouts = require('express-ejs-layouts');
require("dotenv-safe").config();

const app = express();
const port = 5000;

const { json, urlencoded } = bodyParser;

// Configurar o BodyParser
app.use(json());
app.use(urlencoded({ extended: false }));
app.use('/', router);

// INICIA O SERVIDOR NA PORTA INFORMADA
app.listen(port, () => {
    console.log(`Servidor respondendo na porta ${port}`);
});