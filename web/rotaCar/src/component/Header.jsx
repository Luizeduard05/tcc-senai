import { Link, useNavigate } from "react-router-dom";
import logoCarro from "../assets/logoCarro.png";
import styleHeader from "./Header.module.css";
import { useAuth } from "../Context/ContextUser";

const Header = () => {
    const { tipo, nome, token, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");  // Redireciona para a página de login
    };

    return (
        <div className={styleHeader.navBar}>
            <div className={styleHeader.conteudoSuperior}>
                <div className="logo">
                    <img src={logoCarro} alt="Logo" />
                </div>
                <div className={styleHeader.textoSuperior}>
                    {token ? (
                        <a onClick={handleLogout}>
                            <p>Sair</p>
                        </a>
                    ) : (
                        <Link to="/login">
                            <p>Login</p>
                        </Link>
                    )}

                    {token ? (
                        <Link to="/perfil">
                        <p>Perfil</p>
                    </Link>
                    ) : (
                        <a href="
                        "><p>serviços</p></a>
                        
                    )}

                    {tipo == 'ADM'&&(
                        <Link to="/homeAdm">
                            <p>menu principal</p>
                        </Link>
                    )}

                    {tipo === "CLI" && (
                        <Link to="/cadastroveiculo">
                            <p>meus veiculos</p>
                        </Link>
                    )}
                    {tipo === "CLI" && (
                        <Link to="/historico">
                            <p>Orçamentos</p>
                        </Link>
                    )}
                    {tipo === "CLI" && (
                        <Link to="/agendamento">
                            <p>Agendamentos</p>
                        </Link>
                    )}

                   
                </div>
            </div>
        </div>
    );
};

export default Header;
