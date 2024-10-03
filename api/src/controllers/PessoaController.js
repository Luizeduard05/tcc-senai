import Pessoa from "../models/Classes/PessoaClass.js";
import Telefone from "../models/Classes/TelefoneClass.js";
import Endereco from '../models/Classes/EnderecoClass.js';
import Login from "../models/Classes/LoginClass.js";
import Veiculo from "../models/Classes/VeiculoClass.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';


const pessoaControllers = {

  //Cadastro de usuarios
  registroDeUsuario: async (req, res) => {
    try {
      // Desestruturação dos dados do corpo da requisição
      const { nome, cpf, email, tipo, logradouro, bairro, estado, numero, complemento, cep, telefone, perfil, login, senha } = req.body;
      const personObj = new Pessoa({ id: null, nome, cpf, email, tipo });
      const enderecoObj = new Endereco({ id: null, logradouro, bairro, estado, numero, complemento, cep });
      const telefoneObj = new Telefone({ id: null, telefone });
      const loginObj = new Login({ id: null, perfil, login, senha });
      // Validação de campos
      if (!personObj.validarCampos() || !enderecoObj.validarCampos() || !telefoneObj.validarCampos() || !loginObj.validarCampos()) {
        console.log(`O arquivo informado possui informações faltantes`);
        return res.json({ message: `O arquivo informado possui informações faltantes` });
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
        // const insertIdVei = await veiculoObj.novoRegistroVeiculo(idPessoa);
        // if (!insertIdVei) {
        //   await personObj.deleteRegistroPessoa(idPessoa);
        //   await telefoneObj.deleteRegistroTel(insertIdTel);
        //   await loginObj.deleteRegistroLogin(insertIdLog);
        //   return res.json({ veiculoMessage: `Veiculo não foi registrado` });
        // }
        return res.json({ cadastroMessage: `Usuário registrado com sucesso` });
      } else {
        return res.json({ cadastroMessage: `Usuário não foi registrado` });
      }
    } catch (e) {
      console.error(e);
      return res.json({ cadastroMessage: `Usuário não foi registrado, motivo: ${e.message}` });
    }
  },

  //Cadastro de veiculos
  registroDeVeiculo: async (req, res) => {
    try {
      const { placa, marca, modelo, ano } = req.body;
      const veiculoObj = new Veiculo({ id: null, placa, marca, modelo, ano });
      // Validação de campos
      if (!veiculoObj.validarCampos()) {
        console.log(`O arquivo informado possui informações faltantes`);
        return res.json({ message: `O arquivo informado possui informações faltantes` });
      }
      const idVeiculo = await veiculoObj.novoRegistroVeiculo();

    } catch (e) {
      return res.json({ cadastroMessage: `Veiculo não foi registrado, motivo: ${e.message}` });
    }
  },

  //Trazer usuario pra tela atraves do Id da tbl_pessoa
  selecionarUsuario: async (req, res) => {
    try {
      const id = req.params.id; // O ID do usuário a ser buscado
      console.log(`Buscando usuário com ID: ${id}`);

      // Chamando o método da classe Pessoa
      const result = await Pessoa.selectRegistroPessoa(id);

      // Verifica se a consulta retornou dados
      if (result.length > 0) {
        return res.json({
          selectMessage: `Usuário localizado`,
          person: result[0] // Primeiro registro retornado da consulta
        });
      } else {
        return res.json({ selectMessage: `Usuário não encontrado` });
      }
    } catch (e) {
      console.error(e);
      return res.json({ selectMessage: `Usuário não foi localizado, motivo: ${e.message}` });
    }
  },


  deletarUsuario: async (req, res) => {
    try {
      const id = req.params.id;
      const deletar = new Pessoa(id);

      // verificar se o usuário existe
      const usuarioExistente = await Pessoa.selectRegistroPessoa(id);
      if (!usuarioExistente || usuarioExistente.length === 0) {
        return res.json({ deletMessage: `Usuário não encontrado` });
      }

      // Chama a função para deletar o registro
      await deletar.deleteRegistroPessoa(id);

      return res.json({ deletMessage: `Usuário deletado com sucesso` });
    } catch (e) {
      res.status(500).json({ deletMessage: `Não foi possível excluir o usuário, motivo: ${e.message}` });
    }
  },


  loginUsuario: async (req, res) => {
    try {
      const { login, senha } = req.body;

      // Verifica se o usuário existe
      const usuario = await Login.selecionarUsuarioPorLogin(login);
      if (!usuario || usuario.length === 0) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      // Verifica a senha
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