import { useContext, useEffect } from "react";
import Swiper from "swiper/bundle";
import "./Home.css";
import logoCarro from "../assets/logoCarro.png";
import CarrosImg from "../assets/carros-imagem.png";
import boschLogo from "../assets/Bosch-Logo-2002.png";
import { Link } from "react-router-dom";
import Header from "../component/Header";


const Home = () => {

    const {nome, tipo} = useContext

    useEffect(() => {
        var swiper = new Swiper(".swiper", {
            grabCursor: true,
            initialSlide: 2,
            centeredSlides: true,
            slidesPerView: "auto",
            spaceBetween: 10,
            speed: 1000,
            freeMode: false,
            mousewheel: {
                thresholdDelta: 30,
            },
            pagination: {
                el: ".swiper-pagination",
            },
            on: {
                click(event) {
                    swiper.slideTo(this.clickedIndex);
                },
            },
        });

    }, []);

    return (
        <>
            <section className="topoPagina">
                <div className="containerTp">
                    <Header/>
                    {/* <div className="navBar">
                        <div className="conteudoSuperior">
                            <div className="logo">
                                <img src={logoCarro} alt="" />
                            </div>
                            <div className="textoSuperior">
                                <Link to="/login">
                                    <p> login</p>
                                </Link>
                                <a href="">
                                    <p>saiba mais</p>
                                </a>
                                <a href="serviços">
                                    <p>serviços</p>
                                </a>
                            </div>
                        </div>
                    </div> */}
                    <div className="textosBV">
                        <span className="texto1">olá Seja bem-vindo</span>
                        <h1>Tudo oque seu carro precisa</h1>
                        <h4>O cuidado que voce e seu carro merecem de forma facil e rapido</h4>



                    </div>
                    <button className="botãoTp">Acesse já</button>
                    <div className="carro-container">
                        <img className="carros" src={CarrosImg} alt="" />
                    </div>
                </div>
            </section>
            <section className="principaisServico">
                    
            </section>

            <section className="marcas">
                <div className="container">
                    <div className="swiper">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <img src={boschLogo} alt="Bosch Logo" />
                                <p>bosch</p>
                            </div>
                            <div className="swiper-slide">
                                <img src={logoCarro} alt="Bosch Logo" />
                                <p>bosch</p>
                            </div>
                            <div className="swiper-slide">
                                <img src={CarrosImg} alt="Bosch Logo" />
                                <p>bosch</p>
                            </div>
                            <div className="swiper-slide">
                                <img src={boschLogo} alt="Bosch Logo" />
                                <p>bosch</p>
                            </div>
                            <div className="swiper-slide">
                                <img src={boschLogo} alt="Bosch Logo" />
                                <p>bosch</p>
                            </div>
                            <div className="swiper-slide">
                                <img src={boschLogo} alt="Bosch Logo" />
                                <p>bosch</p>
                            </div>

                        </div>
                        <div className="swiper-pagination"></div>
                    </div>
                </div>
            </section>

            <section className="outrosServicos">

                <div className="container1">
                    <div className="content-inner">
                        <div className="content-front">
                            <div className="cf-inner">
                                <div className="bg"></div>
                                <div className="overlay"></div>
                                <div className="inner">
                                    <h2>Suspensão</h2>
                                    <h4>Lorem ipsum dolor sit amet</h4>
                                </div>
                                <div className="serv-num">03</div>
                            </div>
                        </div>
                        <div className="content-back">
                            <div className="cf-inner">
                                <div className="inner">
                                    <div className="dec-icon">
                                        <i className="fas fa-bomb"></i>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-inner">
                        <div className="content-front">
                            <div className="cf-inner">
                                <div className="bg"></div>
                                <div className="overlay"></div>
                                <div className="inner">
                                    <h2>Suspensão</h2>
                                    <h4>Lorem ipsum dolor sit amet</h4>
                                </div>
                                <div className="serv-num">03</div>
                            </div>
                        </div>
                        <div className="content-back">
                            <div className="cf-inner">
                                <div className="inner">
                                    <div className="dec-icon">
                                        <i className="fas fa-bomb"></i>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-inner">
                        <div className="content-front">
                            <div className="cf-inner">
                                <div className="bg"></div>
                                <div className="overlay"></div>
                                <div className="inner">
                                    <h2>Suspensão</h2>
                                    <h4>Lorem ipsum dolor sit amet</h4>
                                </div>
                                <div className="serv-num">03</div>
                            </div>
                        </div>
                        <div className="content-back">
                            <div className="cf-inner">
                                <div className="inner">
                                    <div className="dec-icon">
                                        <i className="fas fa-bomb"></i>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container2">
                    <div className="content-inner">
                        <div className="content-front">
                            <div className="cf-inner">
                                <div className="bg"></div>
                                <div className="overlay"></div>
                                <div className="inner">
                                    <h2>Suspensão</h2>
                                    <h4>Lorem ipsum dolor sit amet</h4>
                                </div>
                                <div className="serv-num">03</div>
                            </div>
                        </div>
                        <div className="content-back">
                            <div className="cf-inner">
                                <div className="inner">
                                    <div className="dec-icon">
                                        <i className="fas fa-bomb"></i>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-inner">
                        <div className="content-front">
                            <div className="cf-inner">
                                <div className="bg"></div>
                                <div className="overlay"></div>
                                <div className="inner">
                                    <h2>Suspensão</h2>
                                    <h4>Lorem ipsum dolor sit amet</h4>
                                </div>
                                <div className="serv-num">03</div>
                            </div>
                        </div>
                        <div className="content-back">
                            <div className="cf-inner">
                                <div className="inner">
                                    <div className="dec-icon">
                                        <i className="fas fa-bomb"></i>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-inner">
                        <div className="content-front">
                            <div className="cf-inner">
                                <div className="bg"></div>
                                <div className="overlay"></div>
                                <div className="inner">
                                    <h2>Suspensão</h2>
                                    <h4>Lorem ipsum dolor sit amet</h4>
                                </div>
                                <div className="serv-num">03</div>
                            </div>
                        </div>
                        <div className="content-back">
                            <div className="cf-inner">
                                <div className="inner">
                                    <div className="dec-icon">
                                        <i className="fas fa-bomb"></i>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </section>
        </>
    );
};

export default Home;





















