import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import styleHomeAdm from './HomeADM.module.css';
import { useAuth } from '../Context/ContextUser';

const HomeADM = () => {
    const { nome, tipo } = useAuth();
    console.log(nome)
    console.log(tipo)
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.3 } }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
        hover: { scale: 1.05, boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)", transition: { duration: 0.3 } },
        tap: { scale: 0.95 }
    };

    return (
        <motion.section
            className={styleHomeAdm.SecaoPai}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div className={styleHomeAdm.welcomeMessage}>
                <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                    Olá, Bem-vindo {nome}!
                </motion.h1>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
                    Qual serviço você gostaria de acessar hoje?
                </motion.p>
            </motion.div>

            <motion.div className={styleHomeAdm.container}>
                {/* Card Novo Orçamento */}
                <motion.div
                    className={styleHomeAdm.cbox}
                    onClick={() => navigate('/cadastroOs')}
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <div className={styleHomeAdm.icon}>
                        <i className="fa fa-car"></i>
                    </div>
                    <div className={styleHomeAdm.descr}>
                        <div className={styleHomeAdm.fTxt}>
                            <h3>Novo Orçamento</h3>
                            <h4>Inicie um novo orçamento para o seu cliente.</h4>
                        </div>
                    </div>
                </motion.div>


                {tipo === 'ADM' && (
                    <motion.div
                        className={styleHomeAdm.cbox}
                        onClick={() => navigate('/cadastroAdm')}
                        variants={cardVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <div className={styleHomeAdm.icon}>
                            <i className="fa fa-user"></i>
                        </div>
                        <div className={styleHomeAdm.descr}>
                            <div className={styleHomeAdm.fTxt}>
                                <h3>Novo Usuário</h3>
                                <h4>Cadastre um novo cliente ou colaborador.</h4>
                            </div>
                        </div>
                    </motion.div>
                )}

                {tipo === 'ADM' && (
                    <motion.div
                        className={styleHomeAdm.cbox}
                        onClick={() => navigate('/cadastroAgendamento')}
                        variants={cardVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <div className={styleHomeAdm.icon}>
                            <i className="fa fa-user"></i>
                        </div>
                        <div className={styleHomeAdm.descr}>
                            <div className={styleHomeAdm.fTxt}>
                                <h3>Novo Agendamento</h3>
                                <h4>Cadastre um novo Agendamento.</h4>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Condicional para o Card Cadastro de Peças */}
                {/* {tipo === 'ADM' && (
                    <motion.div
                        className={styleHomeAdm.cbox}
                        onClick={() => navigate('/cadastroPeca')}
                        variants={cardVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <div className={styleHomeAdm.icon}>
                            <i className="fa fa-cogs"></i> 
                        </div>
                        <div className={styleHomeAdm.descr}>
                            <div className={styleHomeAdm.fTxt}>
                                <h3>Cadastro de Peças</h3>
                                <h4>Cadastre novas peças para o estoque.</h4>
                            </div>
                        </div>
                    </motion.div>
                )} */}

                {/* Card Agendamento */}
                <motion.div
                    className={styleHomeAdm.cbox}
                    onClick={() => navigate('/agendamento')}
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <div className={styleHomeAdm.icon}>
                        <i className="fa fa-calendar"></i>
                    </div>
                    <div className={styleHomeAdm.descr}>
                        <div className={styleHomeAdm.fTxt}>
                            <h3>Agendamento</h3>
                            <h4>Programe o atendimento dos veículos.</h4>
                        </div>
                    </div>
                </motion.div>

                {/* Card Orçamentos */}
                <motion.div
                    className={styleHomeAdm.cbox}
                    onClick={() => navigate('/historico')}
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <div className={styleHomeAdm.icon}>
                        <i className="fa fa-file"></i>
                    </div>
                    <div className={styleHomeAdm.descr}>
                        <div className={styleHomeAdm.fTxt}>
                            <h3>Orçamentos</h3>
                            <h4>Consulte e gerencie os orçamentos pendentes.</h4>
                        </div>
                    </div>
                </motion.div>

                {/* Card Peças */}
                {tipo === "ADM" && (
                    <motion.div
                        className={styleHomeAdm.cbox}
                        onClick={() => navigate('/pecas')}
                        variants={cardVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <div className={styleHomeAdm.icon}>
                            <i className="fa fa-cogs"></i> {/* Ícone para peças */}
                        </div>
                        <div className={styleHomeAdm.descr}>
                            <div className={styleHomeAdm.fTxt}>
                                <h3>Peças</h3>
                                <h4>Consulte e gerencie as peças disponíveis.</h4>
                            </div>
                        </div>
                    </motion.div>
                )}

            </motion.div>
        </motion.section>
    );
};

export default HomeADM;
