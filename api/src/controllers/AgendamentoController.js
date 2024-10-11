import conectarBancoDeDados from '../config/db.js'
import novoAgendamento from '../models/Classes/AgendamentoClass.js'

const agendamentoController = {
    async registroDeAgendamento(req, res) {
        const { data_e_hora, observacao } = req.body;
        const idOS = req.params.idOS;

        if (!data_e_hora || !observacao || !idOS) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        // Função para formatar a data e hora
        const formatarDataEHora = (data_e_hora) => {
            const partes = data_e_hora.split(' '); // Divide data e hora
            const dataPartes = partes[0].split('/'); // Pega apenas a parte da data
            const horaPartes = partes[1].split(':').slice(0, 2).join(':'); // Pega apenas horas e minutos
            // Formata a data para YYYY-MM-DD
            const dataFormatada = `${dataPartes[2]}-${dataPartes[1]}-${dataPartes[0]}`;
            // Retorna a data formatada com a hora
            return `${dataFormatada} ${horaPartes}`;
        };
        const dataFormatada = formatarDataEHora(data_e_hora);

        const agendamento = new novoAgendamento({ data_e_hora: dataFormatada, observacao });

        try {
            await agendamento.novoRegistroAgendamento(idOS);
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

                    // Formatação da data e hora para o formato desejado
                    const opcoes = {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                    };

                    const dataLocal = dataUTC.toLocaleString('pt-BR', opcoes);
                    const [data, hora] = dataLocal.split(', '); // Separa data e hora
                    const [dia, mes, ano] = data.split('/'); // Separa dia, mês e ano

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

        // Função para formatar a data e hora
        const formatarDataEHora = (data_e_hora) => {
            const partes = data_e_hora.split(' '); // Divide data e hora
            const dataPartes = partes[0].split('/'); // Pega apenas a parte da data
            const horaPartes = partes[1].split(':').slice(0, 2).join(':'); // Pega apenas horas e minutos
            // Formata a data para YYYY-MM-DD
            const dataFormatada = `${dataPartes[2]}-${dataPartes[1]}-${dataPartes[0]}`;
            // Retorna a data formatada com a hora
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