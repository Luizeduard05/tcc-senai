import conectarBancoDeDados from '../../config/db.js';

class Veiculo {
    constructor(pVei) {
        this.id = (pVei.id !== null || pVei.id > 0) ? pVei.id : null;
        this.placa = pVei.placa;
        this.marca = pVei.marca;
        this.ano = pVei.ano;
        this.modelo = pVei.modelo;
        this.tbl_pessoa_id = (pVei.tbl_pessoa_id !== null || pVei.tbl_pessoa_id > 0) ? pVei.tbl_pessoa_id : null;
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

    novoRegistroVeiculo = async () => {
        const con = await conectarBancoDeDados();
        //lógica para inserir os dados nas tabelas correspondentes no seu banco de dados
        try {
            //métodos para inserir os dados
            const veiculo = await con.query(`insert into tbl_veiculo (placa, marca, ano, modelo, tbl_pessoa_id) values (?,?,?,?,?)`,
                [this.placa, this.marca, this.ano, this.modelo, idPessoa]);
            return veiculo[0].insertId;
        } catch (error) {
            throw new Error(`Erro ao registrar veiculo: ${error.message}`);
        }
    };

    static deleteRegistroVei = async (idVei) => {
        const con = await conectarBancoDeDados();
        //lógica para inserir os dados nas tabelas correspondentes no seu banco de dados
        try {
            //métodos para inserir os dados
            const person = await con.query(`delete from tbl_veiculo where tbl_pessoa_id = ?`,
                [idVei]);
            return person;
            // return { message: 'Usuário registrado com sucesso!', result: true };
        } catch (error) {
            throw new Error(`Erro ao registrar: ${error.message}`);
        }
    };

    validarCampos() {
        return (
            this.placa,
            this.marca,
            this.ano,
            this.modelo
        );
    }
}



export default Veiculo;