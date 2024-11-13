import conectarBancoDeDados from '../config/db.js'
import classOs from '../models/Classes/OsClass.js';


const osController = {
    async registroDeOS(req, res) {

        const { data, status, mo, itens, mecanico } = req.body;
        const idVei = req.query.idVei;
        const idPessoaVei = req.query.idPessoaVei;
        let valorTotal = 0;


        itens.forEach(item => {
            valorTotal += (item.quantidade * item.valor);
        });

        let valorMo = parseFloat(mo.replace(',', '.'));
        valorTotal += valorMo;

        if (!data || !status || !mo || !Array.isArray(itens)) {
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

        if (mecanico) {
            try {
                const [pessoa] = await classOs.selecionarRegistroOsMecanico(mecanico);
                if (pessoa.length === 0 || pessoa[0].tipo !== 'MEC') {
                    return res.status(400).json({ message: 'ID de mecânico inválido. A pessoa não é um mecânico cadastrado.' });
                }
            } catch (error) {
                console.error('Erro ao verificar mecânico:', error);
                return res.status(500).json({ message: 'Erro ao verificar mecânico.' });
            }
        }

        const ordemServico = new classOs({
            data: dataFormatada,
            status: statusCodigo,
            mo: moFormatado,
            total: valorTotal,
            itens,
            id_mecanico: mecanico
        });

        try {
            await ordemServico.novoRegistroOs(idVei, idPessoaVei);
            return res.status(201).json({ message: 'OS registrada com sucesso!' });
        } catch (error) {
            console.error('Erro ao registrar OS:', error);
            return res.status(500).json({ message: `Erro ao registrar OS: ${error.message}` });
        }
    },







    async buscarOrcamentoPorPessoa(req, res) {

        const idPessoa = req.params.idPessoa;

        if (!idPessoa) {
            return res.status(400).json({ message: 'ID da pessoa é obrigatório.' });
        }

        try {
            const result = await classOs.selecionarRegistroOs(idPessoa);
            if (result.length > 0) {
                return res.json({ ordensServico: result });
            } else {
                return res.json({ message: 'Usuário não encontrado ou sem ordens de serviço.' });
            }
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: `Erro ao localizar ordens: ${e.message}` });
        }
    },




    

    async buscarTodosOrcamentos(req, res) {

        try {
            const ordensServico = await classOs.selecionarOrcamentos();
            ordensServico.forEach(os => {
                const newDate = new Date(os.data);
                const dataBr = newDate.toLocaleString("pt-BR");
                os.data = dataBr;
            });
            return res.json({ ordensServico });
        } catch (error) {
            console.error('Erro ao buscar orçamentos:', error);
            return res.status(500).json({ message: `Erro ao buscar orçamentos: ${error.message}` });
        }
    },





    async buscarItensOs(req, res) {

        const { idOS } = req.params;
        
        try {
            const [rows] = await classOs.selecionarItensOs(idOS);
            console.log("asasas",rows);
            return res.json({ rows });
        } catch (error) {
            console.error('Erro ao buscar peças dessa Os:', error);
            return res.status(500).json({ message: `Erro ao buscar peças dessa Os: ${error.message}` });
        }
    },







    async editarOS(req, res) {
        const idOS = req.params.id;
        const { data, status, mo, itens, mecanico } = req.body;
        let valorTotal = 0;

        itens.forEach(item => {
            valorTotal += (item.quantidade * item.valor);
        });

        let valorMo = parseFloat(mo.replace(',', '.'));
        valorTotal += valorMo;

        if (!data || !status || !mo || !Array.isArray(itens)) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }
    

        // Formatar a data
        const formatarData = (data) => {
            const partes = data.split('/');
            return `${partes[2]}-${partes[1]}-${partes[0]}`;
        };
        const dataFormatada = formatarData(data);
    

        // Mapear status
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
    

        // Verificar se o mecânico é válido (se o campo foi passado)
        if (mecanico) {
            try {
                const [pessoa] = await classOs.selecionarRegistroOsMecanico(mecanico);
                if (pessoa.length === 0 || pessoa[0].tipo !== 'MEC') {
                    return res.status(400).json({ message: 'ID de mecânico inválido. A pessoa não é um mecânico cadastrado.' });
                }
            } catch (error) {
                console.error('Erro ao verificar mecânico:', error);
                return res.status(500).json({ message: 'Erro ao verificar mecânico.' });
            }
        }
        // Atualizando a ordem de serviço
        const ordemServico = new classOs({
            data: dataFormatada,
            status: statusCodigo,
            mo: moFormatado,
            total: valorTotal,
            itens,
            id_mecanico: mecanico
        });

        try {
            await ordemServico.atualizarRegistroOs(idOS);
            return res.json({ message: 'OS atualizada com sucesso!' });
        } catch (error) {
            console.error('Erro ao atualizar a OS:', error);
            return res.status(500).json({ message: `Erro ao atualizar a OS: ${error.message}` });
        }
    },







    // async deletarOS(req, res) {
    //     const idOS = req.params.id;
    //     try {
    //         const resultado = await classOs.deleteRegistroOs(idOS);
    //         if (resultado.affectedRows === 0) {
    //             return res.status(404).json({ message: 'OS não encontrada.' });
    //         }
    //         return res.json({ message: 'OS deletada com sucesso!' });
    //     } catch (error) {
    //         console.error(error);
    //         return res.status(500).json({ message: `Erro ao deletar OS: ${error.message}` });
    //     }
    // }
}





export default osController;