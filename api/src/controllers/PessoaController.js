import Pessoa from "../models/Classes/PessoaClass.js";
import Telefone from "../models/Classes/TelefoneClass.js";
import Endereco from '../models/Classes/EnderecoClass.js';
import Login from "../models/Classes/LoginClass.js";

const pessoaControllers = {
  registroDeUsuario: async (req, res) => {
    try {
      // Desestruturação dos dados do corpo da requisição
      const { nome, cpf, email, tipo, logradouro, bairro, estado, numero, complemento, cep, telefone, perfil, login, senha } = req.body;

      const personObj = new Pessoa({ id: null, nome, cpf, email, tipo });
      const enderecoObj = new Endereco({ id: null, logradouro, bairro, estado, numero, complemento, cep });
      const telefoneObj = new Telefone({ id: null, telefone });
      const loginObj = new Login({ id: null, perfil, login, senha });

      //Validação de campos
      if (!personObj.validarCampos() || !enderecoObj.validarCampos() || !telefoneObj.validarCampos() || !loginObj.validarCampos()) {
        console.log(`O arquivo informado possui informações faltantes`);
        return res.json({ message: `O arquivo informado possui informações faltantes` });
      }

      // Criar instância de Pessoa
      const idPessoa = await personObj.novoRegistroPessoa();

      // Criar instância de Endereco
      if (idPessoa != null && idPessoa > 0) {
        let insertIdEnd = enderecoObj.novoRegistroEnd(idPessoa);
        if (insertIdEnd == null || insertIdEnd == undefined || insertIdEnd == "") {
          personObj.deleteRegistroPessoa(idPessoa);
          res.json({ cadastroMessage: `Usuário não foi registrado`});
        }

        // Criar instância de Telefone
        if (idPessoa != null && idPessoa > 0) {
          let insertIdTel = telefoneObj.novoRegistroTel(idPessoa);
          if (insertIdTel == null || insertIdTel == undefined || insertIdTel == "") {
            personObj.deleteRegistroPessoa(idPessoa);
            enderecoObj.deleteRegistroEnd(insertIdEnd);
            res.json({ cadastroMessage: `Usuário não foi registrado`});
          }

          //Criar instância do Login
          if (idPessoa != null && idPessoa > 0) {
            let insertIdLog = loginObj.novoRegistroLogin(idPessoa);
            if (insertIdLog == null || insertIdLog == undefined || insertIdLog == "") {
              personObj.deleteRegistroPessoa(idPessoa);
              telefoneObj.deleteRegistroTel(insertIdTel);
              res.json({ cadastroMessage: `Usuário não foi registrado`});
            }
          }
        }
        res.json({ cadastroMessage: `Usuário registrado com sucesso`});
      } else {
        res.json({ cadastroMessage: `Usuário não foi registrado`});
      }
    } catch (e) {
      res.json({ cadastroMessage: `Usuário não foi registrado, motivo: ${e}`});
    }
  },

  selecionarUsuario: async (req, res) => {
    try{
      console.log(req.body.id);
      let person = await Pessoa.selectRegistroPessoa(req.body.idPessoa);
      console.log(person[0][1]);
      return res.json({selectMessage: `Usuario localizado`, person, success:false});
    }catch (e) {
      res.json({ selectMessage: `Usuário não foi localizado, motivo: ${e}`});
      console.log(e)
    }
  },
};

export default pessoaControllers;