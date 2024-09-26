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
        console.log(value)
        if (value != null) {
            let newValue = value.replace(/[() -]/g, '');
            console.log('telefone', newValue)
            this.telefone = newValue;

        }
    }

    novoRegistroTel= async (idPessoa) => {

        const con = await conectarBancoDeDados();
        //lógica para inserir os dados nas tabelas correspondentes no seu banco de dados
        try {
            //métodos para inserir os dados
            const telefone = await con.query(`insert into tbl_telefone (telefone, tbl_pessoa_id) values (?,?)`,
                [this.telefone, idPessoa]);
    
            return telefone;
        } catch (error) {
            throw new Error(`Erro ao registrar: ${error.message}`);
        }
    };
}

export default Telefone;