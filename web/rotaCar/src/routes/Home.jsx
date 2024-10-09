import { useEffect } from "react";
import Swiper from "swiper/bundle";
import "./Home.css";
import logoCarro from "../assets/logoCarro.png";
import CarrosImg from "../assets/carros-imagem.png";
import boschLogo from "../assets/Bosch-Logo-2002.png";
import imgsusp from "../assets/imgsusp.png";

const Home = () => {
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

                <div class="container1">
                    <div class="content-inner">
                        <div class="content-front">
                            <div class="cf-inner">
                                <div class="bg"></div>
                                <div class="overlay"></div>
                                <div class="inner">
                                    <h2>"Suspensão"</h2>
                                    <h4>Lorem ipsum dolor sit amet</h4>
                                </div>
                                <div class="serv-num">03</div>
                            </div>
                        </div>
                        <div class="content-back">
                            <div class="cf-inner">
                                <div class="inner">
                                    <div class="dec-icon">
                                        <i class="fas fa-bomb"></i>
                                    </div>
                                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar."</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="content-inner">
                        <div class="content-front">
                            <div class="cf-inner">
                                <div class="bg"></div>
                                <div class="overlay"></div>
                                <div class="inner">
                                    <h2>"Suspensão"</h2>
                                    <h4>Lorem ipsum dolor sit amet</h4>
                                </div>
                                <div class="serv-num">03</div>
                            </div>
                        </div>
                        <div class="content-back">
                            <div class="cf-inner">
                                <div class="inner">
                                    <div class="dec-icon">
                                        <i class="fas fa-bomb"></i>
                                    </div>
                                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar."</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="content-inner">
                        <div class="content-front">
                            <div class="cf-inner">
                                <div class="bg"></div>
                                <div class="overlay"></div>
                                <div class="inner">
                                    <h2>"Suspensão"</h2>
                                    <h4>Lorem ipsum dolor sit amet</h4>
                                </div>
                                <div class="serv-num">03</div>
                            </div>
                        </div>
                        <div class="content-back">
                            <div class="cf-inner">
                                <div class="inner">
                                    <div class="dec-icon">
                                        <i class="fas fa-bomb"></i>
                                    </div>
                                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar."</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container2">
                    <div class="content-inner">
                        <div class="content-front">
                            <div class="cf-inner">
                                <div class="bg"></div>
                                <div class="overlay"></div>
                                <div class="inner">
                                    <h2>"Suspensão"</h2>
                                    <h4>Lorem ipsum dolor sit amet</h4>
                                </div>
                                <div class="serv-num">03</div>
                            </div>
                        </div>
                        <div class="content-back">
                            <div class="cf-inner">
                                <div class="inner">
                                    <div class="dec-icon">
                                        <i class="fas fa-bomb"></i>
                                    </div>
                                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar."</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="content-inner">
                        <div class="content-front">
                            <div class="cf-inner">
                                <div class="bg"></div>
                                <div class="overlay"></div>
                                <div class="inner">
                                    <h2>"Suspensão"</h2>
                                    <h4>Lorem ipsum dolor sit amet</h4>
                                </div>
                                <div class="serv-num">03</div>
                            </div>
                        </div>
                        <div class="content-back">
                            <div class="cf-inner">
                                <div class="inner">
                                    <div class="dec-icon">
                                        <i class="fas fa-bomb"></i>
                                    </div>
                                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar."</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="content-inner">
                        <div class="content-front">
                            <div class="cf-inner">
                                <div class="bg"></div>
                                <div class="overlay"></div>
                                <div class="inner">
                                    <h2>"Suspensão"</h2>
                                    <h4>Lorem ipsum dolor sit amet</h4>
                                </div>
                                <div class="serv-num">03</div>
                            </div>
                        </div>
                        <div class="content-back">
                            <div class="cf-inner">
                                <div class="inner">
                                    <div class="dec-icon">
                                        <i class="fas fa-bomb"></i>
                                    </div>
                                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar."</p>
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
