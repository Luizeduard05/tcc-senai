import conectarBancoDeDados from '../../config/db.js';

class novoAgendamento {
    constructor(pAge) {
        this.id = (pAge.id !== null || pAge.id > 0) ? pAge.id : null;
        this.data_e_hora = pAge.data_e_hora;
        this.observacao = pAge.observacao;
        this.id_os = (pAge.id_os !== null || pAge.id_os > 0) ? pAge.id_os : null;
        this.id_veiculo_os = (pAge.id_veiculo_os !== null || pAge.id_veiculo_os > 0) ? pAge.id_veiculo_os : null;
        this.id_pessoa_veiculo_os = (pAge.id_pessoa_veiculo_os !== null || pAge.id_pessoa_veiculo_os > 0) ? pAge.id_pessoa_veiculo_os : null;
    }
    get Id() { return this.id; }
    set Id(value) { this.id = value; }

    get Data_e_hora() { return this.data_e_hora; }
    set Data_e_hora(value) { this.data_e_hora = value; }

    get Observaçao() { return this.observacao; }
    set Observaçao(value) { this.observacao = value; }

    get Id_os() { return this.id_os; }
    set Id_os(value) { this.id_os = value; }

    get Id_veiculo_os() { return this.id_veiculo_os; }
    set Id_veiculo_os(value) { this.id_veiculo_os = value; }

    get Id_pessoa_veiculo_os() { return this.id_pessoa_veiculo_os; }
    set Id_pessoa_veiculo_os(value) { this.id_pessoa_veiculo_os = value; }

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

    novoRegistroAgendamento = async (idOS, idVeiOs, idPessoaVeiOs) => {
        const con = await conectarBancoDeDados();
        try {
            this.validarCampos();
            const result = await con.query(
                `INSERT INTO tbl_agendamento (data_e_hora, observacao, id_os, id_veiculo_os, id_pessoa_veiculo_os) VALUES (?, ?, ?, ?, ?)`,
                [this.data_e_hora, this.observacao, idOS, idVeiOs, idPessoaVeiOs]
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