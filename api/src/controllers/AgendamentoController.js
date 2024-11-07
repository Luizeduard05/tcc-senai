import conectarBancoDeDados from '../config/db.js'
import classAgendamento from '../models/Classes/AgendamentoClass.js'

const agendamentoController = {
    async registroDeAgendamento(req, res) {
        const { data_e_hora, observacao } = req.body;
        const { idVeiOs, idPessoaVeiOs, idOS } = req.query;

        if (!data_e_hora || !observacao || !idVeiOs || !idPessoaVeiOs || !idOS) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }
        try {
            const [pessoaExists] = await classAgendamento.verificaSeClienteOsVeiculoExiste(idOS);
            if (!pessoaExists.length) {
                return res.status(404).json({ message: 'ID da Pessoa não encontrado.' });
            }
            const agendamento = new classAgendamento({ data_e_hora, observacao });
            await agendamento.novoRegistroAgendamento(idOS, idVeiOs, idPessoaVeiOs);
            return res.status(201).json({ message: 'Agendamento registrado com sucesso!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao registrar agendamento. Por favor, tente novamente.' });
        }
    },







    async listarAgendamentos(req, res) {
        try {
            // Chama a função que retorna todos os agendamentos
            const result = await classAgendamento.selectAgendamentos();
            // Se não houver agendamentos, retorna uma resposta vazia
            if (result.length === 0) {
                return;
            }
            // Formata a data para o formato brasileiro
            for (let i = 0; i < result.length; i++) {
                const newDate = new Date(result[i].Data_e_hora);
                const dataBr = newDate.toLocaleString("pt-BR");  // Formato brasileiro (dd/mm/aaaa hh:mm)
                result[i].Data_e_hora = dataBr;  // Atualiza a data no objeto
            }
            // Retorna a resposta no formato JSON
            return res.json({ result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: 'Erro ao buscar agendamentos. Por favor, tente novamente.'
            });
        }
    },






    async buscarAgendamentoPorPessoa(req, res) {
        const { idPessoa } = req.params;
        if (!idPessoa) {
            return res.status(400).json({ message: 'ID da Pessoa é obrigatório.' });
        }
        try {
            const [rows] = await classAgendamento.selectAgendamentosPorPessoa(idPessoa);
            for (let i = 0; i < rows.length; i++) {
                const newDate = new Date(rows[i].Data_e_hora);
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
        const agendamento = new classAgendamento({ data_e_hora: dataFormatada, observacao });
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
            const resultado = await classAgendamento.deleteRegistroAgendamento(idAge);
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