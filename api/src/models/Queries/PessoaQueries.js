import conectarBancoDeDados from '../../config/db.js';


// Função de inserção no banco
const novoRegistroPessoa = async (personObj, enderecoObj, telefoneObj) => {

    const con = await conectarBancoDeDados();
    //lógica para inserir os dados nas tabelas correspondentes no seu banco de dados
    try {
        //métodos para inserir os dados
        const person = await con.query(`insert into tbl_pessoa (nome, cpf, email, tipo) values (?,?,?,?)`,
            [personObj.nome, personObj.cpf, personObj.email, personObj.tipo]);

        const endereco = await con.query(`insert into tbl_endereco (logradouro, bairro, estado, numero, complemento, cep, tbl_pessoa_id) VALUES (?,?,?,?,?,?,?)`,
            [enderecoObj.logradouro, enderecoObj.bairro, enderecoObj.estado, enderecoObj.numero, enderecoObj.complemento, enderecoObj.cep, person[0].insertId]);

        const telefone = await con.query(`insert into tbl_telefone (telefone, tbl_pessoa_id) values (?,?)`,
            [telefoneObj.telefone, person[0].insertId]);

        return { message: 'Usuário registrado com sucesso!', result: true };
    } catch (error) {
        throw new Error(`Erro ao registrar: ${error.message}`);
    }
};

export default novoRegistroPessoa;