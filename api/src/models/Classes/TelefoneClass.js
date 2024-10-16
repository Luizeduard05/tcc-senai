import conectarBancoDeDados from '../../config/db.js';

class Telefone {
    constructor(pTel) {
        this.id = (pTel.id !== null || pTel.id > 0) ? pTel.id : null;
        this.cleanMaskTel(pTel.telefone);
        this.id_pessoa = (pTel.id_pessoa !== null || pTel.id_pessoa > 0) ? pTel.id_pessoa : null;
    }
    get Id() { return this.id; }
    set Id(value) { this.id = value; }

    get Telefone() { return this.telefone; }
    set Telefone(value) { this.telefone = value; }

    get Id_pessoa() { return this.id_pessoa; }
    set Id_pessoa(value) { this.id_pessoa = value; }


    cleanMaskTel(value) {
        if (value != null) {
            let newValue = value.replace(/[() -]/g, '');
            this.telefone = newValue;
        }
    }

    novoRegistroTel = async (idPessoa) => {
        const con = await conectarBancoDeDados();
        try {
            const telefone = await con.query(`insert into tbl_telefone (telefone, id_pessoa) values (?,?)`,
                [this.telefone, idPessoa]);
            return telefone[0].insertId;
        } catch (error) {
            throw new Error(`Erro ao registrar: ${error.message}`);
        }finally{
            con.release();
        }
    };
    static deleteRegistroTel = async (idTel) => {
        const con = await conectarBancoDeDados();
        try {
            const person = await con.query(`delete from tbl_telefone where id_pessoa = ?`,
                [idTel]);
            return person;
        } catch (error) {
            throw new Error(`Erro ao registrar: ${error.message}`);
        }
    };

    atualizarRegistroTel = async () => {
        const con = await conectarBancoDeDados();
        try {
          await con.query(`UPDATE tbl_telefone SET telefone = ? WHERE id_pessoa = ?`,
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