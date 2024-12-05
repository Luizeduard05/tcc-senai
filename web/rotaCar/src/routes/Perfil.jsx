import stylesPerfil from "./Perfil.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../Context/ContextUser";
import api from "../../service/api";
import Header from "../component/Header";
import { FaEdit, FaSave, FaTimes, FaCamera } from "react-icons/fa"; // Ícones interativos para as ações

const Perfil = () => {
    const { tipo, token, id } = useAuth();
    const [orcamentos, setOrcamentos] = useState([]); // Inicializado como array vazio
    const [veiculos, setVeiculos] = useState([]);
    const [agendamentos, setAgendamentos] = useState([]);
    const [userData, setUserData] = useState(null);
    const [ordensServico, setOrdensServico] = useState([]);
    const [profileImage, setProfileImage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        nome: "",
        email: "",
        cpf: "",
        telefone: "",
        logradouro: "",
        bairro: "",
        estado: ""
    });

    const handleEditToggle = () => {
        if (!isEditing) {
            setEditData({
                nome: userData.nome,
                email: userData.email,
                cpf: userData.cpf,
                telefone: userData.telefone,
                logradouro: userData.logradouro,
                bairro: userData.bairro,
                estado: userData.estado
            });
        }
        setIsEditing(!isEditing);
    };

    const handleSaveChanges = async () => {
        try {
            const response = await api.put(`/usuarios/${id}`, {
                nome: userData.nome,
                cpf: userData.cpf,
                email: userData.email,
                logradouro: userData.logradouro,
                bairro: userData.bairro,
                estado: userData.estado,
                numero: userData.numero, // Certifique-se de incluir este campo
                complemento: userData.complemento,
                cep: userData.cep,
                telefone: userData.telefone,
            }, {
                headers: { Authorization: `Token ${token}` }
            });
            console.log("Dados atualizados com sucesso!", response.data);
        } catch (error) {
            if (error.response) {
                console.error("Erro ao atualizar os dados:", error.response.data);
            } else {
                console.error("Erro desconhecido:", error.message);
            }
        }
    };



    const handleProfileImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImage(reader.result); // Salva a imagem no estado
                localStorage.setItem("profileImage", reader.result); // Armazena no Local Storage
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const savedImage = localStorage.getItem("profileImage");
        if (savedImage) {
            setProfileImage(savedImage);
        }
    }, []);





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
            const response = await api.get(`/agendar/pessoa/${id}`, {
                headers: { Authorization: `Token ${token}` },
            });

            // Acessa os dados corretamente e define o estado com os agendamentos
            setAgendamentos(response.data || []);
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
                                <label htmlFor="profileImageUpload">
                                    {profileImage ? (
                                        <img
                                            src={profileImage}
                                            alt="Imagem do perfil"
                                            className={stylesPerfil.profilePicture}
                                        />
                                    ) : (
                                        <button><FaCamera/></button>
                                        
                                    )}
                                </label>
                                <input
                                    type="file"
                                    id="profileImageUpload"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={handleProfileImageChange}
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
                                {isEditing ? (
                                    <div>
                                        <label>
                                            Nome:
                                            <input
                                                type="text"
                                                value={editData.nome}
                                                onChange={(e) => setEditData({ ...editData, nome: e.target.value })}
                                            />
                                        </label>
                                        <label>
                                            Email:
                                            <input
                                                type="email"
                                                value={editData.email}
                                                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                            />
                                        </label>
                                        <label>
                                            CPF:
                                            <input
                                                type="text"
                                                value={editData.cpf}
                                                onChange={(e) => setEditData({ ...editData, cpf: e.target.value })}
                                            />
                                        </label>
                                        <label>
                                            Telefone:
                                            <input
                                                type="text"
                                                value={editData.telefone}
                                                onChange={(e) => setEditData({ ...editData, telefone: e.target.value })}
                                            />
                                        </label>
                                        <label>
                                            Logradouro:
                                            <input
                                                type="text"
                                                value={editData.logradouro}
                                                onChange={(e) => setEditData({ ...editData, logradouro: e.target.value })}
                                            />
                                        </label>
                                        <label>
                                            Bairro:
                                            <input
                                                type="text"
                                                value={editData.bairro}
                                                onChange={(e) => setEditData({ ...editData, bairro: e.target.value })}
                                            />
                                        </label>
                                        <label>
                                            Estado:
                                            <input
                                                type="text"
                                                value={editData.estado}
                                                onChange={(e) => setEditData({ ...editData, estado: e.target.value })}
                                            />
                                        </label>
                                        <div className={stylesPerfil.buttons}>
                                            <button onClick={handleSaveChanges}>
                                                <FaSave /> Salvar
                                            </button>
                                            <button onClick={handleEditToggle}>
                                                <FaTimes /> Cancelar
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={stylesPerfil.profileInfo}>
                                        <h1>{userData.nome}</h1>
                                        <p>{userData.email}</p>
                                        <p>{userData.cpf}</p>
                                        <p>{userData.telefone}</p>
                                        <p>
                                            {userData.logradouro}, {userData.bairro}, {userData.estado}
                                        </p>
                                        <button onClick={handleEditToggle}>
                                            <FaEdit /> Editar
                                        </button>
                                    </div>
                                )}
                            </div>



                            {tipo === "CLI" && (
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
                                            <button className={stylesPerfil.botaoCard}>ver mais</button>
                                        </ul>
                                    ) : (
                                        <p>Nenhuma ordem de serviço encontrada.</p>
                                    )}
                                </div>

                            )}



                            {tipo === "CLI" && (
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
                                            <button className={stylesPerfil.botaoCard}>ver mais</button>

                                        </ul>

                                    ) : (
                                        <p>Você não possui veículos cadastrados.</p>
                                    )}
                                </div>

                            )}

                            {tipo === "CLI" && (
                                <div className={stylesPerfil.card}>
                                    <h3>Últimos Agendamentos</h3>
                                    {agendamentos.length > 0 ? (
                                        <ul>
                                            {agendamentos.slice(0, 3).map((agendamento) => (
                                                <li key={agendamento.id}>
                                                    <strong>Data:</strong> {agendamento.Data_e_hora}<br />
                                                    <strong>Serviço:</strong> {agendamento.Observação}<br />
                                                    <strong>Modelo:</strong> {agendamento.modelo} ({agendamento.placa})
                                                </li>
                                            ))}
                                            <button className={stylesPerfil.botaoCard}>ver mais</button>

                                        </ul>
                                    ) : (
                                        <p>Nenhum agendamento encontrado.</p>
                                    )}
                                </div>
                            )}


                        </div><br />



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
