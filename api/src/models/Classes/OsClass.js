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

    novoRegistroOs = async () => {
        const con = await conectarBancoDeDados();
        //lógica para inserir os dados nas tabelas correspondentes no seu banco de dados
        try {
            //métodos para inserir os dados
            const veiculo = await con.query(`insert into tbl_ordem_de_serviço (data, status, orçamento, tbl_veiculo_id, tbl_veiculo_tbl_pessoa_id) values (?,?,?,?,?)`,
                [this.placa, this.marca, this.ano, this.modelo, idPessoa]);
            return veiculo[0].insertId;
        } catch (error) {
            throw new Error(`Erro ao registrar veiculo: ${error.message}`);
        }
    };

    static deleteRegistroVei = async (idVei) => {
        const con = await conectarBancoDeDados();
        //lógica para inserir os dados nas tabelas correspondentes no seu banco de dados
        try {
            //métodos para inserir os dados
            const person = await con.query(`delete from tbl_veiculo where tbl_pessoa_id = ?`,
                [idVei]);
            return person;
            // return { message: 'Usuário registrado com sucesso!', result: true };
        } catch (error) {
            throw new Error(`Erro ao registrar: ${error.message}`);
        }
    };

    validarCampos() {
        return (
            this.placa,
            this.marca,
            this.ano,
            this.modelo
        );
    }
}

export default os;