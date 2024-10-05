import conectarBancoDeDados from '../../config/db.js';
class Os {
    constructor(pOs) {
        this.id = (pOs.id !== null || pOs.id > 0) ? pOs.id : null;
        this.data = pOs.data;
        this.status = (pOs.status !== null || pOs.status != '') ? pOs.status : null;
        this.mo = pOs.mo;
        this.total = pOs.total;
        this.tbl_vaiculo_id = (pOs.tbl_vaiculo_id !== null || pOs.tbl_vaiculo_id > 0) ? pOs.tbl_vaiculo_id : null;
        this.tbl_vaiculo_tbl_pessoa_id = (pOs.tbl_vaiculo_tbl_pessoa_id !== null || pOs.tbl_vaiculo_tbl_pessoa_id > 0) ? pOs.tbl_vaiculo_tbl_pessoa_id : null;
    }
    get Id() { return this.id; }
    set Id(value) { this.id = value; }

    get Data() { return this.data; }
    set Data(value) { this.data = value; }

    get Status() { return this.status; }
    set Status(value) { this.status = value; }

    get Mo() { return this.mo; }
    set Mo(value) { this.mo = value; }

    get Total() { return this.total; }
    set Total(value) { this.total = value; }

    get Tbl_veiculo_id() { return this.tbl_veiculo_id; }
    set Tbl_veiculo_id(value) { this.tbl_veiculo_id = value; }

    // get Tbl_vaiculo_tbl_pessoa_id(){return this.tbl_vaiculo_tbl_pessoa_id;}
    // set Tbl_vaiculo_tbl_pessoa_id(value){this.tbl_vaiculo_tbl_pessoa_id = value;}

    validarCampos() {
        const campos = {
            Data: this.data,
            Status: this.status,
            Mo: this.mo,
            Total: this.total
        };
        return true;
    }

    novoRegistroOs = async (idVei) => {
        const con = await conectarBancoDeDados();
        try {
            this.validarCampos();
            const result = await con.query(
                `INSERT INTO tbl_ordem_de_servico (data, status, mo, total, tbl_veiculo_id) VALUES (?, ?, ?, ?, ?)`,
                [this.data, this.status, this.mo, this.total, idVei]
            );
            return result[0].insertId;
        } catch (error) {
            throw new Error(`Erro ao registrar OS: ${error.message}`);
        }
    };

    atualizarRegistroOs = async (idOS) => {
        const con = await conectarBancoDeDados();
        try {
            this.validarCampos();
            await con.query(
                `UPDATE tbl_ordem_de_servico SET data = ?, status = ?, mo = ?, total = ? WHERE id = ?`,
                [this.data, this.status, this.mo, this.total, idOS]
            );
        } catch (error) {
            throw new Error(`Erro ao atualizar OS: ${error.message}`);
        }
    };


    static deleteRegistroOs = async (idOS) => {
        const con = await conectarBancoDeDados();
        try {
            const result = await con.query(`DELETE FROM tbl_ordem_de_servico WHERE id = ?`, [idOS]);
            return result;
        } catch (error) {
            throw new Error(`Erro ao excluir OS: ${error.message}`);
        }
    };
}

export default Os;