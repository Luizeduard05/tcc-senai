import { useEffect } from "react";
import Swiper from "swiper/bundle";
import styleHome from "./Home.module.css";
import logoCarro from "../assets/logoCarro.png";
import CarrosImg from "../assets/carros-imagem.png";
import boschLogo from "../assets/Bosch-Logo-2002.png";
import { Link } from "react-router-dom";


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
            <section className={styleHome.topoPagina}>
                <div className={styleHome.containerTp}>
                    <div className={styleHome.navBar}>
                        <div className={styleHome.conteudoSuperior}>
                            <div className={styleHome.logo}>
                                <img src={logoCarro} alt="" />
                            </div>
                            <div className={styleHome.textoSuperior}>
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
                    <div className={styleHome.textosBV}>
                        <h2>olá Seja bem-vindo</h2>
                        <h1>Tudo oque seu carro precisa</h1>
                        <h4>O cuidado que voce e seu carro merecem de forma facil e rapido</h4>

                    </div>

                    <button className="botãoTp">
                        <Link to={"/login"}>
                            Acesse já
                        </Link>

                    </button>

                    <div className={styleHome.carrocontainer}>
                        <img className={styleHome.carros} src={CarrosImg} alt="" />
                    </div>
                </div>
            </section>
            <section className={styleHome.principaisServico}>

            </section>

            <section className={styleHome.marcas}>
                <div className={styleHome.container}>
                    <div className="swiper"> {/* SwiperJS precisa dessa classe */}
                        <div className="swiper-wrapper"> {/* SwiperJS precisa dessa classe */}
                            <div className="swiper-slide"> {/* SwiperJS precisa dessa classe */}
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
                                <img src={CarrosImg} alt="Bosch Logo" />
                                <p>bosch</p>
                            </div>
                            <div className="swiper-slide">
                                <img src={CarrosImg} alt="Bosch Logo" />
                                <p>bosch</p>
                            </div>
                            <div className="swiper-slide">
                                <img src={CarrosImg} alt="Bosch Logo" />
                                <p>bosch</p>
                            </div>
                        </div>
                        <div className="swiper-pagination"></div> {/* SwiperJS precisa dessa classe */}
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
