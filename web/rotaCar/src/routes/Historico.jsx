import stylesH from "./Historico.module.css";
import { useState, useEffect } from 'react';
import { useAuth } from "../Context/ContextUser";
import api from "../../service/api";

const Historico = () => {
    const { id, token, tipo } = useAuth();
    const [Os, setOs] = useState([]);
    const [nomeMap, setNomeMap] = useState({});

    const statusMap = {
        0: 'Aguardando Retorno',
        1: 'Aprovado',
        2: 'Reprovado',
    };

    const fetchUserData = async () => {
        try {
            // Buscar todos os orçamentos
            const responseOs = await api.get(tipo === "ADM" ? `/orcamentos` : `/os/${id}`, {
                headers: { Authorization: `Token ${token}` }
            });
            setOs(responseOs.data.ordensServico);

            // Buscar lista de todos os usuários para criar o mapa de pessoa_id -> nome
            const responseUsuarios = await api.get('/todosUser', {
                headers: { Authorization: `Token ${token}` }
            });
            const nomeMapTemp = {};
            responseUsuarios.data.result.forEach(usuario => {
                nomeMapTemp[usuario.pessoa_id] = usuario.nome;
            });
            setNomeMap(nomeMapTemp);

        } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [tipo]);

    const formatDate = (dateString) => {
        const [day, month, year, time] = dateString.split(/[\/,]/).map(item => item.trim());
        return new Date(`${year}-${month}-${day}T${time}`).toLocaleDateString();
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
                        <th>Nome do Cliente</th>
                    </tr>
                </thead>
                <tbody id="corpo-tabela-dados">
                    {Array.isArray(Os) && Os.length > 0 ? (
                        Os.map((ordem, index) => (
                            <tr key={index}>
                                <td>{ordem.modelo}</td>
                                <td>{ordem.placa}</td>
                                <td>{ordem.total}</td>
                                <td>{statusMap[ordem.status] || 'Desconhecido'}</td>
                                <td>{formatDate(ordem.data)}</td>
                                <td>{nomeMap[ordem.id_pessoa] || 'N/A'}</td> {/* Exibe o nome associado ao id_pessoa */}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">Nenhum orçamento encontrado.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
};

export default Historico;


