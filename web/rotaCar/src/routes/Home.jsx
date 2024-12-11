import { useContext, useEffect } from "react";
import Swiper from "swiper/bundle";
import "./Home.css";
import logoCarro from "../assets/logoCarro.png";
import CarrosImg from "../assets/carros-imagem.png";
import boschLogo from "../assets/Bosch-Logo-20022.png";
import pirelliLogo from "../assets/pirelli2.png";
import michelinLogo from "../assets/michelinLogo2.png";
import goodyearLogo from "../assets/goodyearLogo2.jpg";
import delphiLogo from "../assets/delphiLogo2.png";
import acdelcoLogo from "../assets/acdelcoLogo2.png";

import { Link } from "react-router-dom";
import Header from "../component/Header";


const Home = () => {

    const { nome, tipo } = useContext

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
                    <Header />
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
                                <p>Bosch</p>
                            </div>
                            <div className="swiper-slide">
                                <img src={pirelliLogo} alt="Bosch Logo" />
                                <p>Pirelli</p>
                            </div>
                            <div className="swiper-slide">
                                <img src={michelinLogo} alt="Bosch Logo" />
                                <p>Michelin</p>
                            </div>
                            <div className="swiper-slide">
                                <img src={goodyearLogo} alt="Bosch Logo" />
                                <p>GoodYear</p>
                            </div>
                            <div className="swiper-slide">
                                <img src={delphiLogo} alt="Bosch Logo" />
                                <p>Delphi</p>
                            </div>
                            <div className="swiper-slide">
                                <img src={acdelcoLogo} alt="Bosch Logo" />
                                <p>Acdelco</p>
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
                                    <h2>Troca de Óleo e Filtros</h2>
                                    <h4>A troca regular de óleo é fundamental para garantir a lubrificação adequada das peças móveis do motor, além de reduzir o risco de superaquecimento.</h4>
                                </div>
                                <div className="serv-num">01</div>
                            </div>
                        </div>
                        <div className="content-back">
                            <div className="cf-inner">
                                <div className="inner">
                                    <div className="dec-icon">
                                    <i class="fa-solid fa-oil-can"></i>

                                    </div>
                                    <p>Esse é um dos serviços mais comuns em uma oficina. Consiste na troca do óleo do motor e dos filtros de óleo e de ar, essenciais para o bom funcionamento do motor e para evitar o desgaste prematuro de suas partes.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-inner">
                        <div className="content-front">
                            <div className="cf-inner">
                                <div className="bg2"></div>
                                <div className="overlay"></div>
                                <div className="inner">
                                    <h2>Troca de Pastilhas de Freio</h2>
                                    <h4>Pastilhas de freio desgastadas podem comprometer a eficiência de frenagem, aumentando o risco de acidentes. A troca deve ser feita quando elas atingem a espessura mínima recomendada.</h4>
                                </div>
                                <div className="serv-num">02</div>
                            </div>
                        </div>
                        <div className="content-back">
                            <div className="cf-inner">
                                <div className="inner">
                                    <div className="dec-icon">
                                  <i class="fa-solid fa-gears"></i>
                                    </div>
                                    <p>O serviço envolve a substituição das pastilhas de freio, um componente crucial para a segurança do veículo.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-inner">
                        <div className="content-front">
                            <div className="cf-inner">
                                <div className="bg3"></div>
                                <div className="overlay"></div>
                                <div className="inner">
                                    <h2>Alinhamento e Balanceamento</h2>
                                    <h4>Isso melhora a estabilidade e a segurança do veículo, além de evitar o desgaste irregular dos pneus e aumentar sua durabilidade.</h4>
                                </div>
                                <div className="serv-num">03</div>
                            </div>
                        </div>
                        <div className="content-back">
                            <div className="cf-inner">
                                <div className="inner">
                                    <div className="dec-icon">
                                    <i class="fa-solid fa-gear"></i>
                                    </div>
                                    <p> O alinhamento e o balanceamento são feitos para corrigir a direção do veículo e garantir que os pneus se desgastem de maneira uniforme.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container2">
                    <div className="content-inner">
                        <div className="content-front">
                            <div className="cf-inner">
                                <div className="bg4"></div>
                                <div className="overlay"></div>
                                <div className="inner">
                                    <h2>Troca de Pneus</h2>
                                    <h4>Pneus em bom estado são essenciais para a segurança, desempenho e eficiência do combustível. A troca é necessária quando os pneus estão carecas ou apresentam danos irreparáveis.</h4>
                                </div>
                                <div className="serv-num">04</div>
                            </div>
                        </div>
                        <div className="content-back">
                            <div className="cf-inner">
                                <div className="inner">
                                    <div className="dec-icon">
                                        <i className="fa fa-car"></i>
                                    </div>
                                    <p>Substituição de pneus desgastados ou danificados, além de realizar a verificação de sua calibragem e estado geral.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-inner">
                        <div className="content-front">
                            <div className="cf-inner">
                                <div className="bg5"></div>
                                <div className="overlay"></div>
                                <div className="inner">
                                    <h2>Reparo de Sistema de Suspensão</h2>
                                    <h4>A suspensão é responsável pelo conforto e pela estabilidade do veículo, além de ajudar a manter os pneus em contato com a estrada.</h4>
                                </div>
                                <div className="serv-num">05</div>
                            </div>
                        </div>
                        <div className="content-back">
                            <div className="cf-inner">
                                <div className="inner">
                                    <div className="dec-icon">
                                        <i className="fa fa-car"></i>
                                    </div>
                                    <p>Inclui a revisão e reparo de componentes da suspensão do veículo, como amortecedores, molas e buchas.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-inner">
                        <div className="content-front">
                            <div className="cf-inner">
                                <div className="bg6"></div>
                                <div className="overlay"></div>
                                <div className="inner">
                                    <h2>Diagnóstico e Reparo de Sistemas Eletrônicos</h2>
                                    <h4>A maioria dos carros modernos possui sistemas eletrônicos sofisticados que controlam o desempenho do motor, consumo de combustível e segurança.</h4>
                                </div>
                                <div className="serv-num">06</div>
                            </div>
                        </div>
                        <div className="content-back">
                            <div className="cf-inner">
                                <div className="inner">
                                    <div className="dec-icon">
                                    <i class="fa-solid fa-car-battery"></i>
                                    </div>
                                    <p>Esse serviço envolve o diagnóstico e a correção de problemas nos sistemas eletrônicos do veículo, como o sistema de injeção eletrônica, sensores, alternador, bateria e outros componentes eletrônicos.</p>
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





















