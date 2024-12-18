import styles from "./Intranet.module.css"

import logoCarro from "../assets/logoCarro.png"
import CarrosImg from "../assets/carros-imagem.png"
import CarroCivic from "../assets/honda-civic.png"
import { useAuth } from "../Context/ContextUser"
import { Link, useNavigate } from "react-router-dom"


const Intranet = () => {
  const {nome} = useAuth();
  const navigate = useNavigate()
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
            <h1>Olá {nome}!</h1>
            <h2>Como podemos ajudar hoje?</h2>
          </div>
          <div className={styles.buttons}>
           
            <button onClick={() => navigate('/cadastroveiculo')} className={styles.button}>Veiculos</button>
            
            
            <button onClick={() => navigate('/historico')} className={styles.button}>Orçamentos</button>
          </div>

          <img className={styles.carros} src={CarroCivic} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Intranet