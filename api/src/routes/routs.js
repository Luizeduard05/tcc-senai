import  {Router}  from "express";
const router = Router();
import pessoaControllers from "../controllers/PessoaController.js";

// Rota para registrar um novo usuário
router.post('/usuarios', pessoaControllers.registroDeUsuario);
router.get('/usuarios/:id', pessoaControllers.selecionarUsuario);
router.delete('/usuarios/:id',pessoaControllers.deletarUsuario);
export default router