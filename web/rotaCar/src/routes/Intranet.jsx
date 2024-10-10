
import styles from "./Intranet.module.css"

import logoCarro from "../assets/logoCarro.png"
import CarrosImg from "../assets/carros-imagem.png"
import CarroCivic from "../assets/honda-civic.png"


const Intranet = () => {
    return (
        <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.logo}>
          <img src={logoCarro} alt="" />
          </div>
        </div>
        <div className={styles.contentVn}>
          <div className={styles.card}>
            <div className={styles.text}>
              <h1>Olá Vinícius!</h1>
              <h2>Como podemos ajudar hoje?</h2>
            </div>
            <div className={styles.buttons}>
              <button className={styles.button}>Orçamentos</button>
              <button className={styles.button}>Agendamentos</button>
            </div>
           
            <img className="carros" src={CarroCivic} alt="" />
          </div>
        </div>
      </div>
    )
}

export default Intranet