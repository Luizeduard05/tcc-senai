import conectarBancoDeDados from '../../config/db.js';

class classAgendamento {
    constructor(pAge) {
        this.id = (pAge.id !== null || pAge.id > 0) ? pAge.id : null;
        this.DataConvert(pAge.data_e_hora);
        this.observacao = pAge.observacao;
        this.id_os = (pAge.id_os !== null || pAge.id_os > 0) ? pAge.id_os : null;
        this.id_veiculo_os = (pAge.id_veiculo_os !== null || pAge.id_veiculo_os > 0) ? pAge.id_veiculo_os : null;
        this.id_pessoa_veiculo_os = (pAge.id_pessoa_veiculo_os !== null || pAge.id_pessoa_veiculo_os > 0) ? pAge.id_pessoa_veiculo_os : null;
    }
    get Id() { return this.id; }
    set Id(value) { this.id = value; }

    get Data_e_hora() { return this.data_e_hora; }
    set Data_e_hora(value) { this.data_e_hora = value; }

    get Observação() { return this.observacao; }
    set Observação(value) { this.observacao = value; }

    get Id_os() { return this.id_os; }
    set Id_os(value) { this.id_os = value; }

    get Id_veiculo_os() { return this.id_veiculo_os; }
    set Id_veiculo_os(value) { this.id_veiculo_os = value; }

    get Id_pessoa_veiculo_os() { return this.id_pessoa_veiculo_os; }
    set Id_pessoa_veiculo_os(value) { this.id_pessoa_veiculo_os = value; }

    validarCampos() {
        const campos = {
            Data_e_hora: this.data_e_hora,
            Observação: this.observacao
        };
        for (const [key, value] of Object.entries(campos)) {
            if (!value || (key === 'data_e_hora' && isNaN(value))) {
                throw new Error(`O campo ${key} é obrigatório e deve ser válido.`);
            }
        }
        return true;
    }

    DataConvert(value) {
        const [data, hora] = value.split(' ');
        let [dia, mes, ano] = data.split('/');
        let dataFormatada = `${ano}-${mes}-${dia}T${hora}`;
        console.log(dataFormatada);
        this.Data_e_hora = new Date(dataFormatada);
        return this.Data_e_hora
    }







    novoRegistroAgendamento = async (idOS, idVeiOs, idPessoaVeiOs) => {
        const con = await conectarBancoDeDados();
        try {
            this.validarCampos(); // Valida os campos obrigatórios

            // Se idOS foi fornecido, usamos ele; caso contrário, passamos null para o banco
            const result = await con.query(
                `INSERT INTO tbl_agendamento (Data_e_hora, Observação, id_os, id_veiculo_os, id_pessoa_veiculo_os) 
                VALUES (?, ?, ?, ?, ?)`,
                [
                    this.data_e_hora,
                    this.observacao,
                    idOS || null, // Se idOS não for fornecido, passamos null
                    idVeiOs,
                    idPessoaVeiOs
                ]
            );

            return result[0].insertId;
        } catch (error) {
            throw new Error(`Erro ao realizar agendamento: ${error.message}`);
        }
    };







    static selectAgendamentos = async () => {
        const con = await conectarBancoDeDados()
        try {
            const [rows] = await con.query(`SELECT * FROM tbl_agendamento`);
            return rows;
        } catch (error) {
            throw new Error(`Erro ao selecionar: ${error.message}`);
        }
    };






    static selectAgendamentosPorPessoa = async (idPessoa) => {
        const con = await conectarBancoDeDados()
        try {
            const result = await con.query(`SELECT a.*, o.*, v.*, p.*
                FROM tbl_agendamento a
                JOIN tbl_ordem_de_serviço o ON a.id_os = o.id
                JOIN tbl_veiculo v ON a.id_veiculo_os = v.id
                JOIN tbl_pessoa p ON a.id_pessoa_veiculo_os = p.id
                WHERE a.id_pessoa_veiculo_os = ?`, [idPessoa]);
            return result;
        } catch (error) {
            throw new Error(`Erro ao selecionar: ${error.message}`);
        }
    };






    static verificaSeClienteOsVeiculoExiste = async (idOs) => {
        const con = await conectarBancoDeDados();
        try {
            const result = await con.query(`select COUNT(*)
            from tbl_ordem_de_serviço as OS 
            inner join tbl_veiculo as V 
            on OS.id_veiculo = V.id 
            inner join tbl_pessoa as P 
            on OS.id_pessoa_veiculo = P.id 
            where OS.id = ? ;`, [idOs]);
            return result;
        } catch (error) {
            throw new Error(`Erro ao excluir agendamento: ${error.message}`);
        }
    };







    atualizarRegistroAgendamento = async () => {
        const con = await conectarBancoDeDados();
        try {
            console.log(this.data_e_hora, this.observacao, this.id);
            await con.query(
                `UPDATE tbl_agendamento SET data_e_hora = ?, Observação = ? WHERE id = ?`,
                [this.data_e_hora, this.observacao, this.id]
            );
        } catch (error) {
            throw new Error(`Erro ao atualizar agendamento: ${error.message}`);
        }
    };





    // static deleteRegistroAgendamento = async (idAge) => {
    //     const con = await conectarBancoDeDados();
    //     try {
    //         const result = await con.query(`DELETE FROM tbl_Agendamento WHERE id = ?`, [idAge]);
    //         return result;
    //     } catch (error) {
    //         throw new Error(`Erro ao excluir agendamento: ${error.message}`);
    //     }
    // };


}

export default classAgendamento;