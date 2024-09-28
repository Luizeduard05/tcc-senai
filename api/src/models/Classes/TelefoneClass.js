import conectarBancoDeDados from '../../config/db.js';

class Telefone {
    constructor(pTel) {
        this.id = (pTel.id !== null || pTel.id > 0) ? pTel.id : null;
        this.cleanMaskTel(pTel.telefone);
        this.tbl_pessoa_id = (pTel.tbl_pessoa_id !== null || pTel.tbl_pessoa_id > 0) ? pTel.tbl_pessoa_id : null;
    }
    get Id() { return this.id; }
    set Id(value) { this.id = value; }

    get Telefone() { return this.telefone; }
    set Telefone(value) { this.telefone = value; }

    get Tbl_pessoa_id() { return this.tbl_pessoa_id; }
    set Tbl_pessoa_id(value) { this.tbl_pessoa_id = value; }

    //Remover mascara (caracteres) 
    cleanMaskTel(value) {
        if (value != null) {
            let newValue = value.replace(/[() -]/g, '');
            this.telefone = newValue;
        }
    }

    novoRegistroTel = async (idPessoa) => {
        const con = await conectarBancoDeDados();
        //lógica para inserir os dados nas tabelas correspondentes no seu banco de dados
        try {
            //métodos para inserir os dados
            const telefone = await con.query(`insert into tbl_telefone (telefone, tbl_pessoa_id) values (?,?)`,
                [this.telefone, idPessoa]);
            return telefone[0].insertId;
        } catch (error) {
            throw new Error(`Erro ao registrar: ${error.message}`);
        }
    };
    deleteRegistroTel = async (idTel) => {
        const con = await conectarBancoDeDados();
        //lógica para inserir os dados nas tabelas correspondentes no seu banco de dados
        try {
            //métodos para inserir os dados
            const person = await con.query(`delete from tbl_telefone where id=?`,
                [idTel]);
            return person;
            // return { message: 'Usuário registrado com sucesso!', result: true };
        } catch (error) {
            throw new Error(`Erro ao registrar: ${error.message}`);
        }
    };

    validarCampos() {
        return (
            this.telefone
        );
    }

}

export default Telefone;