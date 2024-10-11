import conectarBancoDeDados from '../../config/db.js';
class Os {
    constructor(pOs) {
        this.id = (pOs.id !== null || pOs.id > 0) ? pOs.id : null;
        this.data = pOs.data;
        this.status = (pOs.status !== null || pOs.status != '') ? pOs.status : null;
        this.mo = pOs.mo;
        this.total = pOs.total;
        this.id_veiculo = (pOs.id_veiculo !== null || pOs.id_veiculo > 0) ? pOs.id_veiculo : null;
        this.id_pessoa_veiculo = (pOs.id_pessoa_veiculo !== null || pOs.id_pessoa_veiculo > 0) ? pOs.id_pessoa_veiculo : null;
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

    get Id_veiculo() { return this.id_veiculo; }
    set Id_veiculo(value) { this.id_veiculo = value; }

    get Id_pessoa_veiculo(){return this.id_pessoa_veiculo;}
    set Id_pessoa_veiculo(value){this.id_pessoa_veiculo = value;}

    validarCampos() {
        const campos = {
            Data: this.data,
            Status: this.status,
            Mo: this.mo,
            Total: this.total
        };
        return true;
    }

    novoRegistroOs = async (idVei, idPessoaVei) => {
        const con = await conectarBancoDeDados();
        try {
            this.validarCampos();
            const result = await con.query(
                `INSERT INTO tbl_ordem_de_serviço (data, status, mo, total, id_veiculo, id_pessoa_veiculo) VALUES (?, ?, ?, ?, ?, ?)`,
                [this.data, this.status, this.mo, this.total, idVei, idPessoaVei]
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
                `UPDATE tbl_ordem_de_serviço SET data = ?, status = ?, mo = ?, total = ? WHERE id = ?`,
                [this.data, this.status, this.mo, this.total, idOS]
            );
        } catch (error) {
            throw new Error(`Erro ao atualizar OS: ${error.message}`);
        }
    };


    static deleteRegistroOs = async (idOS) => {
        const con = await conectarBancoDeDados();
        try {
            const result = await con.query(`DELETE FROM tbl_ordem_de_serviço WHERE id = ?`, [idOS]);
            return result;
        } catch (error) {
            throw new Error(`Erro ao excluir OS: ${error.message}`);
        }
    };
}

export default Os;