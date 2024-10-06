import conectarBancoDeDados from '../../config/db.js';

class novoAgendamento {
    constructor(pAge) {
        this.id = (pAge.id !== null || pAge.id > 0) ? pAge.id : null;
        this.data_e_hora = pAge.data_e_hora;
        this.observacao = pAge.observacao;
        this.tbl_ordem_de_serviço_id = (pAge.tbl_ordem_de_serviço_id !== null || pAge.tbl_ordem_de_serviço_id > 0) ? pAge.tbl_ordem_de_serviço_id : null;
        this.tbl_ordem_de_serviço_tbl_veiculo_id = (pAge.tbl_ordem_de_serviço_tbl_veiculo_id !== null || pAge.tbl_ordem_de_serviço_tbl_veiculo_id > 0) ? pAge.tbl_ordem_de_serviço_tbl_veiculo_id : null;
        this.tbl_ordem_de_serviço_tbl_veiculo_tbl_pessoa_id = (pAge.tbl_ordem_de_serviço_tbl_veiculo_tbl_pessoa_id !== null || pAge.tbl_ordem_de_serviço_tbl_veiculo_tbl_pessoa_id > 0) ? pAge.tbl_ordem_de_serviço_tbl_veiculo_tbl_pessoa_id : null;
    }
    get Id() { return this.id; }
    set Id(value) { this.id = value; }

    get Data_e_hora() { return this.data_e_hora; }
    set Data_e_hora(value) { this.data_e_hora = value; }

    get Observaçao() { return this.observacao; }
    set Observaçao(value) { this.observacao = value; }

    get Tbl_ordem_de_servico_id() { return this.tbl_ordem_de_servico_id; }
    set Tbl_ordem_de_servico_id(value) { this.tbl_ordem_de_servico_id = value; }

    // get Tbl_ordem_de_servico_tbl_veiculo_id() { return this.tbl_ordem_de_servico_tbl_veiculo_id; }
    // set Tbl_ordem_de_servico_tbl_veiculo_id(value) { this.tbl_ordem_de_servico_tbl_veiculo_id = value; }

    // get Tbl_ordem_de_servico_tbl_veiculo_tbl_pessoa_id() { return this.tbl_ordem_de_servico_tbl_veiculo_tbl_pessoa_id; }
    // set Tbl_ordem_de_servico_tbl_veiculo_tbl_pessoa_id(value) { this.tbl_ordem_de_servico_tbl_veiculo_tbl_pessoa_id = value; }

    validarCampos() {
        const campos = {
            Data_e_hora: this.data_e_hora,
            Observaçao: this.observacao
        };
        for (const [key, value] of Object.entries(campos)) {
            if (!value || (key === 'data_e_hora' && isNaN(value))) {
                throw new Error(`O campo ${key} é obrigatório e deve ser válido.`);
            }
        }
        return true;
    }

    novoRegistroAgendamento = async (idOS) => {
        const con = await conectarBancoDeDados();
        try {
            this.validarCampos();
            const result = await con.query(
                `INSERT INTO tbl_agendamento (data_e_hora, observacao, tbl_ordem_de_servico_id) VALUES (?, ?, ?)`,
                [this.data_e_hora, this.observacao, idOS]
            );
            return result[0].insertId;
        } catch (error) {
            throw new Error(`Erro ao realizar agendamento: ${error.message}`);
        }
    };

    atualizarRegistroAgendamento = async () => {
        const con = await conectarBancoDeDados();
        try {
            this.validarCampos();
            await con.query(
                `UPDATE tbl_agendamento SET data_e_hora = ?, observacao = ? WHERE id = ?`,
                [this.data_e_hora, this.observacao, this.id]
            );
        } catch (error) {
            throw new Error(`Erro ao atualizar agendamento: ${error.message}`);
        }
    };


    static deleteRegistroAgendamento = async (idAge) => {
        const con = await conectarBancoDeDados();
        try {
            const result = await con.query(`DELETE FROM tbl_Agendamento WHERE id = ?`, [idAge]);
            return result;
        } catch (error) {
            throw new Error(`Erro ao excluir agendamento: ${error.message}`);
        }
    };
}

export default novoAgendamento;