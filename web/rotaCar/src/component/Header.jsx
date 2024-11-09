import { Link } from "react-router-dom";
import logoCarro from "../assets/logoCarro.png";
import styleHeader from "./Header.module.css"
import { useAuth } from "../Context/ContextUser";


const Header = () => {
    const {tipo,nome} = useAuth()
    return(
        <div className={styleHeader.navBar}>
        <div className={styleHeader.conteudoSuperior}>
            <div className="logo">
                <img src={logoCarro} alt="" />
            </div>
            <div className={styleHeader.textoSuperior}>
                <Link to="/login">
                    <p> login</p>
                </Link>
                <a href="">
                    <p>saiba mais</p>
                </a>
                <a href="serviços">
                    <p>serviços</p>
                </a>
                
                <a href="serviços">
                    <p>serviços</p>
                </a>
                <a href="serviços">
                    <p>{nome}</p>
                </a>
            </div>
        </div>
    </div>
    )
}

export default Header