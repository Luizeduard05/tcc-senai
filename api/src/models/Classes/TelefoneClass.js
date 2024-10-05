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


    cleanMaskTel(value) {
        if (value != null) {
            let newValue = value.replace(/[() -]/g, '');
            this.telefone = newValue;
        }
    }

    novoRegistroTel = async (idPessoa) => {
        const con = await conectarBancoDeDados();
        try {
            const telefone = await con.query(`insert into tbl_telefone (telefone, tbl_pessoa_id) values (?,?)`,
                [this.telefone, idPessoa]);
            return telefone[0].insertId;
        } catch (error) {
            throw new Error(`Erro ao registrar: ${error.message}`);
        }
    };
    static deleteRegistroTel = async (idTel) => {
        const con = await conectarBancoDeDados();
        try {
            const person = await con.query(`delete from tbl_telefone where tbl_pessoa_id = ?`,
                [idTel]);
            return person;
        } catch (error) {
            throw new Error(`Erro ao registrar: ${error.message}`);
        }
    };

    atualizarRegistroTel = async () => {
        const con = await conectarBancoDeDados();
        try {
          await con.query(`UPDATE tbl_telefone SET telefone = ? WHERE tbl_pessoa_id = ?`,
            [this.telefone, this.id]);
        } catch (error) {
          throw new Error(`Erro ao atualizar: ${error.message}`);
        }
      };
      

    validarCampos() {
        return (
            this.telefone
        );
    }

}

export default Telefone;