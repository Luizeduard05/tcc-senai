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
                            <h4>Web design is the best way to design the website easy and user friendly for all platforms.</h4>
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
                            <h4>Web development is key to making websites interactive and user-friendly.</h4>
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
                        <h3>JavaScript</h3>
                        <h4>JavaScript is essential for building dynamic and interactive web applications.</h4>
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
                        <h3>Mobile App</h3>
                        <h4>Mobile app development ensures seamless functionality on mobile devices.</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeADM;
