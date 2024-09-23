class Pessoa {
    constructor(pPes) {
        this.id = (pPes.id !== null || pPes.id > 0) ? pPes.id : null;
        this.nome = pPes.nome;
        this.cpf = pPes.cpf;
        this.email = pPes.email;
        this.tipo = pPes.tipo;
    }
    get Id(){return this.id;}
    set Id(value){this.id = value;}

    get Nome() { return this.nome; }
    set Nome(value) { this.nome = value; }

    get Cpf() { return this.cpf; }
    set Cpf(value) { this.cpf = value; }

    get Email() { return this.email; }
    set Email(value) { this.email = value; }

    get Tipo() { return this.tipo; }
    set Tipo(value) { this.tipo = value; }

}

module.exports = Pessoa;