import ItemOs from '../models/Classes/ItemOs.js';
import conectarBancoDeDados from '../config/db.js'

const ItemOsController = {
    async registroDePecasOS(req, res) {
        const { quantidade } = req.body;
        if (!quantidade) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }
        const pecas = new Produtos({ quantidade });
        try {
            await pecas.novoRegistroPecas();
            return res.status(201).json({ message: 'Peça registrada com sucesso!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: `Erro ao registrar peça: ${error.message}` });
        }
    },


    async deletarPecasOS(req, res) {
        const idItem = req.params.id;
        try {
            const resultado = await ItemOs.deletePecaOs(idItem);
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

export default ItemOsController;