import React, { useState, useEffect } from "react";
import api from "../../service/api";
import styleCadVeiculo from "./CadastroVeiculo.module.css";
import { useAuth } from "../Context/ContextUser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';






const CadastroVeiculo = () => {
    const { id, token, nome } = useAuth();
    const [userData, setUserData] = useState({ nome: '', veiculos: [] });
    const [formData, setFormData] = useState({
        placa: "",
        marca: "",
        modelo: "",
        ano: ""
    });

    const navigate = useNavigate();



    const fetchUserData = async () => {
        try {
            const response = await api.get(`/veiculos/${id}`, {
                headers: { Authorization: `Token ${token}` }
            });
            setUserData({
                veiculos: response.data
            });
            console.log("Veículos retornados:", response.data);
        } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
        }
    };


    useEffect(() => {
        fetchUserData()
    }, []);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(`/veiculos/${id}`, formData, {
                headers: { Authorization: `Token ${token}` }
            });
            console.log("Veículo cadastrado:", response.data);
            setFormData({
                placa: "",
                modelo: "",
                ano: "",
                marca: ""
            });
            fetchUserData();

        } catch (error) {
            console.error("Erro ao cadastrar veículo:", error);
        }
    };

    return (
        <section className={styleCadVeiculo.pai}>
            <section className={styleCadVeiculo.containerCad}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>

                <div className={styleCadVeiculo.signin}>
                    <div className={styleCadVeiculo.voltar}>
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            onClick={() => navigate('/intranet')}
                            style={{ cursor: 'pointer', marginBottom: '18px' }}
                        />
                        <p style={{ marginLeft: '8px' }}>Voltar</p>
                    </div>
                    <div className={styleCadVeiculo.content}>

                        <h2>Preencha os dados do seu veículo</h2>
                        <h3>Bem-vindo, {nome}!</h3>

                        <div className={styleCadVeiculo.colunasVei}>
                            <form className={styleCadVeiculo.form} onSubmit={handleSubmit}>
                                <div className={styleCadVeiculo.inputLeft}>
                                    <div className={styleCadVeiculo.inputBox}>
                                        <input type="text" name="placa" value={formData.placa} required onChange={handleChange} />
                                        <i>placa</i>
                                    </div>
                                    <div className={styleCadVeiculo.inputBox}>
                                        <input type="text" name="marca" value={formData.marca} required onChange={handleChange} />
                                        <i>marca</i>
                                    </div>
                                    <div className={styleCadVeiculo.inputBox}>
                                        <input type="text" name="modelo" value={formData.modelo} required onChange={handleChange} />
                                        <i>modelo</i>
                                    </div>
                                    <div className={styleCadVeiculo.inputBox}>
                                        <input type="text" name="ano" value={formData.ano} required onChange={handleChange} />
                                        <i>ano</i>
                                    </div>
                                    <div className={styleCadVeiculo.buttonCadVei}>
                                        <input className={styleCadVeiculo.inputCadVei} type="submit" value="Cadastrar" />
                                    </div>
                                </div>
                            </form>


                            <div className={styleCadVeiculo.veiculosCadastrados}>
                                <h3>Veículos cadastrados:</h3>
                                {Array.isArray(userData.veiculos) && userData.veiculos.length > 0 ? (
                                    <ul>
                                        {userData.veiculos.map((veiculo, index) => (
                                            <div key={index} className={styleCadVeiculo.TextsVei}>
                                                <FontAwesomeIcon icon={faCar} style={{ marginRight: '8px', color: 'white' }} />
                                                {veiculo.modelo} - {veiculo.placa}
                                            </div>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Nenhum veículo cadastrado.</p>
                                )}
                            </div>
                        </div>



                    </div>
                </div>
            </section>
        </section>
    );
};

export default CadastroVeiculo;
