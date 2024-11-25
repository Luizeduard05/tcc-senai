import stylesA from "./Agendamentos.module.css";
import { useState, useEffect } from "react";
import { useAuth } from "../Context/ContextUser";
import api from "../../service/api";
import { parse, format, isToday, isThisWeek, compareAsc } from "date-fns";

const Agendamentos = () => {
    const { token } = useAuth();
    const [agendamentos, setAgendamentos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [agendamentoEmEdicao, setAgendamentoEmEdicao] = useState(null);

    useEffect(() => {
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
    }, [token]);

    const getNomeUsuario = (pessoaId) => {
        const usuario = usuarios.find((u) => u.pessoa_id === pessoaId);
        return usuario ? usuario.nome : "Desconhecido";
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
                ...agendamentoEmEdicao,
                Data_e_hora: format(parse(dataHora, "yyyy-MM-dd'T'HH:mm", new Date()), "dd/MM/yyyy, HH:mm:ss"),
                Observação: observacao,
            };

            const response = await api.put(`/agendamentos/${agendamentoEmEdicao.id}`, agendamentoAtualizado, {
                headers: { Authorization: `Token ${token}` },
            });

            setAgendamentos(agendamentos.map((item) => 
                item.id === agendamentoEmEdicao.id ? response.data.result : item
            ));

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
        <section className={stylesA.Pai}>
            <h1 className={stylesA.Titulo}>Agendamentos</h1>

            <div className={stylesA.Categoria}>
                <h2>Hoje</h2>
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

            {/* O formulário de edição aparece quando há um agendamento em edição */}
            {agendamentoEmEdicao && (
                <form onSubmit={handleUpdate}>
                    <label>
                        Data e Hora:
                        <input
                            type="datetime-local"
                            value={agendamentoEmEdicao.Data_e_hora}
                            onChange={(e) => setAgendamentoEmEdicao({ ...agendamentoEmEdicao, Data_e_hora: e.target.value })}
                            required
                        />
                    </label>
                    <label>
                        Observação:
                        <textarea
                            value={agendamentoEmEdicao.Observação}
                            onChange={(e) => setAgendamentoEmEdicao({ ...agendamentoEmEdicao, Observação: e.target.value })}
                            required
                        />
                    </label>
                    <button type="submit">Atualizar Agendamento</button>
                </form>
            )}
        </section>
    );
};

export default Agendamentos;
