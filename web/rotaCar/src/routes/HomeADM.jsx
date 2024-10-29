import React, { useEffect } from 'react';
import Isotope from 'isotope-layout';
import styleHomeAdm from './HomeADM.module.css';
import { Link } from "react-router-dom";

const HomeADM = () => {


    return (
        <div className={styleHomeAdm.container}>
            {/* Cbox 1 */}
            <Link to="/cadastroOs">
                <div className={styleHomeAdm.cbox}>
                    <div className={styleHomeAdm.icon}>
                        <i className="fa fa-code"></i>
                    </div>

                    <div className={styleHomeAdm.descr}>
                        <div className={styleHomeAdm.fTxt}>
                            <h3>Novo Orçamento</h3>
                            <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi voluptates expedita corporis, culpa atque ducimus..</h4>
                        </div>
                    </div>
                </div>
            </Link>

            {/* Cbox 2 */}
       
                <div className={styleHomeAdm.cbox}>
                    <div className={styleHomeAdm.icon}>
                        <i className="fa fa-desktop" styleHomeAdm={{ fontSize: '42px' }}></i>
                    </div>
                    <div className={styleHomeAdm.descr}>
                        <div className={styleHomeAdm.fTxt}>
                            <h3>Cadastrar um veiculo</h3>
                            <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi voluptates expedita corporis, culpa atque ducimus..</h4>
                        </div>
                    </div>
                </div>
        

            {/* Cbox 3 */}
            <div className={styleHomeAdm.cbox}>
                <div className={styleHomeAdm.icon}>
                    <i className="fa fa-laptop"></i>
                </div>
                <div className={styleHomeAdm.descr}>
                    <div className={styleHomeAdm.fTxt}>
                        <h3>...</h3>
                        <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi voluptates expedita corporis, culpa atque ducimus...</h4>
                    </div>
                </div>
            </div>

            {/* Cbox 4 */}
            <div className={styleHomeAdm.cbox}>
                <div className={styleHomeAdm.icon}>
                    <i className="fa fa-mobile"></i>
                </div>
                <div className={styleHomeAdm.descr}>
                    <div className={styleHomeAdm.fTxt}>
                        <h3>...</h3>
                        <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi voluptates expedita corporis, culpa atque ducimus...</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeADM;
