import stylesPerfil from "./Perfil.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../Context/ContextUser";
import api from "../../service/api";
import Header from "../component/Header";

const Perfil = () => {
    const { user, token, id } = useAuth();
    const [orcamentos, setOrcamentos] = useState([]); // Inicializado como array vazio
    const [veiculos, setVeiculos] = useState([]);
    const [agendamentos, setAgendamentos] = useState([]);
    const [userData, setUserData] = useState(null);
    const [ordensServico, setOrdensServico] = useState([]);




    // Função para buscar perfil do usuário
    const fetchUserProfile = async () => {
        try {
            const response = await api.get(`/usuario/${id}`, {
                headers: { Authorization: `Token ${token}` },
            });

            // Garante que os dados existem antes de acessar
            if (response.data?.result?.length > 0) {
                setUserData(response.data.result[0]);
            } else {
                console.error("Nenhum dado de perfil encontrado.");
            }
        } catch (error) {
            console.error("Erro ao buscar perfil do usuário:", error);
        }
    };




    // Função para buscar ordens de serviço
    const fetchOrdensServico = async () => {
        try {
            const response = await api.get(`Os/${id}`, {
                headers: { Authorization: `Token ${token}` },
            });
            setOrdensServico(response.data.ordensServico); // Armazena as ordens de serviço no estado
        } catch (error) {
            console.error("Erro ao buscar ordens de serviço:", error);
        }
    };



    // Função para buscar veículos
    // Função para buscar veículos
    const fetchVeiculos = async () => {
        try {
            const response = await api.get(`/veiculos/${id}`, {
                headers: { Authorization: `Token ${token}` },
            });
            // Ajuste para usar a chave correta da resposta
            setVeiculos(response.data.person);
        } catch (error) {
            console.error("Erro ao buscar veículos:", error);
        }
    };


    // Função para buscar agendamentos
    const fetchAgendamentos = async () => {
        try {
            const response = await api.get(`/agendamentos/${id}`, {
                headers: { Authorization: `Token ${token}` },
            });

            setAgendamentos(response.data?.result || []); // Define como array vazio se não houver resultado
        } catch (error) {
            console.error("Erro ao buscar agendamentos:", error);
        }
    };

    // Chamada das funções no useEffect
    useEffect(() => {
        fetchUserProfile();
        fetchOrdensServico();
        fetchVeiculos();
        fetchAgendamentos();
    }, []);

    return (
        <>
            {/* <Header /> */}

            <section className={stylesPerfil.container}>
                {userData ? (
                    <>
                        <div className={stylesPerfil.profileHeader}>
                            <div className={stylesPerfil.profileImage}>
                                <img
                                    src=""
                                    alt="Imagem do perfil"
                                    className={stylesPerfil.profilePicture}
                                />
                            </div>
                            <div className={stylesPerfil.profileInfo}>
                                <h1>{userData.nome}</h1>
                            
                                <p className={stylesPerfil.location}>
                                    {userData.logradouro}, {userData.bairro}, {userData.estado}
                                </p>
                            </div>
                        </div>

                        <div className={stylesPerfil.profileDetails}>
                            <div className={stylesPerfil.card}>
                                <h3>Meus Dados</h3>
                                <div className={stylesPerfil.profileInfo}>
                                <h1>{userData.nome}</h1>
                                <p>{userData.email}</p>
                                <p>{userData.cpf}</p>
                                <p>{userData.telefone}</p>
                                <p className={stylesPerfil.location}>
                                    {userData.logradouro}, {userData.bairro}, {userData.estado}
                                </p>
                            </div>
                            </div>

                            <div className={stylesPerfil.card}>
                                <h3>Últimos Orçamentos</h3>
                                {ordensServico.length > 0 ? (
                                    <ul>
                                        {/* Exibe apenas as 2 últimas ordens de serviço */}
                                        {ordensServico.slice(0, 2).map((ordem) => (
                                            <li key={ordem.id}>
                                                
                                                <strong>Data:</strong> {new Date(ordem.data).toLocaleDateString()}<br />
                                                <strong>Status:</strong> {ordem.status === 0 ? "Pendente" : "Concluída"}<br />
                                                <strong>Total:</strong> R$ {ordem.total}<br />
                                                <strong>Mão de Obra:</strong> R$ {ordem.mo}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Nenhuma ordem de serviço encontrada.</p>
                                )}
                            </div>

                            <div className={stylesPerfil.card}>
                                <h3>Seus Veículos</h3>
                                {veiculos.length > 0 ? (
                                    <ul>
                                        {veiculos.length > 0 ? (
                                            <ul>
                                                {veiculos.map((veiculo) => (
                                                    <li key={veiculo.id}>
                                                        <strong>{veiculo.modelo}</strong> - {veiculo.placa}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>Você não possui veículos cadastrados.</p>
                                        )}

                                    </ul>
                                ) : (
                                    <p>Você não possui veículos cadastrados.</p>
                                )}
                            </div>

                            <div className={stylesPerfil.card}>
                                <h3>Últimos Agendamentos</h3>
                                {agendamentos.length > 0 ? (
                                    <ul>
                                        {agendamentos.slice(0, 3).map((agendamento) => (
                                            <li key={agendamento.id}>
                                                <strong>Data:</strong> {new Date(agendamento.data).toLocaleDateString()} -
                                                <strong> Serviço:</strong> {agendamento.servico}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Nenhum agendamento encontrado.</p>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className={stylesPerfil.loading}>
                        <p>Carregando informações do perfil...</p>
                    </div>
                )}
            </section>
        </>
    );
};

export default Perfil;
