import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import api from "../../service/api";
import { useAuth } from "../Context/ContextUser";
import styleCadOs from "./CadastroOs.module.css";

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
    const [produtosSelecionados, setProdutosSelecionados] = useState([]);
    const [total, setTotal] = useState(0);
    const [modalAberto, setModalAberto] = useState(false); // Controle do modal

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
                const mecanicoId = response.data.result.pessoa_id; // Ajuste conforme a estrutura da resposta
                setFormData(prevFormData => ({ ...prevFormData, mecanico: mecanicoId }));
            } else {
                const mecanicosFiltrados = response.data.result.filter(mecanico => mecanico.tipo === "MEC");
                setMecanicos(mecanicosFiltrados);
            }
            // console.log(response.data.result);
            setUsuarios(usuariosFiltrados);
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
            [name]: value,
        });
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

    const removeItem = (index) => {
        const newItens = [...formData.itens];  // Cria uma cópia do array de itens
        newItens.splice(index, 1);  // Remove o item com o índice fornecido
        setFormData(prevState => ({
            ...prevState,
            itens: newItens  // Atualiza o estado com os novos itens
        }));
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
            alert("OS cadastrada!")
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Ocorreu um erro")
        }
    };

    // Adicionar múltiplos itens à lista de peças
    const addItens = () => {
        const novosItens = produtosSelecionados.map(produto => ({
            id_produto: produto.id,
            quantidade: 1,
            valor: produto.valor_produto
        }));

        setFormData(prevState => ({
            ...prevState,
            itens: [...prevState.itens, ...novosItens]
        }));
        setProdutosSelecionados([]); // Limpa os itens selecionados no modal
        setModalAberto(false); // Fecha o modal após adicionar as peças
    };

    // Atualizar a seleção das peças
    const handleItemClick = (produto) => {
        // Verifica se a peça já foi selecionada
        if (!produtosSelecionados.find(item => item.id === produto.id)) {
            setProdutosSelecionados(prevItems => [...prevItems, produto]);
        }
    };

    // Remover item da lista de itens selecionados no modal
    const removeItemSelecionado = (produto) => {
        setProdutosSelecionados(prevItems => prevItems.filter(item => item.id !== produto.id));
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
                                <select className={styleCadOs.selectField} name="idPessoaVei" value={formData.idPessoaVei} onChange={handleUserChange} required>
                                    <option value="">Selecione uma pessoa</option>
                                    {usuarios.map(user => (
                                        <option key={user.pessoa_id} value={user.pessoa_id}>{user.nome}</option>
                                    ))}
                                </select>
                            </div>

                            <div className={styleCadOs.inputBox}>
                                <input type="text" name="status" value={formData.status} onChange={handleChange} required />
                                <i>Status</i>
                            </div>

                            <div className={styleCadOs.inputBox}>
                                <select className={styleCadOs.selectField} name="idVei" value={formData.idVei} onChange={handleChange}>
                                    <option value="">Selecione um veículo</option>
                                    {veiculos.map(veiculo => (
                                        <option key={veiculo.id} value={veiculo.id}>
                                            {`${veiculo.placa} - ${veiculo.modelo}`}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={styleCadOs.inputBox}>
                                <input type="text" name="mo" value={formData.mo} onChange={handleChange} required />
                                <i>Mão de obra</i>
                            </div>

                            {tipo === "ADM" &&
                                <div className={styleCadOs.inputBox}>
                                    <select className={styleCadOs.selectField} name="mecanico" value={formData.mecanico} onChange={handleChange} required>
                                        <option value="">Selecione um mecânico</option>
                                        {mecanicos.map(user => (
                                            <option key={user.pessoa_id} value={user.pessoa_id}>{user.nome}</option>
                                        ))}
                                    </select>
                                </div>
                            }

                            <div>
                                <h3 className={styleCadOs.listTitle}>Lista de Peças</h3>
                                {formData.itens.length > 0 ? (
                                    <ul className={styleCadOs.itemList}>
                                        {formData.itens.map((item, index) => (
                                            <li key={index} className={styleCadOs.itemCard}>
                                                <div className={styleCadOs.itemInfo}>
                                                    <span className={styleCadOs.itemName}>
                                                        {produtos.find(produto => produto.id === item.id_produto)?.nome_produto || "Produto Selecionado"}
                                                    </span>
                                                    <div className={styleCadOs.quantityControl}>

                                                        <span className={styleCadOs.quantityDisplay}>{item.quantidade}</span>
                                                        <button
                                                            type="button"
                                                            className={styleCadOs.buttonQuantity}
                                                            onClick={() => handleQuantityChange(index, 1)}
                                                        >
                                                            +
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className={styleCadOs.buttonQuantity}
                                                            onClick={() => handleQuantityChange(index, -1)}
                                                        >
                                                            -
                                                        </button>
                                                    </div>
                                                    <span className={styleCadOs.itemTotal}>
                                                        R$ {(parseFloat(item.valor) * parseInt(item.quantidade || 1)).toFixed(2)}
                                                    </span>
                                                </div>
                                                <button
                                                    type="button"
                                                    className={styleCadOs.removeButton}
                                                    onClick={() => removeItem(index)} 
                                                >
                                                    Remover
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className={styleCadOs.emptyMessage}>Nenhuma peça adicionada ainda.</p>
                                )}
                                <button type="button" onClick={() => setModalAberto(true)}>Adicionar Peça</button>
                            </div>

                            <div>
                                <div className={styleCadOs.total}>
                                    <h3>Total: R$ {total.toFixed(2)}</h3>
                                </div>
                                <div>
                                    <input type="submit" value="Cadastrar" />
                                </div>
                            </div>

                            {/* Modal usando React Modal */}
                            <Modal
                                isOpen={modalAberto}
                                onRequestClose={() => setModalAberto(false)}
                                contentLabel="Selecionar Peça"
                                overlayClassName="modalOverlay"
                                className={styleCadOs.modalContent}
                            >
                                <motion.div transition={{ duration: 0.3 }}>
                                    <div className={styleCadOs.dadosModal}>
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
                                                        backgroundColor: produtosSelecionados.find(item => item.id === produto.id) ? '#d3f9d8' : 'white'
                                                    }}
                                                >
                                                    {produto.nome_produto} - R$ {produto.valor_produto}
                                                </li>
                                            ))}
                                        </ul>

                                        {produtosSelecionados.length > 0 && (
                                            <div className={styleCadOs.alinhaCenter}>
                                                <h3>Itens Selecionados:</h3>
                                                <ul>
                                                    {produtosSelecionados.map(produto => (
                                                        <li key={produto.id} className={styleCadOs.itensListaS}>
                                                            {produto.nome_produto} - R$ {produto.valor_produto}
                                                            <button
                                                                className={styleCadOs.buttonRemove}
                                                                onClick={() => removeItemSelecionado(produto)}
                                                            >
                                                                Remover
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <div className={styleCadOs.alinhaCenterBtn}>
                                                    <button className={`${styleCadOs.button} ${styleCadOs.buttonClose}`} onClick={() => setModalAberto(false)}>
                                                        Fechar
                                                    </button>

                                                    <button className={`${styleCadOs.button} ${styleCadOs.buttonConfirm}`} onClick={addItens}>
                                                        Confirmar
                                                    </button>
                                                </div>
                                            </div>

                                        )}


                                    </div>
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
