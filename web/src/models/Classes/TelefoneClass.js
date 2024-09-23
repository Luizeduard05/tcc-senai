class Telefone{
    constructor(pTel){
        this.id = (pTel.id !== null || pTel.id > 0) ? pTel.id : null;
        this.telefone = pTel.telefone;
        this.tbl_pessoa_id = (pTel.tbl_pessoa_id !== null || pTel.tbl_pessoa_id > 0) ? pTel.tbl_pessoa_id : null;
    }
    get Id(){return this.id;}
    set Id(value){this.id = value;}

    get Telefone(){return this.telefone;}
    set Telefone(value){this.telefone = value;}

    get Tbl_pessoa_id(){return this.tbl_pessoa_id;}
    set Tbl_pessoa_id(value){this.tbl_pessoa_id = value;}
}

module.exports = Telefone;