import express from "express";
import router from "./src/routes/routs.js";
import bodyParser from 'body-parser';
// require("dotenv-safe").config();
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