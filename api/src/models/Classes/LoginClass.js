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
}

module.exports = Login;