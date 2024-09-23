class agendamento{
    constructor(pAge){
        this.id = (pAge.id !== null || pAge.id > 0) ? pAge.id : null;
        this.data_e_hora = pAge.data_e_hora;
        this.observacao = pAge.observacao;
        this.tbl_ordem_de_serviço_id = (pAge.tbl_ordem_de_serviço_id !== null || pAge.tbl_ordem_de_serviço_id > 0) ? pAge.tbl_ordem_de_serviço_id : null;
        this.tbl_ordem_de_serviço_tbl_veiculo_id = (pAge.tbl_ordem_de_serviço_tbl_veiculo_id !== null || pAge.tbl_ordem_de_serviço_tbl_veiculo_id > 0) ? pAge.tbl_ordem_de_serviço_tbl_veiculo_id : null;
        this.tbl_ordem_de_serviço_tbl_veiculo_tbl_pessoa_id = (pAge.tbl_ordem_de_serviço_tbl_veiculo_tbl_pessoa_id !== null || pAge.tbl_ordem_de_serviço_tbl_veiculo_tbl_pessoa_id > 0) ? pAge.tbl_ordem_de_serviço_tbl_veiculo_tbl_pessoa_id : null;
    }
    get Id(){return this.id;}
    set Id(value){this.id = value;}

    get Data_e_hora(){return this.data_e_hora;}
    set Data_e_hora(value){this.data_e_hora = value;}

    get Observaçao(){return this.observacao;}
    set Observaçao(value){this.observacao = value;}

    get Tbl_ordem_de_serviço_id(){return this.tbl_ordem_de_serviço_id;}
    set Tbl_ordem_de_serviço_id(value){this.tbl_ordem_de_serviço_id = value;}

    get Tbl_ordem_de_serviço_tbl_veiculo_id(){return this.tbl_ordem_de_serviço_tbl_veiculo_id;}
    set Tbl_ordem_de_serviço_tbl_veiculo_id(value){this.tbl_ordem_de_serviço_tbl_veiculo_id = value;}

    get Tbl_ordem_de_serviço_tbl_veiculo_tbl_pessoa_id(){return this.tbl_ordem_de_serviço_tbl_veiculo_tbl_pessoa_id;}
    set Tbl_ordem_de_serviço_tbl_veiculo_tbl_pessoa_id(value){this.tbl_ordem_de_serviço_tbl_veiculo_tbl_pessoa_id = value;}
}

module.exports = agendamento;