import conectarBancoDeDados from '../config/db.js'
import novoAgendamento from '../models/Classes/AgendamentoClass.js'

const agendamentoController = {
    async registroDeAgendamento(req, res) {
        const { data_e_hora, observacao } = req.body;
        const idOS = req.params.idOS;
        const idVeiOs = req.params.idVeiOs;
        const idPessoaVeiOs = req.params.idPessoaVeiOs;

        if (!data_e_hora || !observacao || !idOS || !idVeiOs || !idPessoaVeiOs) {
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
            await agendamento.novoRegistroAgendamento(idOS, idVeiOs, idPessoaVeiOs);
            return res.status(201).json({ message: 'Agendamento registrado com sucesso!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: `Erro ao registrar agendamento: ${error.message}` });
        }
    },


    async buscarAgendamentoPorPessoa(req, res) {
        const idOS = req.params.idOS;

        if (!idOS) {
            return res.status(400).json({ message: 'ID da pessoa é obrigatório.' });
        }

        const con = await conectarBancoDeDados();
        try {
            const [rows] = await con.query(`SELECT * FROM tbl_agendamento WHERE id_os = ?`, [idOS]);
            if (rows.length > 0) {
                const agendamentosFormatados = rows.map(agendamento => {
                    const dataUTC = new Date(agendamento.data_e_hora);

                    const opcoes = {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                    };

                    const dataLocal = dataUTC.toLocaleString('pt-BR', opcoes);
                    const [data, hora] = dataLocal.split(', '); 
                    const [dia, mes, ano] = data.split('/');

                    return {
                        ...agendamento,
                        data_e_hora: `${dia}/${mes}/${ano} ${hora}`
                    };
                });
                return res.json(agendamentosFormatados);
            } else {
                return res.status(404).json({ message: 'Nenhum agendamento encontrado para esta pessoa.' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: `Erro ao buscar agendamento: ${error.message}` });
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