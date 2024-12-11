import stylesH from "./Historico.module.css";
import { useState, useEffect } from "react";
import { useAuth } from "../Context/ContextUser";
import api from "../../service/api";
import Header from "../component/Header";

const Historico = () => {
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

    const fetchVeiculoData = async (idVeiculo) => {
        try {
            const response = await api.get(`/veiculos/${idVeiculo}`, {
                headers: { Authorization: `Token ${token}` },
            });
    
            // Verifique se 'person' existe e contém dados
            if (response.data?.person && response.data.person.length > 0) {
                return response.data.person[0]; // Retorna o primeiro objeto no array 'person'
            } else {
                console.warn(`Nenhum dado encontrado para o veículo (ID: ${idVeiculo})`);
                return null; // Retorna nulo se não houver dados
            }
        } catch (error) {
            console.error(`Erro ao buscar dados do veículo (ID: ${idVeiculo}):`, error);
            return null; // Retorna nulo em caso de erro
        }
    };
    

    const fetchUserData = async () => {
        try {
            let ordensServico = [];
            if (tipo === "ADM") {
                const responseOs = await api.get(`/orcamentos`, {
                    headers: { Authorization: `Token ${token}` },
                });
                ordensServico = responseOs.data.ordensServico;

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
            }

            if (tipo === "CLI") {
                const responseOs = await api.get(`/os/${id}`, {
                    headers: { Authorization: `Token ${token}` },
                });
                ordensServico = responseOs.data.ordensServico;

                // Buscar informações adicionais dos veículos
                const updatedOrdensServico = await Promise.all(
                    ordensServico.map(async (ordem) => {
                        const veiculo = await fetchVeiculoData(ordem.id_veiculo);
                        return {
                            ...ordem,
                            modelo: veiculo?.modelo || "Modelo não disponível",
                            placa: veiculo?.placa || "Placa não disponível",
                        };
                    })
                );
                

                setOs(updatedOrdensServico);
            } else {
                setOs(ordensServico);
            }
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

    const handleProntuarioClick = async (id_os) => {
        try {
            const response = await api.get(`/osPecas/${id_os}`, {
                headers: { Authorization: `Token ${token}` },
            });
            setProntuario(response.data.rows);
            setShowProntuario(true);
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

            <section className={stylesH.dados}>
                <h1 className={stylesH.heading}>
                    <span>Orçamentos</span>
                </h1>
                <table className={stylesH.container}>
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
                                    <td>{ordem.modelo}</td>
                                    <td>{ordem.placa}</td>
                                    <td>{ordem.total || "N/A"}</td>
                                    <td>{statusMap[ordem.status] || "Desconhecido"}</td>
                                    <td>{ordem.data ? formatDate(ordem.data) : "Data não disponível"}</td>
                                    {tipo !== "CLI" && <td>{nomeMap[ordem.id_pessoa] || "N/A"}</td>}
                                    <td>
                                        <button
                                            onClick={() => handleProntuarioClick(ordem.id)}
                                            className={stylesH.iconButton}
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
                    <div className={stylesH.modal}>
                        <div className={stylesH.modalContent}>
                            <h2>Prontuário</h2>
                            <table className={stylesH.container}>
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

export default Historico;
