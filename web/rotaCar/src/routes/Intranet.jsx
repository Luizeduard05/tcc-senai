
import "./Intranet.css"

import logoCarro from "../assets/logoCarro.png"
import CarrosImg from "../assets/carros-imagem.png"
import CarroCivic from "../assets/honda-civic.png"


const Intranet = () => {
    return (
        <div className="container">
        <div className="header">
          <div className="logo">
          <img src={logoCarro} alt="" />
          </div>
        </div>
        <div className="contentVn">
          <div className="card">
            <div className="text">
              <h1>Olá Vinícius!</h1>
              <h2>Como podemos ajudar hoje?</h2>
            </div>
            <div className="buttons">
              <button className="button">Orçamentos</button>
              <button className="button">Agendamentos</button>
            </div>
           
            <img className="carros" src={CarroCivic} alt="" />
          </div>
        </div>
      </div>
    )
}

export default Intranet