import stylesA from "./Agendamentos.module.css";
import { useState, useEffect } from "react";
import { useAuth } from "../Context/ContextUser";
import api from "../../service/api";
import { parse, format, isToday, isThisWeek, compareAsc, parseISO } from "date-fns";
import Header from "../component/Header";

const Agendamentos = () => {




    const { token, tipo, id } = useAuth();
    const [agendamentos, setAgendamentos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [agendamentoEmEdicao, setAgendamentoEmEdicao] = useState(null);





    useEffect(() => {
       

       
        
    }, [token]);

    


    const getAgendamentos = async () => {
        try {
            const response = await api.get(`/agendar/pessoa/${id}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setAgendamentos(response.data);
        } catch (error) {
            console.log(error);
        }

        if(tipo === 'ADM' || tipo === 'MEC'){
            api.get("/agendamentos", { headers: { Authorization: `Token ${token}` } })
            .then((response) => {
                setAgendamentos(response.data.result || []);
            })
            .catch((error) => {
                console.error("Erro ao buscar agendamentos:", error);
            });
        


        api.get("/todosUser", { headers: { Authorization: `Token ${token}` } })
            .then((response) => {
                setUsuarios(response.data.result || []);
            })
            .catch((error) => {
                console.error("Erro ao buscar usuários:", error);
            });
        }
    };

    useEffect(() => {
        getAgendamentos();
    }, []);


    

    const getNomeUsuario = (pessoaId) => {
        const usuario = usuarios.find((u) => u.pessoa_id === pessoaId);
        return usuario ? usuario.nome : "Eu";
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/agendar/${id}`, {
                headers: { Authorization: `Token ${token}` },
            });
            setAgendamentos(agendamentos.filter((agendamento) => agendamento.id !== id));
        } catch (error) {
            console.error("Erro ao excluir agendamento:", error);
        }
    };

    const handleEdit = (agendamento) => {
        setAgendamentoEmEdicao(agendamento);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        try {
            const agendamentoAtualizado = {
                id: agendamentoEmEdicao.id,
                Data_e_hora: format(
                    parseISO(agendamentoEmEdicao.Data_e_hora), // Converte para ISO
                    "yyyy-MM-dd'T'HH:mm:ss"
                ),
                Observação: agendamentoEmEdicao.Observação,
                id_os: agendamentoEmEdicao.id_os || null,
                id_veiculo_os: agendamentoEmEdicao.id_veiculo_os,
                id_pessoa_veiculo_os: agendamentoEmEdicao.id_pessoa_veiculo_os,
            };

            const response = await api.put(
                `/agendar/${agendamentoEmEdicao.id}`,
                agendamentoAtualizado,
                {
                    headers: { Authorization: `Token ${token}` },
                }
            );

            setAgendamentos(
                agendamentos.map((item) =>
                    item.id === agendamentoEmEdicao.id ? response.data.result : item
                )
            );

            setAgendamentoEmEdicao(null); // Fecha o modal de edição
        } catch (error) {
            console.error("Erro ao atualizar agendamento:", error);
        }
    };



    const processarAgendamentos = () => {
        const hoje = [];
        const semana = [];
        const outros = [];

        agendamentos.forEach((item) => {
            const dataHora = parse(item.Data_e_hora, "dd/MM/yyyy, HH:mm:ss", new Date());

            if (isToday(dataHora)) {
                hoje.push(item);
            } else if (isThisWeek(dataHora)) {
                semana.push(item);
            } else {
                outros.push(item);
            }
        });

        const ordenarPorData = (arr) =>
            arr.sort((a, b) =>
                compareAsc(
                    parse(a.Data_e_hora, "dd/MM/yyyy, HH:mm:ss", new Date()),
                    parse(b.Data_e_hora, "dd/MM/yyyy, HH:mm:ss", new Date())
                )
            );

        return {
            hoje: ordenarPorData(hoje),
            semana: ordenarPorData(semana),
            outros: ordenarPorData(outros),
        };
    };

    const { hoje, semana, outros } = processarAgendamentos();

    return (
        <>
            <Header />

            <section className={stylesA.Pai}>

                <h1 className={stylesA.Titulo}>Agendamentos</h1>
                <h2>Hoje</h2>
                <div className={stylesA.Categoria1}>

                    {hoje.length > 0 ? (
                        hoje.map((item) => (
                            <div className={stylesA.Card} key={item.id}>
                                <p className={stylesA.NomeUser} ><strong>Cliente:</strong> {getNomeUsuario(item.id_pessoa_veiculo_os)}</p>
                                <p><strong>Data e Hora:</strong> {item.Data_e_hora}</p>
                                <p><strong>Observação:</strong> {item.Observação}</p>

                                <button onClick={() => handleEdit(item)}>Editar</button>
                                <button onClick={() => handleDelete(item.id)}>Excluir</button>
                            </div>
                        ))
                    ) : (
                        <p>Nenhum agendamento para hoje.</p>
                    )}
                </div>
                <h2>Esta Semana</h2>
                <div className={stylesA.Categoria2}>

                    {semana.length > 0 ? (
                        semana.map((item) => (
                            <div className={stylesA.Card} key={item.id}>
                                <p className={stylesA.NomeUser} ><strong>Cliente:</strong> {getNomeUsuario(item.id_pessoa_veiculo_os)}</p>
                                <p><strong>Data e Hora:</strong> {item.Data_e_hora}</p>
                                <p><strong>Observação:</strong> {item.Observação}</p>
                                
                            </div>
                        ))
                    ) : (
                        <p>Nenhum agendamento para esta semana.</p>
                    )}
                </div>
                <h2>Outros</h2>
                <div className={stylesA.Categoria3}>

                    {outros.length > 0 ? (
                        outros.map((item) => (
                            <div className={stylesA.Card} key={item.id}>
                                <p className={stylesA.NomeUser} ><strong>Cliente:</strong> {getNomeUsuario(item.id_pessoa_veiculo_os)}</p>
                                <p><strong>Data e Hora:</strong> {item.Data_e_hora}</p>
                                <p><strong>Observação:</strong> {item.Observação}</p>
                                
                            </div>
                        ))
                    ) : (
                        <p>Nenhum agendamento encontrado.</p>
                    )}
                </div>

                {/* O formulário de edição aparece quando há um agendamento em edição */}
                {agendamentoEmEdicao && (
                    <>
                        {/* Nome do cliente fixo no meio da tela */}


                        {/* Formulário de edição */}
                        <form
                            onSubmit={handleUpdate}
                            className={`${stylesA.Formulario} ${stylesA.FormularioEdicao}`}

                        >
                            <div className={stylesA.ClienteEdicao}>
                                <p className={stylesA.NomeUserF}>Editando: {getNomeUsuario(agendamentoEmEdicao.id_pessoa_veiculo_os)}</p>
                            </div>
                            <label>
                                Data e Hora:
                                <input
                                    type="datetime-local"
                                    value={agendamentoEmEdicao.Data_e_hora}
                                    onChange={(e) =>
                                        setAgendamentoEmEdicao({
                                            ...agendamentoEmEdicao,
                                            Data_e_hora: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </label>
                            <label>
                                Observação:
                                <textarea
                                    value={agendamentoEmEdicao.Observação}
                                    onChange={(e) =>
                                        setAgendamentoEmEdicao({
                                            ...agendamentoEmEdicao,
                                            Observação: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </label>
                            <button type="submit" className={stylesA.BotaoSalvar}>
                                Atualizar Agendamento
                            </button>
                            <button
                                type="button"
                                onClick={() => setAgendamentoEmEdicao(null)}
                                className={stylesA.BotaoCancelar}
                            >
                                Cancelar
                            </button>
                        </form>
                    </>
                )}


            </section>
        </>
    );
};

export default Agendamentos;
