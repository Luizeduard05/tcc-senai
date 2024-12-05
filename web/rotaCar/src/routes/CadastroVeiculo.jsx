import React, { useState, useEffect } from "react";
import api from "../../service/api";
import styleCadVeiculo from "./CadastroVeiculo.module.css";
import { useAuth } from "../Context/ContextUser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faClipboard, faArrowLeft, faEdit, faTrashAlt, faTimes, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from 'react-router-dom';

const CadastroVeiculo = () => {
    const { id, token, nome } = useAuth();
    const [userData, setUserData] = useState({ nome: '', veiculos: [] });
    const [formData, setFormData] = useState({ placa: "", marca: "", modelo: "", ano: "" });
    const [showModal, setShowModal] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [editFormData, setEditFormData] = useState({
        placa: "",
        marca: "",
        modelo: "",
        ano: ""
    });

    const fetchUserData = async () => {
        try {
            const response = await api.get(`/veiculos/${id}`, {
                headers: { Authorization: `Token ${token}` }
            });
            setUserData({ veiculos: response.data.person });
        } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/veiculos/${id}`, formData, {
                headers: { Authorization: `Token ${token}` }
            });
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

    const handleOpenModal = (veiculo) => {
        console.log("Modal aberto para veículo:", veiculo);
        setSelectedVehicle(veiculo);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedVehicle(null);
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/veiculos/${selectedVehicle.id}`, {
                headers: { Authorization: `Token ${token}` }
            });
            fetchUserData();
            handleCloseModal();
        } catch (error) {
            console.error("Erro ao excluir veículo:", error);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
        setEditFormData({
            placa: selectedVehicle.placa,
            marca: selectedVehicle.marca,
            modelo: selectedVehicle.modelo,
            ano: selectedVehicle.ano
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleEditSubmit = async () => {
        try {
            await api.put(`/veiculos/${selectedVehicle.id}`, editFormData, {
                headers: { Authorization: `Token ${token}` }
            });
            fetchUserData();
            setIsEditing(false);
            handleCloseModal();
        } catch (error) {
            console.error("Erro ao editar veículo:", error);
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
                            onClick={() => navigate('/')}
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
                                                <p className={styleCadVeiculo.tooltipWrapper}>
                                                    <FontAwesomeIcon
                                                        icon={faClipboard}
                                                        onClick={() => handleOpenModal(veiculo)}
                                                        className={styleCadVeiculo.iconPrancheta}
                                                        style={{ cursor: 'pointer', marginLeft: '10px', color: 'rgb(184 184 184)' }}
                                                    />
                                                    <p className={styleCadVeiculo.tooltipText}>Editar</p>
                                                </p>
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

                {showModal && (
                    <div className={styleCadVeiculo.modal}>
                        <div className={styleCadVeiculo.modalContent}>
                            <p className={styleCadVeiculo.modalContainer}>
                                {isEditing ? (
                                    <p className={styleCadVeiculo.editingText}>Editando: {selectedVehicle.modelo}</p>
                                ) : (
                                    <>
                                        <p className={styleCadVeiculo.modalText}>O que você gostaria de fazer?</p>
                                        <p className={styleCadVeiculo.vehicleText}>veículo: {selectedVehicle.modelo}</p>
                                        <br />
                                        <p className={styleCadVeiculo.plateText}>placa: {selectedVehicle.placa}</p>
                                    </>
                                )}
                            </p>

                            {isEditing ? (
                                <div>
                                    {/* Campos de edição */}
                                    <div className={styleCadVeiculo.inputBox}>
                                        <label>placa</label>
                                        <input type="text" name="placa" value={editFormData.placa} onChange={handleEditChange} />
                                    </div>
                                    <div className={styleCadVeiculo.inputBox}>
                                        <label>Marca:</label>
                                        <input type="text" name="marca" value={editFormData.marca} onChange={handleEditChange} />
                                    </div>
                                    <div className={styleCadVeiculo.inputBox}>
                                        <label>Modelo:</label>
                                        <input type="text" name="modelo" value={editFormData.modelo} onChange={handleEditChange} />
                                    </div>
                                    <div className={styleCadVeiculo.inputBox}>
                                        <label>Ano:</label>
                                        <input type="text" name="ano" value={editFormData.ano} onChange={handleEditChange} />
                                    </div>
                                    <div className={styleCadVeiculo.iconContainer}>
                                        <div className={styleCadVeiculo.iconItem} onClick={handleEditSubmit}>
                                            <FontAwesomeIcon icon={faSave} size="2x" />
                                            <p>Salvar</p>
                                        </div>
                                        <div className={styleCadVeiculo.iconItem} onClick={() => setIsEditing(false)}>
                                            <FontAwesomeIcon icon={faTimesCircle} size="2x" />
                                            <p>Cancelar</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className={styleCadVeiculo.iconContainer}>
                                    <div className={styleCadVeiculo.iconItem} onClick={handleEdit}>
                                        <FontAwesomeIcon icon={faEdit} size="1x" />
                                        <p>Editar</p>
                                    </div>
                                    <div className={styleCadVeiculo.iconItem} onClick={handleDelete}>
                                        <FontAwesomeIcon icon={faTrashAlt} size="1x" />
                                        <p>Excluir</p>
                                    </div>
                                    <div className={styleCadVeiculo.iconItem} onClick={handleCloseModal}>
                                        <FontAwesomeIcon icon={faTimes} size="1x" />
                                        <p>Fechar</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}


            </section>


        </section>
    );
};

export default CadastroVeiculo;
