import conectarBancoDeDados from '../../config/db.js';

class Pessoa {
    constructor(pPes) {
        this.id = (pPes.id !== null || pPes.id > 0) ? pPes.id : null;
        this.nome = pPes.nome;
        this.cpf = pPes.cpf;
        this.email = pPes.email;
        this.tipo = pPes.tipo || null; 
    }
    get Id() { return this.id; }
    set Id(value) { this.id = value; }

    get Nome() { return this.nome; }
    set Nome(value) { this.nome = value; }

    get Cpf() { return this.cpf; }
    set Cpf(value) { this.cpf = value; }

    get Email() { return this.email; }
    set Email(value) { this.email = value; }

    get Tipo() { return this.tipo; }
    set Tipo(value) { this.tipo = value; }



    novoRegistroPessoa = async () => {
        const con = await conectarBancoDeDados();
        try {
            const query = `INSERT INTO tbl_pessoa (nome, cpf, email${this.tipo ? ', tipo' : ''}) VALUES (?, ?, ?${this.tipo ? ', ?' : ''})`;
            const values = [this.nome, this.cpf, this.email];
            if (this.tipo) values.push(this.tipo); 
            const person = await con.query(query, values);
            return person[0].insertId;
        } catch (error) {
            throw new Error(`Erro ao registrar: ${error.message}`);
        }finally{
            con.release();
        }
    };
    
    
    static selectRegistroPessoa = async (idPessoa) => {
        const con = await conectarBancoDeDados();
        try {
            const query = `
            SELECT 
  p.id AS pessoa_id, 
  p.nome, 
  p.cpf, 
  p.email, 
  p.tipo,
  e.logradouro, 
  e.bairro, 
  e.estado, 
  e.numero, 
  e.complemento, 
  e.cep,
  t.telefone,
  l.perfil,
  l.login,
  l.senha
FROM tbl_pessoa p
INNER JOIN tbl_endereco e ON p.id = e.tbl_pessoa_id
INNER JOIN tbl_telefone t ON p.id = t.tbl_pessoa_id
INNER JOIN tbl_login l ON p.id = l.tbl_pessoa_id
WHERE p.id = ?;

          `;
            const [rows] = await con.query(query, [idPessoa]);
            return rows;
        } catch (error) {
            throw new Error(`Erro ao selecionar: ${error.message}`);
        } finally {
            await con.release();
        }
    };

    atualizarRegistroPessoa = async () => {
        const con = await conectarBancoDeDados();
        try {
            const query = `UPDATE tbl_pessoa SET nome = ?, cpf = ?, email = ?${this.tipo ? ', tipo = ?' : ''} WHERE id = ?`;
            const values = [this.nome, this.cpf, this.email];
            if (this.tipo) values.push(this.tipo); 
            values.push(this.id);
            
            await con.query(query, values);
        } catch (error) {
            throw new Error(`Erro ao atualizar: ${error.message}`);
        }
    };
    
    

    deleteRegistroPessoa = async (idPessoa) => {
        const con = await conectarBancoDeDados();
        try {
            const person = await con.query(`delete from tbl_pessoa where id=?`,
                [idPessoa]);
            return person;
        } catch (error) {
            throw new Error(`Erro ao registrar: ${error.message}`);
        }
    };

   
    validarCampos() {
        return (
            this.nome &&
            this.cpf &&
            this.email &&
            (this.tipo !== undefined || this.tipo === null) 
        );
    }
    

}

export default Pessoa;


