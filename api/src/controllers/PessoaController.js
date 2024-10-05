import Pessoa from "../models/Classes/PessoaClass.js";
import Telefone from "../models/Classes/TelefoneClass.js";
import Endereco from '../models/Classes/EnderecoClass.js';
import Login from "../models/Classes/LoginClass.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';


const pessoaControllers = {

  //Cadastro de usuarios ADM
  registroDeAdm: async (req, res) => {
    try {
      const { nome, cpf, email, tipo, logradouro, bairro, estado, numero, complemento, cep, telefone, senha } = req.body;

      const personObj = new Pessoa({ id: null, nome, cpf, email, tipo });
      const enderecoObj = new Endereco({ id: null, logradouro, bairro, estado, numero, complemento, cep });
      const telefoneObj = new Telefone({ id: null, telefone });
      const loginObj = new Login({ id: null, perfil: tipo, login: email, senha });

      if (!personObj.validarCampos() || !enderecoObj.validarCampos() || !telefoneObj.validarCampos() || !loginObj.validarCampos()) {
        return res.json({ message: 'O arquivo informado possui informações faltantes' });
      }
      const idPessoa = await personObj.novoRegistroPessoa();
      if (idPessoa != null && idPessoa > 0) {
        const insertIdEnd = await enderecoObj.novoRegistroEnd(idPessoa);
        if (!insertIdEnd) {
          await personObj.deleteRegistroPessoa(idPessoa);
          return res.json({ cadastroMessage: `Usuário não foi registrado` });
        }
        const insertIdTel = await telefoneObj.novoRegistroTel(idPessoa);
        if (!insertIdTel) {
          await personObj.deleteRegistroPessoa(idPessoa);
          await enderecoObj.deleteRegistroEnd(insertIdEnd);
          return res.json({ cadastroMessage: `Usuário não foi registrado` });
        }
        const insertIdLog = await loginObj.novoRegistroLogin(idPessoa);
        if (!insertIdLog) {
          await personObj.deleteRegistroPessoa(idPessoa);
          await telefoneObj.deleteRegistroTel(insertIdTel);
          await enderecoObj.deleteRegistroEnd(insertIdEnd);
          return res.json({ cadastroMessage: `Usuário não foi registrado` });
        }
        return res.json({ cadastroMessage: `Usuário registrado com sucesso` });
      } else {
        return res.json({ cadastroMessage: `Usuário não foi registrado` });
      }
    } catch (e) {
      console.error(e);
      return res.status(500).json({ cadastroMessage: `Usuário não foi registrado, motivo: ${e.message}` });
    }
  },



  selecionarUsuario: async (req, res) => {
    try {
      const id = req.params.id;
      console.log(`Buscando usuário com ID: ${id}`);

      const result = await Pessoa.selectRegistroPessoa(id);

      if (result.length > 0) {
        return res.json({
          selectMessage: `Usuário localizado`,
          person: result[0]
        });
      } else {
        return res.json({ selectMessage: `Usuário não encontrado` });
      }
    } catch (e) {
      console.error(e);
      return res.json({ selectMessage: `Usuário não foi localizado, motivo: ${e.message}` });
    }
  },

  editarUsuario: async (req, res) => {
    try {
      const id = req.params.id;
      const { nome, cpf, email, tipo, logradouro, bairro, estado, numero, complemento, cep, telefone } = req.body;

      if (!nome || !cpf || !email || !tipo || !logradouro || !bairro || !estado || !numero || !cep || !telefone) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
      }

      const pessoa = new Pessoa({ id, nome, cpf, email, tipo });
      await pessoa.atualizarRegistroPessoa();

      const endereco = new Endereco({ id, logradouro, bairro, estado, numero, complemento, cep });
      await endereco.atualizarRegistroEnd();

      const telefoneObj = new Telefone({ id, telefone });
      await telefoneObj.atualizarRegistroTel();

      return res.json({ message: 'Usuário atualizado com sucesso.' });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: `Erro ao atualizar usuário, motivo: ${e.message}` });
    }
  },


  deletarUsuario: async (req, res) => {
    try {
      const id = req.params.id;
      const deletar = new Pessoa(id);
      const usuarioExistente = await Pessoa.selectRegistroPessoa(id);
      if (!usuarioExistente || usuarioExistente.length === 0) {
        return res.json({ deletMessage: `Usuário não encontrado` });
      }
      await deletar.deleteRegistroPessoa(id);

      return res.json({ deletMessage: `Usuário deletado com sucesso` });
    } catch (e) {
      res.status(500).json({ deletMessage: `Não foi possível excluir o usuário, motivo: ${e.message}` });
    }
  },


  loginUsuario: async (req, res) => {
    try {
      const { login, senha } = req.body;

      const usuario = await Login.selecionarUsuarioPorLogin(login);
      if (!usuario || usuario.length === 0) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }
      const senhaValida = await bcrypt.compare(senha, usuario[0].senha);
      if (!senhaValida) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }
      dotenv.config();
      // Gera o token
      const token = jwt.sign({ id: usuario[0].tbl_pessoa_id }, process.env.JWT_SECRET, { expiresIn: '2h' });
      return res.json({ token });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: 'Erro ao fazer login' });
    }
  },

};

export default pessoaControllers;
