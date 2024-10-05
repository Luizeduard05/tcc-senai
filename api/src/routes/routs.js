import { Router } from "express";
import { veiculoControllers } from "../controllers/VeiculoController.js";
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

// ROTAS : PESSOA

// rota para cadastrar uma pessoa 
router.post('/usuarios/adm', pessoaControllers.registroDeAdm);
// rota para buscar uma pessoa cadastrada
router.get('/usuarios/:id', autenticarToken, pessoaControllers.selecionarUsuario); 
// rota para editar uma pessoa cadastrada
router.put('/usuarios/:id', autenticarToken, pessoaControllers.editarUsuario);
// rora para deletar uma pessoa cadastrada
router.delete('/usuarios/:id', autenticarToken, pessoaControllers.deletarUsuario);
// rota para efetuar o login de uma pessoa
router.post('/login', pessoaControllers.loginUsuario);

// ROTAS : VEICULO

// rota para Cadastro de veículo
router.post('/veiculos/:idPessoa', autenticarToken, veiculoControllers.registroDeVeiculo); 
// rota para Busca de veículos por pessoa
router.get('/veiculos/:idPessoa', autenticarToken, veiculoControllers.buscarVeiculosPorPessoa); 
// Rota para editar veículo
router.put('/veiculos/:id', autenticarToken, veiculoControllers.editarVeiculo); 
// Rota para deletar veículo 
router.delete('/veiculos/:id', autenticarToken, veiculoControllers.deletarVeiculo); 





export default router;