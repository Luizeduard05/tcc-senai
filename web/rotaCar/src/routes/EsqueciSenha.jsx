import stylesEsqueciSenha from "./EsqueciSenha.module.css";
import { useState } from "react";
import { useAuth } from "../Context/ContextUser";
import api from "../../service/api";
import Header from "../component/Header";

const EsqueciSenha = () => {
    const { token } = useAuth();
    const [email, setEmail] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [status, setStatus] = useState(""); // 'error' ou 'success'

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !novaSenha || !confirmarSenha) {
            setMensagem("Todos os campos são obrigatórios.");
            setStatus("error");
            return;
        }

        if (novaSenha !== confirmarSenha) {
            setMensagem("As senhas não coincidem.");
            setStatus("error");
            return;
        }

        try {
            const response = await api.post(
                "/recuperarSenha",
                { email, novaSenha },
                { headers: { Authorization: `Token ${token}` } }
            );

            setMensagem("Senha atualizada com sucesso!");
            setStatus("success");
            setEmail("");
            setNovaSenha("");
            setConfirmarSenha("");
        } catch (error) {
            setMensagem("Erro ao atualizar a senha. Verifique suas informações.");
            setStatus("error");
        }
    };

    return (
        <>
            <Header />
            <div className={stylesEsqueciSenha.RecuperaSenha}>
                <h1 className={stylesEsqueciSenha.Title}>Recupere sua senha</h1>

                <div className={stylesEsqueciSenha.ContainerRecuperarSenha}>
                    <form className={stylesEsqueciSenha.Form} onSubmit={handleSubmit}>
                        <label className={stylesEsqueciSenha.Label}>E-mail:</label>
                        <input
                            type="email"
                            className={stylesEsqueciSenha.Input}
                            placeholder="Digite Seu Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label className={stylesEsqueciSenha.Label}>Nova Senha:</label>
                        <input
                            type="password"
                            className={stylesEsqueciSenha.Input}
                            placeholder="Digite Sua Nova Senha"
                            value={novaSenha}
                            onChange={(e) => setNovaSenha(e.target.value)}
                        />

                        <label className={stylesEsqueciSenha.Label}>Confirmar Senha:</label>
                        <input
                            type="password"
                            className={stylesEsqueciSenha.Input}
                            placeholder="Confirme sua nova Senha"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                        />

                        <button className={stylesEsqueciSenha.Button} type="submit">
                            Atualizar Senha
                        </button>
                    </form>

                    {mensagem && (
                        <div
                            className={`${stylesEsqueciSenha.Message} ${
                                status === "success"
                                    ? stylesEsqueciSenha.Success
                                    : stylesEsqueciSenha.Error
                            }`}
                        >
                            {mensagem}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default EsqueciSenha;
