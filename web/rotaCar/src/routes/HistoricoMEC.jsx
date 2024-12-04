import stylesHM from "./HistoricoMEC.module.css";
import { useState, useEffect } from "react";
import { useAuth } from "../Context/ContextUser";
import api from "../../service/api";
import Header from "../component/Header";

const HistoricoMEC = () => {
    const { id, token, tipo } = useAuth();
    const [Os, setOs] = useState([]);
    const [nomeMap, setNomeMap] = useState([]);
    const [prontuario, setProntuario] = useState(null); // Estado para os dados do prontuário
    const [showProntuario, setShowProntuario] = useState(false); // Controle de exibição do modal

    const statusMap = {
        0: "Aguardando Retorno",
        1: "Aprovado",
        2: "Reprovado",
    };

    // Função para buscar os dados de orçamentos
    const fetchUserData = async () => {
        try {

            const response = await api.get("/orcamentos", {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            // console.log(response.data);
            // Filtrando os relacionada ao mecanico
            const osFiltradas = response.data.ordensServico.filter(os => os.id_mecanico === id)
            console.log(osFiltradas)

            const responseUsuarios = await api.get(`/todosUser`, {
                headers: { Authorization: `Token ${token}` },
            });
            const usuariosData = responseUsuarios.data.result;

            const nomeClienteMap = {};
            usuariosData.forEach((user) => {
                if (user.tipo === "CLI") {
                    nomeClienteMap[user.pessoa_id] = user.nome;
                }
            });
            setNomeMap(nomeClienteMap);

            setOs(osFiltradas);

        } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [tipo, id]);

    const formatDate = (dateString) => {
        if (!dateString) return "Data não disponível";
        try {
            return new Date(dateString).toLocaleDateString();
        } catch (error) {
            console.error("Erro ao formatar a data:", dateString, error);
            return "Formato inválido";
        }
    };

    // Função para buscar o prontuário do orçamento clicado
    const handleProntuarioClick = async (id_os) => {
        try {
            const response = await api.get(`/osPecas/${id_os}`, {
                headers: { Authorization: `Token ${token}` },
            });
            setProntuario(response.data.rows); // Salva os dados do prontuário
            setShowProntuario(true); // Exibe o modal
        } catch (error) {
            console.error("Erro ao buscar prontuário:", error);
        }
    };

    const closeProntuario = () => {
        setProntuario(null);
        setShowProntuario(false);
    };

    return (
        <>
            <Header />

            <section className={stylesHM.dados}>
                <h1 className={stylesHM.heading}>
                    <span>Orçamentos MEC</span>
                </h1>
                <table className={stylesHM.container}>
                    <thead>
                        <tr>
                            <th>Modelo</th>
                            <th>Placa</th>
                            <th>Valor</th>
                            <th>Status</th>
                            <th>Data</th>
                            {tipo !== "CLI" && <th>Nome do Cliente</th>}
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(Os) && Os.length > 0 ? (
                            Os.map((ordem, index) => (
                                <tr key={index}>
                                    <td>{ordem.modelo || "Modelo não disponível"}</td>
                                    <td>{ordem.placa || "Placa não disponível"}</td>
                                    <td>{ordem.total || "N/A"}</td>
                                    <td>{statusMap[ordem.status] || "Desconhecido"}</td>
                                    <td>{ordem.data ? formatDate(ordem.data) : "Data não disponível"}</td>
                                    {tipo !== "CLI" && <td>{nomeMap[ordem.id_pessoa] || "N/A"}</td>}
                                    <td>
                                        <button
                                            onClick={() => handleProntuarioClick(ordem.id_os)}
                                            className={stylesHM.iconButton}
                                            title="Ver Prontuário"
                                        >
                                            📋
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={tipo !== "CLI" ? 7 : 6}>Nenhum orçamento encontrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {showProntuario && prontuario && (
                    <div className={stylesHM.modal}>
                        <div className={stylesHM.modalContent}>
                            <h2>Prontuário</h2>
                            <table className={stylesHM.container}>
                                <thead>
                                    <tr>
                                        <th>Peças Usadas</th>
                                        <th>Marca</th>
                                        <th>Valor da Peça</th>
                                        <th>Quantidade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {prontuario.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.nome_produto}</td>
                                            <td>{item.marca_produto}</td>
                                            <td>{item.valor_produto}</td>
                                            <td>{item.quantidade}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button onClick={closeProntuario}>Fechar</button>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};

export default HistoricoMEC;
