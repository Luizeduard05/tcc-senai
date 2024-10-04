class Produtos{
    constructor(pPro){
        this.id = (pPro.id !== null || pPro.id > 0) ? pPro.id : null;
        this.nome_produto = pPro.nome_produto;
        this.marca_produto = pPro.marca_produto;
        this.valor = pPro.valor;
    }
    get Id(){return this.id;}
    set Id(value){this.id = value;}

    get Nome_produto(){return this.nome_produto;}
    set Nome_produto(value){this.nome_produto = value;}

    get Marca_produto(){return this.marca_produto;}
    set Marca_produto(value){this.marca_produto = value;}

    get Valor(){return this.valor;}
    set Valor(value){this.valor = value;}
}

export default  Produtos;