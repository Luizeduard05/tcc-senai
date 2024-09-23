class Endereco {

    constructor(pEnd){

        this.id = (pEnd.id !== null || pEnd.id > 0) ? pEnd.id : null;
        this.logradouro = pEnd.logradouro;
        this.bairro = pEnd.bairro;
        this.estado = pEnd.estado;
        this.numero = pEnd.numero;
        this.complemento = pEnd.complemento;
        this.cep = pEnd.cep;
        this.tbl_pessoa_id = (pEnd.tbl_pessoa_id !== null || pEnd.tbl_pessoa_id > 0) ? pEnd.tbl_pessoa_id : null; 
    }
    get Id(){return this.id;}
    set Id(value){this.id = value;}

    get Logradouro() { return this.logradouro;}
    set Logradouro(value) { this.logradouro = value;}

    get Numero() { return this.numero;}
    set Numero(value) { this.numero = value;}

    get Bairro() { return this.bairro;}
    set Bairro(value) { this.bairro = value;}

    get Complemento() { return this.complemento;}
    set Complemento(value) { this.complemento = value;}

    get Cep() { return this.cep; }
    set Cep(value) { this.cep = value;}

    get Estado() { return this.estado;}
    set Estado(value) { this.estado = value;}

    get Tbl_pessoa_id(){return this.tbl_pessoa_id;}
    set Tbl_pessoa_id(value){this.tbl_pessoa_id = value;}
}

module.exports = Endereco;