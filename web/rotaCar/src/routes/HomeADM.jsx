import React, { useEffect } from 'react';
import Isotope from 'isotope-layout';
import styleHomeAdm from './HomeADM.module.css';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../Context/ContextUser';


const HomeADM = () => {
    const {id, type} = useAuth();

    console.log(type)

    const navigate = useNavigate()

    return (
        <section className={styleHomeAdm.SecaoPai}>
            <div className={styleHomeAdm.container}>

                <div className={styleHomeAdm.cbox} onClick={() => navigate('/cadastroOs')}>
                    <div className={styleHomeAdm.icon}>
                        <i className="fa fa-car"></i>
                    </div>

                    <div className={styleHomeAdm.descr}>
                        <div className={styleHomeAdm.fTxt}>
                            <h3>Novo Orçamento</h3>
                            <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi voluptates expedita corporis, culpa atque ducimus..</h4>
                        </div>
                    </div>
                </div>




                <div className={styleHomeAdm.cbox}  onClick={() => navigate('/cadastroAdm')}>
                    <div className={styleHomeAdm.icon}>
                        <i className="fa fa-user " styleHomeAdm={{ fontSize: '42px' }}></i>
                    </div>
                    <div className={styleHomeAdm.descr}>
                        <div className={styleHomeAdm.fTxt}>
                            <h3>Novo usuario</h3>
                            <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi voluptates expedita corporis, culpa atque ducimus..</h4>
                        </div>
                    </div>
                </div>



                <div className={styleHomeAdm.cbox}>
                    <div className={styleHomeAdm.icon}>
                        <i className="fa fa-laptop"></i>
                    </div>
                    <div className={styleHomeAdm.descr}>
                        <div className={styleHomeAdm.fTxt}>
                            <h3>Fazer agendamento</h3>
                            <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi voluptates expedita corporis, culpa atque ducimus...</h4>
                        </div>
                    </div>
                </div>


                <div className={styleHomeAdm.cbox}>
                    <div className={styleHomeAdm.icon}>
                        <i className="fa fa-mobile"></i>
                    </div>
                    <div className={styleHomeAdm.descr}>
                        <div className={styleHomeAdm.fTxt}>
                            <h3>Orçamntos</h3>
                            <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi voluptates expedita corporis, culpa atque ducimus...</h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default HomeADM;
