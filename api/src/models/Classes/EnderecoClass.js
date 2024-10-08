import conectarBancoDeDados from '../../config/db.js';

class Endereco {

    constructor(pEnd) {

        this.id = (pEnd.id !== null || pEnd.id > 0) ? pEnd.id : null;
        this.logradouro = pEnd.logradouro;
        this.bairro = pEnd.bairro;
        this.estado = pEnd.estado;
        this.numero = pEnd.numero;
        this.complemento = pEnd.complemento;
        this.cep = pEnd.cep;
        this.tbl_pessoa_id = (pEnd.tbl_pessoa_id !== null || pEnd.tbl_pessoa_id > 0) ? pEnd.tbl_pessoa_id : null;
    }
    get Id() { return this.id; }
    set Id(value) { this.id = value; }

    get Logradouro() { return this.logradouro; }
    set Logradouro(value) { this.logradouro = value; }

    get Numero() { return this.numero; }
    set Numero(value) { this.numero = value; }

    get Bairro() { return this.bairro; }
    set Bairro(value) { this.bairro = value; }

    get Complemento() { return this.complemento; }
    set Complemento(value) { this.complemento = value; }

    get Cep() { return this.cep; }
    set Cep(value) { this.cep = value; }

    get Estado() { return this.estado; }
    set Estado(value) { this.estado = value; }

    get Tbl_pessoa_id() { return this.tbl_pessoa_id; }
    set Tbl_pessoa_id(value) { this.tbl_pessoa_id = value; }

    novoRegistroEnd = async (idPessoa) => {

        const con = await conectarBancoDeDados();
        try {  
            const endereco = await con.query(`insert into tbl_endereco (logradouro, bairro, estado, numero, complemento, cep, tbl_pessoa_id) VALUES (?,?,?,?,?,?,?)`,
                [this.logradouro, this.bairro, this.estado, this.numero, this.complemento, this.cep, idPessoa]);

            return endereco[0].insertId;
        } catch (error) {
            throw new Error(`Erro ao registrar: ${error.message}`);
        }
    };

    static deleteRegistroEnd = async (idEndereco) => {

        const con = await conectarBancoDeDados();
        try {
            const person = await con.query(`delete from tbl_endereco where tbl_pessoa_id = ?`,
                [idEndereco]);
            return person;
        } catch (error) {
            throw new Error(`Erro ao registrar: ${error.message}`);
        }
    };

    atualizarRegistroEnd = async () => {
        const con = await conectarBancoDeDados();
        try {
          await con.query(`UPDATE tbl_endereco SET logradouro = ?, bairro = ?, estado = ?, numero = ?, complemento = ?, cep = ? WHERE tbl_pessoa_id = ?`,
            [this.logradouro, this.bairro, this.estado, this.numero, this.complemento, this.cep, this.id]);
        } catch (error) {
          throw new Error(`Erro ao atualizar: ${error.message}`);
        }
      };
      

    validarCampos() {
        return (
            this.logradouro &&
            this.bairro &&
            this.estado &&
            this.numero &&
            this.complemento &&
            this.cep
        );
    }

   

}

export default Endereco;