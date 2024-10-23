import conectarBancoDeDados from '../config/db.js'
import Os from '../models/Classes/OsClass.js';


const osController = {
    async registroDeOS(req, res) {
        const { data, status, mo } = req.body;
        const idVei = req.query.idVei; 
        const idPessoaVei = req.query.idPessoaVei; 

        if (!data || !status || !mo) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        const formatarData = (data) => {
            const partes = data.split('/');
            return `${partes[2]}-${partes[1]}-${partes[0]}`;
        };

        const dataFormatada = formatarData(data);

        const statusMap = {
            'Aguardando Retorno': 0,
            'Aprovado': 1,
            'Reprovado': 2,
        };
        const statusCodigo = statusMap[status];
        if (statusCodigo === undefined) {
            return res.status(400).json({ message: 'Status inválido.' });
        }

        const moFormatado = parseFloat(mo.replace(',', '.'));
        if (isNaN(moFormatado)) {
            return res.status(400).json({ message: 'O campo mo deve ser um valor decimal válido.' });
        }

        const total = moFormatado;

        const ordemServico = new Os({ data: dataFormatada, status: statusCodigo, mo: moFormatado, total });

        try {
            await ordemServico.novoRegistroOs(idVei, idPessoaVei);
            return res.status(201).json({ message: 'OS registrada com sucesso!' });
        } catch (error) {
            console.error('Erro ao registrar OS:', error);
            return res.status(500).json({ message: `Erro ao registrar OS: ${error.message}` });
        }
    },


    

    async buscarOsPorVeiculos(req, res) {
        const idVei = req.query.idVei; 
        const idPessoaVei = req.query.idPessoaVei;

        if (!idVei || !idPessoaVei) {
            return res.status(400).json({ message: 'ID do veiculo é obrigatório.' });
        }

        const con = await conectarBancoDeDados();
        try {
            const [rows] = await con.query(`SELECT * FROM tbl_ordem_de_serviço WHERE id_veiculo = ?`, [idVei]);
            if (rows.length > 0) {
                const dataFormatada = rows.map(servico => {
                    const dataUTC = new Date(servico.data);

                    const opcoes = {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    };

                    const data = dataUTC.toLocaleString('pt-BR', opcoes);
                    const [dia, mes, ano] = data.split('/'); 

                    return {
                        ...servico,
                        data: `${dia}/${mes}/${ano}`
                    };
                });
                return res.json(dataFormatada);
            } else {
                return res.status(404).json({ message: 'Nenhum OS encontrada para este veiculo.' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: `Erro ao buscar OS: ${error.message}` });
        }
    },






    async editarOS(req, res) {
        const idOS = req.params.id;
        const { data, status, mo } = req.body;

        if (!data || !status || !mo) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        const formatarData = (data) => {
            const partes = data.split('/');
            return `${partes[2]}-${partes[1]}-${partes[0]}`; 
        };

        const dataFormatada = formatarData(data);
        console.log('Data formatada:', dataFormatada); 

        const statusMap = {
            'Aguardando Retorno': 0,
            'Aprovado': 1,
            'Reprovado': 2,
        };
        const statusCodigo = statusMap[status];
        if (statusCodigo === undefined) {
            return res.status(400).json({ message: 'Status inválido.' });
        }

        const moFormatado = parseFloat(mo.replace(',', '.'));
        if (isNaN(moFormatado)) {
            return res.status(400).json({ message: 'O campo mo deve ser um valor decimal válido.' });
        }

        const total = moFormatado;

        const ordemServico = new Os({ data: dataFormatada, status: statusCodigo, mo: moFormatado, total });
        try {
            await ordemServico.atualizarRegistroOs(idOS);
            return res.json({ message: 'OS atualizada com sucesso!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: `Erro ao atualizar a OS: ${error.message}` });
        }
    },






    async deletarOS(req, res) {
        const idOS = req.params.id;

        try {
            const resultado = await Os.deleteRegistroOs(idOS);
            if (resultado.affectedRows === 0) {
                return res.status(404).json({ message: 'OS não encontrada.' });
            }
            return res.json({ message: 'OS deletada com sucesso!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: `Erro ao deletar OS: ${error.message}` });
        }
    }


}

export default osController;