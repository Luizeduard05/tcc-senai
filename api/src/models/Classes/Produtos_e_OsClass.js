class Produtos_e_Os{
    constructor(pProOs){
        this.produtos_id = (pProOs.produtos_id !== null || pProOs.produtos_id > 0) ? pProOs.produtos_id : null;
        this.tbl_ordem_de_serviço_id = (pProOs.tbl_ordem_de_serviço_id !== null || pProOs.tbl_ordem_de_serviço_id > 0) ? pProOs.tbl_ordem_de_serviço_id : null;
        this.tbl_ordem_de_serviço_tbl_veiculo_id = (pProOs.tbl_ordem_de_serviço_tbl_veiculo_id !== null || pProOs.tbl_ordem_de_serviço_tbl_veiculo_id > 0) ? pProOs.tbl_ordem_de_serviço_tbl_veiculo_id : null;
        this.tbl_ordem_de_serviço_tbl_veiculo_tbl_pessoa_id = (pProOs.tbl_ordem_de_serviço_tbl_veiculo_tbl_pessoa_id !== null || pProOs.tbl_ordem_de_serviço_tbl_veiculo_tbl_pessoa_id > 0) ? pProOs.tbl_ordem_de_serviço_tbl_veiculo_tbl_pessoa_id : null;
    }
    get Produtos_id(){return this.produtos_id;}
    set Produtos_id(value){this.produtos_id = value;}

    get Tbl_ordem_de_serviço_id(){return this.tbl_ordem_de_serviço_id;}
    set Tbl_ordem_de_serviço_id(value){this.tbl_ordem_de_serviço_id = value;}

    get Tbl_ordem_de_serviço_tbl_veiculo_id(){return this.tbl_ordem_de_serviço_tbl_veiculo_id;}
    set Tbl_ordem_de_serviço_tbl_veiculo_id(value){this.tbl_ordem_de_serviço_tbl_veiculo_id = value;}

    get Tbl_ordem_de_serviço_tbl_veiculo_tbl_pessoa_id(){return this.tbl_ordem_de_serviço_tbl_veiculo_tbl_pessoa_id;}
    set Tbl_ordem_de_serviço_tbl_veiculo_tbl_pessoa_id(value){this.tbl_ordem_de_serviço_tbl_veiculo_tbl_pessoa_id=value;}
}

export default  Produtos_e_Os;