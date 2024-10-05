import Veiculo from '../models/Classes/VeiculoClass.js';  
import conectarBancoDeDados from '../config/db.js'



const VeiculoController = {
    async registroDeVeiculo(req, res) {
        const { placa, marca, ano, modelo } = req.body;
        const idPessoa = req.params.idPessoa;
    
        if (!placa || !marca || !ano || !modelo || !idPessoa) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }
    
        const veiculo = new Veiculo({ placa, marca, ano, modelo });
        
        try {
            await veiculo.novoRegistroVeiculo(idPessoa); 
            return res.status(201).json({ message: 'Veículo registrado com sucesso!' }); 
        } catch (error) {
            console.error(error); 
            return res.status(500).json({ message: `Erro ao registrar veículo: ${error.message}` });
        }
    },
    

    async buscarVeiculosPorPessoa(req, res) {
        const idPessoa = req.params.idPessoa;

        if (!idPessoa) {
            return res.status(400).json({ message: 'ID da pessoa é obrigatório.' });
        }

        const con = await conectarBancoDeDados();
        try {
            const [rows] = await con.query(`SELECT * FROM tbl_veiculo WHERE tbl_pessoa_id = ?`, [idPessoa]);
            if (rows.length > 0) {
                return res.json(rows); 
            } else {
                return res.status(404).json({ message: 'Nenhum veículo encontrado para esta pessoa.' });
            }
        } catch (error) {
            console.error(error); 
            return res.status(500).json({ message: `Erro ao buscar veículos: ${error.message}` });
        }
    },

    async editarVeiculo(req, res) {
        const idVei = req.params.id; 
        const { placa, marca, ano, modelo } = req.body;

        if (!placa || !marca || !ano || !modelo) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }
    
        const veiculo = new Veiculo({ id: idVei, placa, marca, ano, modelo });
    
        try {
            await veiculo.atualizarRegistroVeiculo(); 
            return res.json({ message: 'Veículo atualizado com sucesso!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: `Erro ao atualizar veículo: ${error.message}` });
        }
    },

    async deletarVeiculo(req, res) {
        const idVei = req.params.id; 
    
        try {
            const resultado = await Veiculo.deleteRegistroVei(idVei);
            if (resultado.affectedRows === 0) {
                return res.status(404).json({ message: 'Veículo não encontrado.' });
            }
            return res.json({ message: 'Veículo deletado com sucesso!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: `Erro ao deletar veículo: ${error.message}` });
        }
    }
    
    
}

export default VeiculoController;
