import conectarBancoDeDados from '../../config/db.js';

class Pessoa {
    constructor(pPes) {
        this.id = (pPes.id !== null || pPes.id > 0) ? pPes.id : null;
        this.nome = pPes.nome;
        this.cpf = pPes.cpf;
        this.email = pPes.email;
        this.tipo = pPes.tipo;
    }
    get Id() { return this.id; }
    set Id(value) { this.id = value; }

    get Nome() { return this.nome; }
    set Nome(value) { this.nome = value; }

    get Cpf() { return this.cpf; }
    set Cpf(value) { this.cpf = value; }

    get Email() { return this.email; }
    set Email(value) { this.email = value; }

    get Tipo() { return this.tipo; }
    set Tipo(value) { this.tipo = value; }

    novoRegistroPessoa = async () => {

        const con = await conectarBancoDeDados();
        //lógica para inserir os dados nas tabelas correspondentes no seu banco de dados
        try {
            //métodos para inserir os dados
            const person = await con.query(`insert into tbl_pessoa (nome, cpf, email, tipo) values (?,?,?,?)`,
                [this.nome, this.cpf, this.email, this.tipo]);
            return person[0].insertId;
            // return { message: 'Usuário registrado com sucesso!', result: true };
        } catch (error) {
            throw new Error(`Erro ao registrar: ${error.message}`);
        }
    };
    deleteRegistroPessoa = async (idPessoa) => {

        const con = await conectarBancoDeDados();
        //lógica para inserir os dados nas tabelas correspondentes no seu banco de dados
        try {
            //métodos para inserir os dados
            const person = await con.query(`delete from tbl_pessoa where id=?`,
                [idPessoa]);
            return person;
            // return { message: 'Usuário registrado com sucesso!', result: true };
        } catch (error) {
            throw new Error(`Erro ao registrar: ${error.message}`);
        }
    };

    validarCampos() {

        return (
            this.nome &&
            this.cpf &&
            this.email &&
            this.tipo &&
            this.logradouro &&
            this.bairro &&
            this.estado &&
            this.numero &&
            this.complemento &&
            this.cep
        );
    }


}

export default Pessoa;


