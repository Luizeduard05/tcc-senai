import Pessoa from "../models/Classes/PessoaClass.js";
import Telefone from "../models/Classes/TelefoneClass.js";
import Endereco from '../models/Classes/EnderecoClass.js';
import Login from "../models/Classes/LoginClass.js";

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
        return res.json({ cadastroMessage: `Usuário registrado com sucesso` });
      } else {
        return res.json({ cadastroMessage: `Usuário não foi registrado` });
      }
    } catch (e) {
      console.error(e);
      return res.json({ cadastroMessage: `Usuário não foi registrado, motivo: ${e.message}` });
    }
  },

  //Trazer usuario pra tela atraves do ID
  selecionarUsuario: async (req, res) => {
    try {
      const id = req.params.id;
      console.log(`Buscando usuário com ID: ${id}`);
      const [person, tel, end, login] = await Promise.all([
        Pessoa.selectRegistroPessoa(id),
        Telefone.selectRegistroTelefone(id),
        Endereco.selectRegistroEndereço(id),
        Login.selectRegistroLogin(id)
      ]);
      console.log(`Resultados da busca:`, { person, tel, end, login });
      if (person && person.length > 0) {
        return res.json({
          selectMessage: `Usuário localizado`,
          person: person[0],
          telefone: tel[0],
          endereco: end[0],
          login: login[0]
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
      const deletar = new Pessoa(id)
      // Aqui você pode verificar se o usuário existe
      const usuarioExistente = await Pessoa.selectRegistroPessoa(id);
      if (!usuarioExistente || usuarioExistente.length === 0) {
        return res.json({ deletMessage: `Usuário não encontrado` });
      }
      deletar.deleteRegistroPessoa(id);
      return res.json({ deletMessage: `Usuário deletado com sucesso` });
    } catch (e) {
      res.json({ deletMessage: `Não foi possiel excluir o usuário, motivo: ${e.message}` });
    }
  },
};

export default pessoaControllers;