import  {Router}  from "express";
const router = Router();
import pessoaControllers from "../controllers/PessoaController.js";

// Rota para registrar um novo usuário
router.post('/usuarios', pessoaControllers.registroDeUsuario);

export default router