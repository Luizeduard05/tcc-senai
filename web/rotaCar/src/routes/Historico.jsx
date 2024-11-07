import stylesH from "./Historico.module.css";
import { useState, useEffect } from 'react';
import { useAuth } from "../Context/ContextUser";
import api from "../../service/api";

const Historico = () => {
    const { id, token } = useAuth();
    const [Os, setOs] = useState([]);
    const [veiculos, setVeiculos] = useState([]);

    const statusMap = {
        0: 'Aguardando Retorno',
        1: 'Aprovado',
        2: 'Reprovado',
    };

    const fetchUserData = async () => {
        try {
            const response = await api.get(`/os/${id}`, {
                headers: { Authorization: `Token ${token}` }
            });
            setOs(response.data.ordensServico);
            setVeiculos(response.data.veiculos);
            console.log("Dados retornados:", response.data);
        } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <>
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
                        </tr>
                    </thead>
                    <tbody id="corpo-tabela-dados">
                        {Array.isArray(Os) && Os.length > 0 ? (
                            Os.map((ordem, index) => {
                                const veiculoInfo = veiculos.find(veiculo => veiculo.id === ordem.id_veiculo);
                                return (
                                    <tr key={index}>
                                        <td>{veiculoInfo ? veiculoInfo.modelo : 'N/A'}</td>
                                        <td>{veiculoInfo ? veiculoInfo.placa : 'N/A'}</td>
                                        <td>{ordem.total}</td>
                                        <td>{statusMap[ordem.status] || 'Desconhecido'}</td>
                                        <td>{new Date(ordem.data).toLocaleDateString()}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="5">Nenhum orçamento encontrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </>
    );
};

export default Historico;
