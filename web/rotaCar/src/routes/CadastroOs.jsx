import React, { useState, useEffect } from "react";
import api from "../../service/api";
import styleCadOs from "./Cadastro.module.css";
import { useAuth } from "../Context/ContextUser";

const CadastroOs = () => {
    const { token, tipo, id } = useAuth();
    const [veiculos, setVeiculos] = useState([]);

    const [formData, setFormData] = useState({
        data: "",
        status: "Aguardando Retorno",
        mo: "",
        idPessoaVei: "",
        idVei: "",
        itens: [{ id_produto: "", quantidade: 1, valor: 0 }],
        mecanico: ""
    });
    const [usuarios, setUsuarios] = useState([]);
    const [mecanicos, setMecanicos] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchUsuarios = async () => {
            const response = await api.get("/todosUser", {
                headers: { Authorization: `Token ${token}` }
            });
            // setUsuarios(response.data.result);

            const usuariosFiltrados = response.data.result.filter(usuario => usuario.tipo === "CLI");

            if (tipo === "MEC") {
                const response = await api.get(`/usuario/${id}`, {
                    headers: { Authorization: `Token ${token}` }
                })
                // setMecanicos(response.data.result);
                const mecanicoId = response.data.result.pessoa_id; // Ajuste conforme a estrutura da resposta
                setFormData(prevFormData => ({ ...prevFormData, mecanico: mecanicoId }));
            } else {
                const mecanicosFiltrados = response.data.result.filter(mecanico => mecanico.tipo === "MEC");
                setMecanicos(mecanicosFiltrados);
            }


            setUsuarios(usuariosFiltrados);
            // console.log(response.data.result);
        };

        const fetchProdutos = async () => {
            const response = await api.get("/todasPecas", {
                headers: { Authorization: `Token ${token}` }
            });
            setProdutos(response.data.pecas);
            console.log(response.data.pecas);
        };

        fetchUsuarios();
        fetchProdutos();
    }, [token]);

    // Calcular total
    useEffect(() => {
        const totalItens = formData.itens.reduce(
            (acc, item) => acc + parseFloat(item.valor || 0) * parseInt(item.quantidade || 1),
            0
        );
        setTotal(totalItens + parseFloat(formData.mo || 0));
    }, [formData.itens, formData.mo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value, // Atualiza o estado corretamente
        });
    };



    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const newItens = [...formData.itens];
        newItens[index][name] = value;

        // Se o nome do campo for id_produto, atualizamos o valor da peça selecionada
        if (name === "id_produto") {
            const selectedProduct = produtos.find(produto => produto.id === parseInt(value));
            if (selectedProduct) {
                newItens[index].valor = parseFloat(selectedProduct.valor_produto);
            }
        }

        setFormData({ ...formData, itens: newItens });
    };

    const handleQuantityChange = (index, delta) => {
        const newItens = [...formData.itens];
        const newQuantity = newItens[index].quantidade + delta;

        // Evitar que a quantidade fique abaixo de 1
        if (newQuantity >= 1) {
            newItens[index].quantidade = newQuantity;
            setFormData({ ...formData, itens: newItens });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Data selecionada:", formData.data);
        console.log("ID do Veículo selecionado:", formData.idVei);

        if (!formData.data || !formData.idVei) { // Verifica se data e idVei estão presentes
            console.error("Data ou ID do veículo não foram fornecidos.");
            return;
        }

        const formattedDate = new Date(formData.data).toISOString().split('T')[0];
        console.log("Data formatada:", formattedDate);

        // const dataToSend = {
        //     ...formData,
        //     data: formattedDate,
        // };

        const dataToSend = {
            ...formData,
            mecanico: formData.mecanico || id, // Usa o id do mecânico logado, caso não esteja preenchido
        };
        
        try {
            const response = await api.post("/os", dataToSend, {
                headers: { Authorization: `Token ${token}` },
                params: { idVei: formData.idVei, idPessoaVei: formData.idPessoaVei }
            });
            console.log("Resposta da API:", response.data);
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };






    const handleUserChange = async (e) => {
        const userId = e.target.value;
        setFormData({ ...formData, idPessoaVei: userId, idVei: "" });

        if (userId) {
            try {
                const response = await api.get(`/veiculos/${userId}`, {
                    headers: { Authorization: `Token ${token}` }
                });

                console.log("Resposta completa da API para veículos:", response);

                if (response && response.data && response.data.person && response.data.person.length > 0) {
                    setVeiculos(response.data.person);
                } else {
                    console.log("Nenhum veículo encontrado para este usuário.");
                    setVeiculos([]);
                }
            } catch (error) {
                console.error("Erro ao buscar veículos:", error);
                setVeiculos([]);
            }
        } else {
            setVeiculos([]);
        }
    };



    return (
        <section className={styleCadOs.pai}>
            
            <section className={styleCadOs.containerCad}>
            <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <div className={styleCadOs.signin}>
                    <div className={styleCadOs.content}>
                        <h2>Ordem de Serviço</h2>
                        <form className={styleCadOs.form} onSubmit={handleSubmit}>
                            <div className={styleCadOs.inputBox}>
                                <input
                                    type="date"
                                    name="data"
                                    value={formData.data || ''}
                                    onChange={handleChange}
                                    required
                                />
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
                                <select name="idPessoaVei" value={formData.idPessoaVei} onChange={handleUserChange} required>
                                    <option value="">Selecione uma pessoa</option>
                                    {usuarios.map(user => (
                                        <option key={user.pessoa_id} value={user.pessoa_id}>{user.nome}</option>
                                    ))}
                                </select>
                                <i>Pessoa</i>
                            </div>
                            <div className={styleCadOs.inputBox}>
                                <select name="idVei" value={formData.idVei} onChange={handleChange}>
                                    <option value="">Selecione um veículo</option>
                                    {veiculos.map(veiculo => (
                                        <option key={veiculo.id} value={veiculo.id}>
                                            {`${veiculo.placa} - ${veiculo.modelo}`}
                                        </option>
                                    ))}
                                </select>
                                <i>Veículo</i>
                            </div>

                            {tipo === "ADM" && 
                            <div className={styleCadOs.inputBox}>
                                <select name="mecanico" value={formData.mecanico} onChange={handleChange} required>
                                    <option value="">Selecione um mecânico</option>
                                    {mecanicos.map(user => (
                                        <option key={user.pessoa_id} value={user.pessoa_id}>{user.nome}</option>
                                    ))}
                                </select>
                                <i>Mecânico</i>
                            </div>
                            }

                            {formData.itens.map((item, index) => (
                                <div key={index} className={styleCadOs.itemContainer}>
                                    <div className={styleCadOs.inputBox}>
                                        <select
                                            name="id_produto"
                                            value={item.id_produto}
                                            onChange={(e) => handleItemChange(index, e)}
                                            required
                                        >
                                            <option value="">Selecione uma peça</option>
                                            {produtos.map(produto => (
                                                <option key={produto.id} value={produto.id}>{produto.nome_produto}</option>
                                            ))}
                                        </select>
                                        <i>Produto</i>
                                    </div>
                                    <div className={styleCadOs.inputBox}>
                                        <button type="button" onClick={() => handleQuantityChange(index, -1)}>-</button>
                                        <input
                                            type="text"
                                            name="quantidade"
                                            value={item.quantidade}
                                            readOnly
                                        />
                                        <button type="button" onClick={() => handleQuantityChange(index, 1)}>+</button>
                                        <i>Quantidade</i>
                                    </div>
                                    <div className={styleCadOs.inputBox}>
                                        <input
                                            type="text"
                                            name="valor"
                                            value={item.valor}
                                            readOnly
                                        />
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
