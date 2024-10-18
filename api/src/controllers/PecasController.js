import Produtos from "../models/Classes/ProdutosClass.js";
import conectarBancoDeDados from '../config/db.js'

const PecasController = {
    async registroDePecas(req, res) {
        const { nome_produto, marca_produto, valor_produto } = req.body;

        if (!nome_produto || !marca_produto || !valor_produto) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        const valorFormatado = parseFloat(valor_produto.replace(',', '.'));
        if (isNaN(valorFormatado)) {
            return res.status(400).json({ message: 'O campo mo deve ser um valor decimal válido.' });
        }


        const pecas = new Produtos({ nome_produto, marca_produto, valor_produto: valorFormatado });

        try {
            await pecas.novoRegistroPecas();
            return res.status(201).json({ message: 'Peça registrada com sucesso!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: `Erro ao registrar peça: ${error.message}` });
        }
    },


    async buscarPecas(req, res) {
        const idPro = req.params.idPro;

        if (!idPro) {
            return res.status(400).json({ message: 'ID da peça é obrigatório.' });
        }

        const con = await conectarBancoDeDados();
        try {
            const [rows] = await con.query(`SELECT * FROM tbl_produtos WHERE id = ?`, [idPro]);
            if (rows.length > 0) {
                return res.json(rows);
            } else {
                return res.status(404).json({ message: 'Nenhuma peça encontrada.' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: `Erro ao buscar peça: ${error.message}` });
        }
    },

    async editarPecas(req, res) {
        const idPro = req.params.id;
        const { nome_produto, marca_produto, valor_produto } = req.body;

        if (!nome_produto || !marca_produto || !valor_produto) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        const valorFormatado = parseFloat(valor_produto.replace(',', '.'));
        if (isNaN(valorFormatado)) {
            return res.status(400).json({ message: 'O campo mo deve ser um valor decimal válido.' });
        }

        const pecas = new Produtos({ id: idPro, nome_produto, marca_produto, valor_produto: valorFormatado });

        try {
            await pecas.atualizarRegistroPecas(idPro);
            return res.json({ message: 'Peça atualizada com sucesso!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: `Erro ao atualizar peça: ${error.message}` });
        }
    },

    async deletarPecas(req, res) {
        const idPro = req.params.id;

        try {
            const resultado = await Produtos.deleteRegistroPecas(idPro);
            if (resultado.affectedRows === 0) {
                return res.status(404).json({ message: 'Peça não encontrada.' });
            }
            return res.json({ message: 'Peça deletada com sucesso!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: `Erro ao deletar peça: ${error.message}` });
        }
    }


}

export default PecasController;