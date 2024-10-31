import { Router } from "express";
import veiculoControllers from "../controllers/VeiculoController.js";
import pessoaControllers from "../controllers/PessoaController.js";
import OsController from "../controllers/OsController.js";
import PecasController from "../controllers/PecasController.js";
import agendamentoController from "../controllers/AgendamentoController.js";
import jwt from 'jsonwebtoken';
import authMiddleware from "../../Middlewares/authMiddlewares.js";
import osController from '../controllers/OsController.js';

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
router.post('/usuarios', pessoaControllers.registroDeAdm);
// Rotas protegidas (exige token)
router.post('/adm/usuarios', authMiddleware, pessoaControllers.registroDeAdm); 
// rota para buscar uma pessoa cadastrada
router.get('/usuario/email/:email', authMiddleware, pessoaControllers.selecionarUsuarioPorEmail);
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
//Rota para Buscar veículo por placa
router.post('/veiculo/placa', autenticarToken, veiculoControllers.buscarVeiculoPorPlaca);

// ROTAS : OS

// rota para Cadastro de OS
router.post('/os', autenticarToken, OsController.registroDeOS);
// rota para Busca de OSs
router.get('/os/:idPessoa', autenticarToken, osController.buscarOrcamentoPorPessoa);
// rota para buscar todos os os 
router.get('/orcamentos', autenticarToken, osController.buscarTodosOrcamentos);
// Rota para editar OS
router.put('/os/:id', autenticarToken, OsController.editarOS);
// Rota para deletar OS 
router.delete('/os/:id', autenticarToken, OsController.deletarOS);

router.get('/osPecas/:id', autenticarToken, OsController.buscarItensOs);

// ROTAS : AGENDAMENTO

// rota para Cadastro de AGENDAMENTO
router.post('/agendar', autenticarToken, agendamentoController.registroDeAgendamento);
// Rota para Busca de AGENDAMENTO por ID da pessoa
router.get('/agendar/pessoa/:idPessoa', autenticarToken, agendamentoController.buscarAgendamentoPorPessoa);
// Rota para listar todos os agendamentos
router.get('/agendamentos',  autenticarToken, agendamentoController.listarAgendamentos);
// Rota para editar AGENDAMENTO
router.put('/agendar/:id', autenticarToken, agendamentoController.editarAgendamento);
// Rota para deletar AGENDAMENTO 
router.delete('/agendar/:id', autenticarToken, agendamentoController.deletarAgendamento);

// ROTAS : PEÇAS

// rota para Cadastro de PEÇAS
router.post('/pecas/', autenticarToken, PecasController.registroDePecas);
// rota para Busca de  por id
router.get('/pecas/:idPro', autenticarToken, PecasController.buscarPecas);
// rota para buscar todas as peças 
router.get('/pecas', autenticarToken, PecasController.listarPecas);
// Rota para editar PEÇAS
router.put('/pecas/:id', autenticarToken, PecasController.editarPecas);
// Rota para deletar PEÇAS 
router.delete('/pecas/:id', autenticarToken, PecasController.deletarPecas);


export default router;