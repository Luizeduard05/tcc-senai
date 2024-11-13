import React, { useState, useEffect } from "react";
import api from "../../service/api";
import styleCadOs from "./Cadastro.module.css";

const CadastroOs = () => {
    const [formData, setFormData] = useState({
        data: "",
        status: "Aguardando Retorno",
        mo: "",
        idPessoaVei: "",
        idVei: "",
        itens: [{ id_produto: "", quantidade: "", valor: "" }],
        mecanico: ""
    });
    const [usuarios, setUsuarios] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [total, setTotal] = useState(0);

    // Carregar lista de usuários e produtos
    useEffect(() => {
        const fetchUsuarios = async () => {
            const response = await api.get("/usuarios");
            setUsuarios(response.data);
        };

        const fetchProdutos = async () => {
            const response = await api.get("/produtos");
            setProdutos(response.data);
        };

        fetchUsuarios();
        fetchProdutos();
    }, []);

    // Calcular total
    useEffect(() => {
        const totalItens = formData.itens.reduce((acc, item) => acc + parseFloat(item.valor || 0) * parseInt(item.quantidade || 1), 0);
        setTotal(totalItens + parseFloat(formData.mo || 0));
    }, [formData.itens, formData.mo]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleItemChange = (index, e) => {
        const newItens = [...formData.itens];
        newItens[index][e.target.name] = e.target.value;
        setFormData({ ...formData, itens: newItens });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/usuarios", formData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className={styleCadOs.pai}>
            <section className={styleCadOs.containerCad}>
                <div className={styleCadOs.signin}>
                    <div className={styleCadOs.content}>
                        <h2>Cadastro de Ordem de Serviço</h2>
                        <form className={styleCadOs.form} onSubmit={handleSubmit}>
                            <div className={styleCadOs.inputBox}>
                                <input type="text" name="data" value={formData.data} onChange={handleChange} required />
                                <i>Data</i>
                            </div>
                            <div className={styleCadOs.inputBox}>
                                <input type="text" name="status" value={formData.status} onChange={handleChange} required />
                                <i>Status</i>
                            </div>
                            <div className={styleCadOs.inputBox}>
                                <input type="text" name="mo" value={formData.mo} onChange={handleChange} required />
                                <i>Mão de obra</i>
                            </div>
                            <div className={styleCadOs.inputBox}>
                                <select name="idPessoaVei" value={formData.idPessoaVei} onChange={handleChange} required>
                                    <option value="">Selecione uma pessoa</option>
                                    {usuarios.map(user => (
                                        <option key={user.id} value={user.id}>{user.nome}</option>
                                    ))}
                                </select>
                                <i>Pessoa</i>
                            </div>
                            <div className={styleCadOs.inputBox}>
                                <select name="mecanico" value={formData.mecanico} onChange={handleChange} required>
                                    <option value="">Selecione um mecânico</option>
                                    {usuarios.map(user => (
                                        <option key={user.id} value={user.id}>{user.nome}</option>
                                    ))}
                                </select>
                                <i>Mecânico</i>
                            </div>
                            {formData.itens.map((item, index) => (
                                <div key={index} className={styleCadOs.itemContainer}>
                                    <div className={styleCadOs.inputBox}>
                                        <select name="id_produto" value={item.id_produto} onChange={(e) => handleItemChange(index, e)} required>
                                            <option value="">Selecione uma peça</option>
                                            {produtos.map(produto => (
                                                <option key={produto.id} value={produto.id}>{produto.nome}</option>
                                            ))}
                                        </select>
                                        <i>ID Produto</i>
                                    </div>
                                    <div className={styleCadOs.inputBox}>
                                        <input type="text" name="quantidade" value={item.quantidade} onChange={(e) => handleItemChange(index, e)} required />
                                        <i>Quantidade</i>
                                    </div>
                                    <div className={styleCadOs.inputBox}>
                                        <input type="text" name="valor" value={item.valor} onChange={(e) => handleItemChange(index, e)} required />
                                        <i>Valor</i>
                                    </div>
                                </div>
                            ))}
                            <div className={styleCadOs.total}>
                                <h3>Total: R$ {total.toFixed(2)}</h3>
                            </div>
                            <div className={styleCadOs.buttonCad}>
                                <input type="submit" value="Cadastrar" />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default CadastroOs;
