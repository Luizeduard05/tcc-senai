import express from "express";
import router from "./src/routes/routs.js";
import bodyParser from 'body-parser';
import cors from 'cors'


const app = express();
const port = 5000;

const { json, urlencoded } = bodyParser;

app.use(json());
app.use(urlencoded({ extended: false }));
app.use('/', router);
app.use(cors());

app.listen(port, () => {
    console.log(`Servidor respondendo na porta ${port}`);
});