import conectarBancoDeDados from '../config/db.js'
import novoAgendamento from '../models/Classes/AgendamentoClass.js'

const agendamentoController = {
    async registroDeAgendamento(req, res) {
        const { data_e_hora, observacao } = req.body;
        const { idVeiOs, idPessoaVeiOs, idOS } = req.query;

        if (!data_e_hora || !observacao || !idVeiOs || !idPessoaVeiOs || !idOS) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        const con = await conectarBancoDeDados();
        try {
            const [osExists] = await con.query(`SELECT * FROM tbl_ordem_de_serviço WHERE id = ?`, [idOS]);
            const [veiculoExists] = await con.query(`SELECT * FROM tbl_veiculo WHERE id = ?`, [idVeiOs]);
            const [pessoaExists] = await con.query(`SELECT * FROM tbl_pessoa WHERE id = ?`, [idPessoaVeiOs]);

            if (!osExists.length) {
                return res.status(404).json({ message: 'ID da Ordem de Serviço não encontrado.' });
            }
            if (!veiculoExists.length) {
                return res.status(404).json({ message: 'ID do Veículo não encontrado.' });
            }
            if (!pessoaExists.length) {
                return res.status(404).json({ message: 'ID da Pessoa não encontrado.' });
            }

            const agendamento = new novoAgendamento({ data_e_hora, observacao });

            await agendamento.novoRegistroAgendamento(idOS, idVeiOs, idPessoaVeiOs);
            return res.status(201).json({ message: 'Agendamento registrado com sucesso!' });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao registrar agendamento. Por favor, tente novamente.' });
        }
    },
    
    async listarAgendamentos(req, res) {
        const con = await conectarBancoDeDados();
        try {
            let [rows] = await con.query(`SELECT * FROM tbl_agendamento`);

            for (let i = 0; i < rows.length; i++) {
                const newDate = new Date (rows[i].Data_e_hora);
                const dataBr = newDate.toLocaleString("pt-BR")
                rows[i].Data_e_hora = dataBr;
                
            }
            return res.json(rows);

           
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar agendamentos. Por favor, tente novamente.' });
        }
    },
    

    async buscarAgendamentoPorPessoa(req, res) {
        const { idPessoa } = req.params; 
    
        if (!idPessoa) {
            return res.status(400).json({ message: 'ID da Pessoa é obrigatório.' });
        }
    
        const con = await conectarBancoDeDados();
        try {
            const query = `
                SELECT a.*, o.*, v.*, p.*
                FROM tbl_agendamento a
                JOIN tbl_ordem_de_serviço o ON a.id_os = o.id
                JOIN tbl_veiculo v ON a.id_veiculo_os = v.id
                JOIN tbl_pessoa p ON a.id_pessoa_veiculo_os = p.id
                WHERE a.id_pessoa_veiculo_os = ?`;
    
            const [rows] = await con.query(query, [idPessoa]);

            for (let i = 0; i < rows.length; i++) {
                const newDate = new Date (rows[i].Data_e_hora);
                const dataBr = newDate.toLocaleString("pt-BR")
                rows[i].Data_e_hora = dataBr;
            }
            return res.json(rows);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar agendamentos. Por favor, tente novamente.' });
        }
    },
    
    
    async editarAgendamento(req, res) {
        const idAge = req.params.id;
        const { data_e_hora, observacao } = req.body;

        if (!data_e_hora || !observacao) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        const formatarDataEHora = (data_e_hora) => {
            const partes = data_e_hora.split(' '); 
            const dataPartes = partes[0].split('/'); 
            const horaPartes = partes[1].split(':').slice(0, 2).join(':'); 
            const dataFormatada = `${dataPartes[2]}-${dataPartes[1]}-${dataPartes[0]}`;
            return `${dataFormatada} ${horaPartes}`;
        };
        const dataFormatada = formatarDataEHora(data_e_hora);

        const agendamento = new novoAgendamento({ data_e_hora: dataFormatada, observacao });

        try {
            await agendamento.atualizarRegistroAgendamento(idAge);
            return res.json({ message: 'Agendamento atualizado com sucesso!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: `Erro ao atualizar agendamento: ${error.message}` });
        }
    },

    async deletarAgendamento(req, res) {
        const idAge = req.params.id;

        try {
            const resultado = await novoAgendamento.deleteRegistroAgendamento(idAge);
            if (resultado.affectedRows === 0) {
                return res.status(404).json({ message: 'Agendamento não encontrado.' });
            }
            return res.json({ message: 'Agendamento deletado com sucesso!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: `Erro ao deletar agendamento: ${error.message}` });
        }
    }


}

export default agendamentoController;