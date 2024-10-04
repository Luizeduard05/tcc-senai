class Veiculo {
    constructor(pVei){
        this.id = (pVei.id !== null || pVei.id > 0) ? pVei.id : null;
        this.placa = pVei.placa;
        this.marca = pVei.marca;
        this.ano = pVei.ano;
        this.modelo = pVei.modelo;
        this.tbl_pessoa_id = (pVei.tbl_pessoa_id !== null || pVei.tbl_pessoa_id > 0) ? pVei.tbl_pessoa_id : null;
    }
    get Id(){return this.id;}
    set Id(value){this.id = value;}

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
}

export default Veiculo;