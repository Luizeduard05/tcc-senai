import stylesH from "./Historico.module.css";
import { useState, useEffect } from 'react';
import { useAuth } from "../Context/ContextUser";
import api from "../../service/api";

const Historico = () => {
    const { id, token, tipo } = useAuth();
    const [Os, setOs] = useState([]);
    const [nomeMap, setNomeMap] = useState({});
    const [veiculos, setVeiculos] = useState([]);

    const statusMap = {
        0: 'Aguardando Retorno',
        1: 'Aprovado',
        2: 'Reprovado',
    };

    const fetchUserData = async () => {
        try {
            let ordensServico = [];
    
            // Verifica o tipo de usuário e carrega as ordens de serviço
            if (tipo === "ADM") {
                const responseOs = await api.get(`/orcamentos`, {
                    headers: { Authorization: `Token ${token}` }
                });
                ordensServico = responseOs.data.ordensServico;
            } else if (tipo === "MEC") {
                const responseOs = await api.get(`/orcamentos`, {
                    headers: { Authorization: `Token ${token}` }
                });
                ordensServico = responseOs.data.ordensServico.filter(
                    (ordem) => ordem.id_mecanico === id
                );
            } else if (tipo === "CLI") {
                const responseOs = await api.get(`/os/${id}`, {
                    headers: { Authorization: `Token ${token}` }
                });
                ordensServico = responseOs.data.ordensServico;
            }
    
            // Fetch veículos se for cliente
            if (tipo === "CLI") {
                const responseVeiculos = await api.get(`/veiculos/${id}`, {
                    headers: { Authorization: `Token ${token}` }
                });
                const veiculosData = responseVeiculos.data.person || [];
                setVeiculos(veiculosData);
    
                // Associa veículos às ordens de serviço
                const ordensComVeiculos = ordensServico.map((ordem) => {
                    const veiculoAssociado = veiculosData.find(
                        (veiculo) => veiculo.id === ordem.id_veiculo
                    );
    
                    return {
                        ...ordem,
                        veiculo: veiculoAssociado || null, // Se não encontrar, define como null
                    };
                });
    
                setOs(ordensComVeiculos);
                console.log("Ordens de Serviço com veículos associados:", ordensComVeiculos);
            } else {
                setOs(ordensServico);
            }
    
            console.log("Veículos:", veiculos);
        } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
        }
    };
    
    // Chama a função `fetchUserData` sempre que o tipo de usuário ou id mudar
    useEffect(() => {
        fetchUserData();
    }, [tipo, id]);
    

    const formatDate = (dateString) => {
        if (!dateString) return 'Data não disponível';
        try {
            return new Date(dateString).toLocaleDateString();
        } catch (error) {
            console.error("Erro ao formatar a data:", dateString, error);
            return 'Formato inválido';
        }
    };

    return (
        <section className={stylesH.dados}>
            <h1 className={stylesH.heading}><span>Orçamentos</span></h1>
            <table className={stylesH.container}>
                <thead>
                    <tr>
                        <th>Modelo</th>
                        <th>Placa</th>
                        <th>Valor</th>
                        <th>Status</th>
                        <th>Data</th>
                        {tipo !== "CLI" && <th>Nome do Cliente</th>}
                    </tr>
                </thead>
                <tbody id="corpo-tabela-dados">
                    {Array.isArray(Os) && Os.length > 0 ? (
                        Os.map((ordem, index) => (
                            <tr key={index}>
                                <td>{ordem.veiculo ? ordem.veiculo.modelo : 'Modelo não disponível'}</td>
                                <td>{ordem.veiculo ? ordem.veiculo.placa : 'Placa não disponível'}</td>
                                <td>{ordem.total || 'N/A'}</td>
                                <td>{statusMap[ordem.status] || 'Desconhecido'}</td>
                                <td>{ordem.data ? formatDate(ordem.data) : 'Data não disponível'}</td>
                                {tipo !== "CLI" && (
                                    <td>{nomeMap[ordem.id_pessoa] || 'N/A'}</td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={tipo !== "CLI" ? 6 : 5}>Nenhum orçamento encontrado.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
};

export default Historico;
