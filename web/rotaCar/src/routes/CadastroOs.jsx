import { useState, useEffect } from "react";
import api from "../../service/api";
import styleCadOs from "./Cadastro.module.css";
import { useAuth } from "../Context/ContextUser";
import Modal from 'react-modal';
import { motion } from 'framer-motion'; // Corrigido para usar `motion`

Modal.setAppElement('#root');

const CadastroOs = () => {
    const { token, tipo, id } = useAuth();
    const [veiculos, setVeiculos] = useState([]);
    const [formData, setFormData] = useState({
        data: "",
        status: "Aguardando Retorno",
        mo: "",
        idPessoaVei: "",
        idVei: "",
        itens: [],
        mecanico: ""
    });
    const [usuarios, setUsuarios] = useState([]);
    const [mecanicos, setMecanicos] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [itensSelecionados, setItensSelecionados] = useState([]);
    const [total, setTotal] = useState(0);
    const [modalAberto, setModalAberto] = useState(false); // Controle do modal

    // Hook para animação do modal
    const modalAnimation = {
        opacity: modalAberto ? 1 : 0,
        scale: modalAberto ? 1 : 0.8
    };

    useEffect(() => {
        const fetchUsuarios = async () => {
            const response = await api.get("/todosUser", {
                headers: { Authorization: `Token ${token}` }
            });

            const usuariosFiltrados = response.data.result.filter(usuario => usuario.tipo === "CLI");

            if (tipo === "MEC") {
                const response = await api.get(`/usuario/${id}`, {
                    headers: { Authorization: `Token ${token}` }
                })
                const mecanicoId = response.data.result.pessoa_id;
                setFormData(prevFormData => ({ ...prevFormData, mecanico: mecanicoId }));
            } else {
                const mecanicosFiltrados = response.data.result.filter(mecanico => mecanico.tipo === "MEC");
                setMecanicos(mecanicosFiltrados);
            }

            setUsuarios(usuariosFiltrados);
        };


        const fetchProdutos = async () => {
            const response = await api.get("/todasPecas", {
                headers: { Authorization: `Token ${token}` }
            });
            console.log(response.data.pecas)
            setProdutos(response.data.pecas);
        };

        fetchUsuarios();
        fetchProdutos();
    }, [token]);


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
            [name]: value,
        });
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const newItens = [...formData.itens];
        newItens[index][name] = value;

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

        if (newQuantity >= 1) {
            newItens[index].quantidade = newQuantity;
            setFormData({ ...formData, itens: newItens });
        }
    };


    useEffect(() => {
        const fetchProdutos = async () => {
            const response = await api.get("/todasPecas", {
                headers: { Authorization: `Token ${token}` }
            });
            setProdutos(response.data.pecas);
        };

        fetchProdutos();
    }, [token]);

    // Adicionar múltiplos itens à lista de peças
    const addItens = () => {
        const novosItens = itensSelecionados.map(produto => ({
            id_produto: produto.id,
            quantidade: 1,
            valor: produto.valor_produto
        }));

        setFormData(prevState => ({
            ...prevState,
            itens: [...prevState.itens, ...novosItens]
        }));
        setItensSelecionados([]); // Limpa os itens selecionados no modal
        setModalAberto(false); // Fecha o modal após adicionar as peças
    };

    // Atualizar a seleção das peças
    const handleItemClick = (produto) => {
        // Verifica se a peça já foi selecionada
        if (!itensSelecionados.find(item => item.id === produto.id)) {
            setItensSelecionados(prevItems => [...prevItems, produto]);
        }
    };

    // Remover item da lista de itens selecionados no modal
    const removeItemSelecionado = (produto) => {
        setItensSelecionados(prevItems => prevItems.filter(item => item.id !== produto.id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.data || !formData.idVei) {
            console.error("Data ou ID do veículo não foram fornecidos.");
            return;
        }

        const formattedDate = new Date(formData.data).toISOString().split('T')[0];

        const dataToSend = {
            ...formData,
            mecanico: formData.mecanico || id,
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

                if (response && response.data && response.data.person && response.data.person.length > 0) {
                    setVeiculos(response.data.person);
                } else {
                    setVeiculos([]);
                }
            } catch (error) {
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

                            {/* {formData.itens.map((item, index) => (
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

                                    <button type="button" onClick={() => removeItem(index)}>Remover Item</button>
                                </div>
                            ))} */}

{formData.itens.map((item, index) => (
    <div key={index} className={styleCadOs.itemCard}>
        <div className={styleCadOs.itemInfo}>
            <div className={styleCadOs.inputBox}>
                <input
                    type="text"
                    className={styleCadOs.inputField}
                    name="produto"
                    value={produtos.find(produto => produto.id === item.id_produto)?.nome_produto || "Produto Selecionado"}
                    readOnly
                />
                <i className="inputIcon">Produto</i>
            </div>

            <div className={styleCadOs.inputBox}>
                <button type="button" className={styleCadOs.buttonQuantity} onClick={() => handleQuantityChange(index, -1)}>-</button>
                <input
                    type="text"
                    className={styleCadOs.inputField}
                    name="quantidade"
                    value={item.quantidade}
                    readOnly
                />
                <button type="button" className={styleCadOs.buttonQuantity} onClick={() => handleQuantityChange(index, 1)}>+</button>
                <i className="inputIcon">Quantidade</i>
            </div>

            <div className={styleCadOs.inputBox}>
                <input
                    type="text"
                    className={styleCadOs.inputField}
                    name="valor"
                    value={item.valor}
                    readOnly
                />
                <i className="inputIcon">Valor</i>
            </div>
        </div>

        <button
            type="button"
            className={styleCadOs.removeButton}
            onClick={() => removeItem(index)}
        >
            Remover
        </button>
    </div>
))}

                            <button type="button" onClick={() => setModalAberto(true)}>Adicionar Peça</button>

                            <div className={styleCadOs.total}>
                                <h3>Total: R$ {total.toFixed(2)}</h3>
                            </div>

                            <div className={styleCadOs.buttonCad}>
                                <input type="submit" value="Cadastrar" />
                            </div>
                            {/* Modal usando React Modal */}
                            <Modal
                                isOpen={modalAberto}
                                onRequestClose={() => setModalAberto(false)}
                                contentLabel="Selecionar Peça"
                                overlayClassName="modalOverlay"
                                className="modalContent"
                            >
                                <motion.div style={modalAnimation} transition={{ duration: 0.3 }}>
                                    <h3>Selecione as Peças</h3>
                                    <ul>
                                        {produtos.map(produto => (
                                            <li
                                                key={produto.id}
                                                onClick={() => handleItemClick(produto)}
                                                style={{
                                                    cursor: 'pointer',
                                                    padding: '5px',
                                                    border: '1px solid #ccc',
                                                    marginBottom: '5px',
                                                    backgroundColor: itensSelecionados.find(item => item.id === produto.id) ? '#d3f9d8' : 'white'
                                                }}
                                            >
                                                {produto.nome_produto} - R$ {produto.valor_produto}
                                            </li>
                                        ))}
                                    </ul>

                                    {itensSelecionados.length > 0 && (
                                        <div>
                                            <h4>Itens Selecionados:</h4>
                                            <ul>
                                                {itensSelecionados.map(produto => (
                                                    <li key={produto.id}>
                                                        {produto.nome_produto} - R$ {produto.valor_produto}
                                                        <button onClick={() => removeItemSelecionado(produto)}>Remover</button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <button onClick={addItens}>Confirmar</button>
                                    <button onClick={() => setModalAberto(false)}>Fechar</button>
                                </motion.div>
                            </Modal>
                        </form>
                    </div>
                </div>

            </section>
        </section>


    );
};

export default CadastroOs;
