import { Router } from "express";
import pessoaControllers from "../controllers/PessoaController.js";
import jwt from 'jsonwebtoken';

const router = Router();

const autenticarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }
        req.user = user; 
        next();
    });
};

// Rotas
router.post('/usuarios', pessoaControllers.registroDeUsuario);
router.post('/login', pessoaControllers.loginUsuario);
router.post('/veiculos/:idPessoa', pessoaControllers.registroDeVeiculo);
router.delete('/usuarios/:id', autenticarToken, pessoaControllers.deletarUsuario);
router.get('/usuarios/:id', autenticarToken, pessoaControllers.selecionarUsuario); 


export default router;