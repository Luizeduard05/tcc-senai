import StyleIntranet from "./Intranet.module.css";

import logoCarro from "../assets/logoCarro.png";
import CarroCivic from "../assets/honda-civic.png";

const Intranet = () => {
    return (
        <div className={StyleIntranet.container}>
            <div className={StyleIntranet.header}>
                <div className={StyleIntranet.logo}>
                    <img src={logoCarro} alt="Logo Carro" />
                </div>
            </div>
            <div className={StyleIntranet.content}>
                <div className={StyleIntranet.card}>
                    <div className={StyleIntranet.text}>
                        <h1>Olá Vinícius!</h1>
                        <h2>Como podemos ajudar hoje?</h2>
                    </div>
                    <div className={StyleIntranet.buttons}>
                        <button className={StyleIntranet.button}>Orçamentos</button>
                        <button className={StyleIntranet.button}>Agendamentos</button>
                    </div>
                    <img className={StyleIntranet.carro} src={CarroCivic} alt="Honda Civic" />
                </div>
            </div>
        </div>
    );
};

export default Intranet;
