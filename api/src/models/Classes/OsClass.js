class os{
    constructor(pOs){
        this.id = (pOs.id !== null || pOs.id > 0) ? pOs.id : null;
        this.data = pOs.data;
        this.status = (pOs.status !== null || pOs.status != '') ? pOs.status : null;
        this.orçamento = pOs.orçamento;
        this.tbl_vaiculo_id = (pOs.tbl_vaiculo_id !== null || pOs.tbl_vaiculo_id > 0) ? pOs.tbl_vaiculo_id : null;
        this.tbl_vaiculo_tbl_pessoa_id = (pOs.tbl_vaiculo_tbl_pessoa_id !== null || pOs.tbl_vaiculo_tbl_pessoa_id > 0) ? pOs.tbl_vaiculo_tbl_pessoa_id : null;
    }
    get Id(){return this.id;}
    set Id(value){this.id = value;}

    get Data(){return this.data;}
    set Data(value){this.data = value;}

    get Status(){return this.status;}
    set Status(value){this.status = value;}

    get Tbl_vaiculo_id(){return this.tbl_vaiculo_id;}
    set Tbl_vaiculo_id(value){this.tbl_vaiculo_id = value;}

    get Tbl_vaiculo_tbl_pessoa_id(){return this.tbl_vaiculo_tbl_pessoa_id;}
    set Tbl_vaiculo_tbl_pessoa_id(value){this.tbl_vaiculo_tbl_pessoa_id = value;}
}

export default os;