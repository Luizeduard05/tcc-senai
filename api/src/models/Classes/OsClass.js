import conectarBancoDeDados from '../../config/db.js';
import ItemOs from './ItemOsClass.js';

class Os {
    constructor(pOs) {
        this.id = (pOs.id !== null || pOs.id > 0) ? pOs.id : null;
        this.data = pOs.data;
        this.status = (pOs.status !== null || pOs.status !== '') ? pOs.status : null;
        this.mo = pOs.mo;
        this.total = pOs.total;
        this.id_veiculo = (pOs.id_veiculo !== null && pOs.id_veiculo > 0) ? pOs.id_veiculo : null;
        this.id_pessoa_veiculo = (pOs.id_pessoa_veiculo !== null && pOs.id_pessoa_veiculo > 0) ? pOs.id_pessoa_veiculo : null;
        this.itens = pOs.itens || [];
        this.id_mecanico = (pOs.id_mecanico !== null && pOs.id_mecanico > 0) ? pOs.id_mecanico : null; 
    }
    get Id() { return this.id; }
    set Id(value) { this.id = value; }

    get Data() { return this.data; }
    set Data(value) { this.data = value; }

    get Status() { return this.status; }
    set Status(value) { this.status = value; }

    get Mo() { return this.mo; }
    set Mo(value) { this.mo = value; }

    get Total() { return this.total; }
    set Total(value) { this.total = value; }

    get Id_veiculo() { return this.id_veiculo; }
    set Id_veiculo(value) { this.id_veiculo = value; }

    get Id_pessoa_veiculo() { return this.id_pessoa_veiculo; }
    set Id_pessoa_veiculo(value) { this.id_pessoa_veiculo = value; }

    validarCampos() {
        const campos = {
            Data: this.data,
            Status: this.status,
            Mo: this.mo,
            Total: this.total
        };
        return true;
    }

    async novoRegistroOs(idVei, idPessoaVei) {
        const con = await conectarBancoDeDados();
        try {
            this.validarCampos();
            const result = await con.query(
                `INSERT INTO tbl_ordem_de_serviço (data, status, total, mo, id_veiculo, id_pessoa_veiculo, id_mecanico) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [this.data, this.status, this.total, this.mo, idVei, idPessoaVei, this.id_mecanico] // Adiciona o ID do mecânico na inserção
            );
            const idOs = result[0].insertId;
            for (const item of this.itens) {
                const itemOs = new ItemOs({
                    quantidade: item.quantidade,
                    id_produto: item.id_produto,
                    id_os: idOs,
                    id_veiculo_os: idVei,
                    id_pessoa_veiculo_os: idPessoaVei
                });
                await itemOs.adicionarPecaOs(idOs, idVei, idPessoaVei, item.id_produto);
            }

            return idOs;
        } catch (error) {
            throw new Error(`Erro ao registrar OS: ${error.message}`);
        }
    };

    static selecionarRegistroOs = async (idPessoa) => {
        const con = await conectarBancoDeDados();
        try {
            const [veiculos] = await con.query(`SELECT * FROM tbl_veiculo WHERE id_pessoa = ?`, [idPessoa]);
            const [ordensServico] = await con.query(`SELECT * FROM tbl_ordem_de_serviço WHERE id_pessoa_veiculo = ?`, [idPessoa]);

            return veiculos, ordensServico;
        } catch (error) {
            console.error('Erro ao buscar orçamento:', error);
            return res.status(500).json({ message: `Erro ao buscar orçamento: ${error.message}` });
        }
    }

    atualizarRegistroOs = async (idOS) => {
        const con = await conectarBancoDeDados();
        try {
            this.validarCampos();
            await con.query(
                `UPDATE tbl_ordem_de_serviço SET data = ?, status = ?, mo = ?, total = ? WHERE id = ?`,
                [this.data, this.status, this.mo, this.total, idOS]
            );
        } catch (error) {
            throw new Error(`Erro ao atualizar OS: ${error.message}`);
        }
    };


    static deleteRegistroOs = async (idOS) => {
        const con = await conectarBancoDeDados();
        try {
            const result = await con.query(`DELETE FROM tbl_ordem_de_serviço WHERE id = ?`, [idOS]);
            return result;
        } catch (error) {
            throw new Error(`Erro ao excluir OS: ${error.message}`);
        }
    };

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
    };

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
    };

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
    }
}

export default Os;