import conectarBancoDeDados from '../../config/db.js';


class Veiculo {
    constructor(pVei) {
        this.id = pVei.id ?? null; 
        this.placa = pVei.placa;
        this.marca = pVei.marca;
        this.ano = pVei.ano;
        this.modelo = pVei.modelo;
        this.tbl_pessoa_id = pVei.tbl_pessoa_id ?? null;
    }

   
    get Id() { return this.id; }
    set Id(value) { this.id = value; }

    get Placa() { return this.placa; }
    set Placa(value) { this.placa = value; }

    get Marca() { return this.marca; }
    set Marca(value) { this.marca = value; }

    get Ano() { return this.ano; }
    set Ano(value) { this.ano = value; }

    get Modelo() { return this.modelo; }
    set Modelo(value) { this.modelo = value; }

    get Tbl_pessoa_id() { return this.tbl_pessoa_id; }
    set Tbl_pessoa_id(value) { this.tbl_pessoa_id = value; }

   
    validarCampos() {
        const campos = {
            placa: this.placa,
            marca: this.marca,
            ano: this.ano,
            modelo: this.modelo,
        };
        for (const [key, value] of Object.entries(campos)) {
            if (!value || (key === 'ano' && isNaN(value))) {
                throw new Error(`O campo ${key} é obrigatório e deve ser válido.`);
            }
        }
        return true;
    }

    novoRegistroVeiculo = async (idPessoa) => {
        const con = await conectarBancoDeDados();
        try {
            this.validarCampos();
            const result = await con.query(
                `INSERT INTO tbl_veiculo (placa, marca, ano, modelo, tbl_pessoa_id) VALUES (?, ?, ?, ?, ?)`,
                [this.placa, this.marca, this.ano, this.modelo, idPessoa]
            );
            return result[0].insertId; 
        } catch (error) {
            throw new Error(`Erro ao registrar veículo: ${error.message}`);
        }
    };

    atualizarRegistroVeiculo = async () => {
        const con = await conectarBancoDeDados();
        try {
            this.validarCampos(); 
            await con.query(
                `UPDATE tbl_veiculo SET placa = ?, marca = ?, ano = ?, modelo = ? WHERE id = ?`,
                [this.placa, this.marca, this.ano, this.modelo, this.id]
            );
        } catch (error) {
            throw new Error(`Erro ao atualizar veículo: ${error.message}`);
        }
    };
    
    
    static deleteRegistroVei = async (idVei) => {
        const con = await conectarBancoDeDados();
        try {
            const result = await con.query(`DELETE FROM tbl_veiculo WHERE id = ?`, [idVei]);
            return result; 
        } catch (error) {
            throw new Error(`Erro ao excluir veículo: ${error.message}`);
        }
    };
    
}

export default Veiculo;
