import conectarBancoDeDados from '../config/db.js'
import Os from '../models/Classes/OsClass.js';


const osController = {
    async registroDeOS(req, res) {
        const { data, status, mo, itens } = req.body;
        const idVei = req.query.idVei;
        const idPessoaVei = req.query.idPessoaVei;

        let valorTotal = 0;
        itens.forEach(item => {
            valorTotal += (item.quantidade * item.valor);
        })
        let valorMo = parseFloat(mo.replace(',', '.'));
        valorTotal += valorMo;

        console.log(itens)
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

        const ordemServico = new Os({
            data: dataFormatada,
            status: statusCodigo,
            mo: moFormatado,
            total: valorTotal,
            itens
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

        const con = await conectarBancoDeDados();
        try {
            const [veiculos] = await con.query(`SELECT * FROM tbl_veiculo WHERE id_pessoa = ?`, [idPessoa]);
            const [ordensServico] = await con.query(`SELECT * FROM tbl_ordem_de_serviço WHERE id_pessoa_veiculo = ?`, [idPessoa]);

            return res.json({ veiculos, ordensServico });
        } catch (error) {
            console.error('Erro ao buscar orçamento:', error);
            return res.status(500).json({ message: `Erro ao buscar orçamento: ${error.message}` });
        }
    },

    async buscarTodosOrcamentos(req, res) {
        const con = await conectarBancoDeDados();

        try {
            const [ordensServico] = await con.query(`
            SELECT 
              o.id AS id_os, 
              o.data, 
              o.status, 
              o.total, 
              o.mo,
              v.placa, 
              v.modelo, 
              p.id AS id_pessoa,
              p.email
            FROM tbl_ordem_de_serviço o
            INNER JOIN tbl_veiculo v ON o.id_veiculo = v.id
            INNER JOIN tbl_pessoa p ON o.id_pessoa_veiculo = p.id;
          `);

            for (let i = 0; i < ordensServico.length; i++) {
                const newDate = new Date(ordensServico[i].data);
                const dataBr = newDate.toLocaleString("pt-BR")
                ordensServico[i].data = dataBr;
            }

            return res.json({ ordensServico });
        } catch (error) {
            console.error('Erro ao buscar orçamentos:', error);
            return res.status(500).json({ message: `Erro ao buscar orçamentos: ${error.message}` });
        }
    },

    async buscarItensOs(req, res) {
        const con = await conectarBancoDeDados();
        const idOS = req.params.id;
        try {
            const [pecasOs] = await con.query(`
            SELECT 
              o.id AS id_os, 
              i.id AS id_itens_os,
              p.nome_produto, 
              p.marca_produto, 
              p.valor_produto
            FROM tbl_ordem_de_serviço o
            INNER JOIN tbl_itens_os i ON o.id = i.id_os
            INNER JOIN tbl_produtos p ON i.id_produto = p.id          
            WHERE o.id = ?;`,[idOS]);
            return res.json({ pecasOs });
        } catch (error) {
            console.error('Erro ao buscar peças dessa Os:', error);
            return res.status(500).json({ message: `Erro ao buscar peças dessa Os: ${error.message}`});
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