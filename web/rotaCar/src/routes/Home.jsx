



import "./Home.css"
import logoCarro from "../assets/logoCarro.png"
import CarrosImg from "../assets/carros-imagem.png"


const Home = () => {
    return (
        <>

            <section className="topoPagina">
                <div className="containerTp">
                    <div className="navBar">
                        <div className="conteudoSuperior">
                            <div className="logo">
                                <img src={logoCarro} alt="" />
                            </div>
                            <div className="textoSuperior">
                                <a href="">
                                    <p> login</p>
                                </a>
                                <a href="">
                                    <p>saiba mais</p>
                                </a>
                                <a href="serviços">
                                    <p>serviços</p>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="textosBV">
                        <h2>olá Seja bem-vindo</h2>
                        <h1>Tudo oque seu carro precisa</h1>
                        <h4>O cuidado que voce e seu carro merecem de forma facil e rapido</h4>
                        <button className="botãoTp">Acesse já</button>


                    </div>
                    <div className="carro-container">
                        <img className="carros" src={CarrosImg} alt="" />
                    </div>
                </div>
            </section>


        </>


    );
}

export default Home