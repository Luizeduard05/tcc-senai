import Pessoa from "../models/Classes/PessoaClass.js";
import Telefone from "../models/Classes/TelefoneClass.js";
import Endereco from '../models/Classes/EnderecoClass.js';
import novoRegistroPessoa from '../models/Queries/PessoaQueries.js'

const pessoaControllers = {
  registroDeUsuario: async (req, res) => {
    try {
      // Desestruturação dos dados do corpo da requisição
      const { nome, cpf, email, tipo, logradouro, bairro, estado, numero, complemento, cep, telefone } = req.body;

      // Criar instância de Pessoa
      const personObj = new Pessoa({ id: null, nome, cpf, email, tipo });
      const enderecoObj = new Endereco({ id: null, logradouro, bairro, estado, numero, complemento, cep });
      const telefoneObj = new Telefone({ id: null, telefone });
      const idPessoa = await personObj.novoRegistroPessoa();

      //Validação de campos
      if (!newCliente.validarCampos()) {
        console.log(`O arquivo informado possui informações faltantes`);
        return { itemNome: newCliente.nome, itemCpf: newCliente.cpf, message: `O arquivo informado possui informações faltantes` }
      }

      // Criar instância de Endereco
      if (idPessoa != null && idPessoa > 0) {

        let insertIdEnd = enderecoObj.novoRegistroEnd(idPessoa);

        if (insertIdEnd == null || insertIdEnd == undefined || insertIdEnd == "") {
          personObj.deleteRegistroPessoa(idPessoa);
          res.json({ cadastroMessage: `Usuário não foi registrado`, result: false });
        }

        // Criar instância de Telefone
        if (idPessoa != null && idPessoa > 0) {

          let insertIdTel = telefoneObj.novoRegistroTel(idPessoa);

          if (insertIdTel == null || insertIdTel == undefined || insertIdTel == "") {
            personObj.deleteRegistroPessoa(idPessoa);
            enderecoObj.deleteRegistroEnd(insertIdEnd);
            res.json({ cadastroMessage: `Usuário não foi registrado`, result: false });
          }
        }
      } else {
        res.json({ cadastroMessage: `Usuário não foi registrado`, result: false });
      }
    } catch (e) {
      res.json({ cadastroMessage: `Usuário não foi registrado, motivo: ${e}`, result: false });
    }
  },
};

export default pessoaControllers;