import React, { useState } from "react";
import api from "../../service/api";
import styleCad from "./Cadastro.module.css";

const Cadastro = () => {
    const [formData, setFormData] = useState({
        nome: "",
        cpf: "",
        email: "",
        telefone: "",
        senha: "",
        complemento: "",
        cep: "",
        numero: "",
        logradouro: "",
        bairro: "",
        estado: ""
    });




    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    console.log(formData)
    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const response = await api.post("/usuarios", formData); // Use o estado formData
            console.log(response.data);
            console.log(formData.nome)
        } catch (error) {
            console.error(error);
        }
    };


    return (

        <section className={styleCad.pai}>



            <section className={styleCad.containerCad}>

                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>

                <div className={styleCad.signin}>
                    <div className={styleCad.content}>
                        <h2>Olá, seja Bem vindo</h2>
                        <form className={styleCad.form} onSubmit={handleSubmit}>
                            <div className={styleCad.inputLeft}>
                                <div className={styleCad.inputBox}>
                                    <input type="text" name="nome" value={formData.nome} required onChange={handleChange} />
                                    <i>Nome</i>
                                </div>
                                <div className={styleCad.inputBox}>
                                    <input type="number" name="cpf" value={formData.cpf} required onChange={handleChange} />
                                    <i>CPF</i>
                                </div>
                                <div className={styleCad.inputBox}>
                                    <input type="email" name="email" value={formData.email} required onChange={handleChange} />
                                    <i>Email</i>
                                </div>
                                <div className={styleCad.inputBox}>
                                    <input type="number" name="telefone" value={formData.telefone} required onChange={handleChange} />
                                    <i>Telefone</i>
                                </div>
                                <div className={styleCad.inputBox}>
                                    <input type="password" name="senha" value={formData.senha} required onChange={handleChange} />
                                    <i>Senha</i>
                                </div>
                            </div>

                            <div className={styleCad.inputRight}>
                                <div className={styleCad.inputBox}>
                                    <input type="text" name="complemento" value={formData.complemento} required onChange={handleChange} />
                                    <i>Complemento</i>
                                </div>
                                <div className={styleCad.Cepcontent}>
                                    <div className={styleCad.inputBox}>
                                        <input type="number" name="cep" value={formData.cep} required onChange={handleChange} />
                                        <i>CEP</i>
                                    </div>
                                    <div className={styleCad.inputBox}>
                                        <input type="text" name="numero" value={formData.numero} required onChange={handleChange} />
                                        <i>Número</i>
                                    </div>
                                </div>
                                <div className={styleCad.inputBox}>
                                    <input type="text" name="logradouro" value={formData.logradouro} required onChange={handleChange} />
                                    <i>Logradouro</i>
                                </div>
                                <div className={styleCad.inputBox}>
                                    <input type="text" name="bairro" value={formData.bairro} required onChange={handleChange} />
                                    <i>Bairro</i>
                                </div>
                                <div className={styleCad.inputBox}>
                                    <input type="text" name="estado" value={formData.estado} required onChange={handleChange} />
                                    <i>Estado</i>
                                </div>
                            </div>

                            <div className={styleCad.buttonCad}>
                                <input type="submit" value="Cadastrar" />
                            </div>
                        </form>

                    </div>
                </div>
            </section>
        </section>
    );
};

export default Cadastro;