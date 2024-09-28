import conectarBancoDeDados from '../../config/db.js';

class Login{
    constructor(pLog){
        this.id = (pLog.id !== null || pLog.id > 0) ? pLog.id : null;
        this.perfil = pLog.perfil;
        this.login = pLog.login;
        this.senha = pLog.senha;
        this.tbl_pessoa_id = (pLog.tbl_pessoa_id !== null || pLog.tbl_pessoa_id > 0) ? pLog.tbl_pessoa_id : null;
    }
    get Id(){return this.id;}
    set Id(value){this.id = value;}

    get Perfil(){return this.perfil;}
    set Perfil(value){this.perfil = value;}

    get Login(){return this.login;}
    set Login(value){this.login = value;}

    get Senha(){return this.senha;}
    set Senha(value){this.senha=value;}

    get Tbl_pessoa_id(){return this.tbl_pessoa_id;}
    set Tbl_pessoa_id(value){this.tbl_pessoa_id;}

    novoRegistroLogin = async (idPessoa) => {
        const con = await conectarBancoDeDados();
        //lógica para inserir os dados nas tabelas correspondentes no seu banco de dados
        try {
            //métodos para inserir os dados
            const login = await con.query(`insert into tbl_login (perfil, login, senha, tbl_pessoa_id) values (?,?,?,?)`,
                [this.perfil, this.login, this.senha, idPessoa]);
            return login[0].insertId;
            // return { message: 'Usuário registrado com sucesso!', result: true };
        } catch (error) {
            throw new Error(`Erro ao registrar: ${error.message}`);
        }
    };

    validarCampos() {
        return (
            this.perfil &&
            this.login &&
            this.senha
        );
    }
}

export default  Login;