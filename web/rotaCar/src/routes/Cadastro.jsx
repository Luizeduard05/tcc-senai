import React, { useEffect, useState } from "react";
import api from "../../service/api";
import styleCad from "./Cadastro.module.css";
import { Link, useNavigate } from "react-router-dom";

const Cadastro = () => {
    const navigate = useNavigate()
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
            const response = await api.post("/usuarios", formData);
            console.log(response.data);
            console.log(formData.nome);

            navigate('/login')
        } catch (error) {


            console.error(error);

        }
    };

    const buscarCep = async () => { // Função para busca de CEP
        try {
            const response = await fetch(`https://viacep.com.br/ws/${formData.cep}/json/`)
            const data = await response.json();

            if (!data.erro) {
                setFormData(prevState => ({
                    ...prevState,
                    logradouro: data.logradouro,
                    bairro: data.bairro,
                    estado: data.uf
                }));
            } else {
                alert("CEP não encontrado");
            }
        } catch (error) {
            console.log(error)
        }
    }



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
                        
                        <Link to="/">
                        <h3>voltar</h3>
                        </Link>
                        
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
                                <div className={styleCad.Cepcontent}>
                                    <div className={styleCad.inputBox}>
                                        <input type="number" name="cep" value={formData.cep} required onChange={handleChange} onBlur={buscarCep} />
                                        <i>CEP</i>
                                    </div>
                                    <div className={styleCad.inputBox}>
                                        <input type="text" name="numero" value={formData.numero} required onChange={handleChange} />
                                        <i>Número</i>
                                    </div>
                                </div>
                                <div className={styleCad.inputBox}>
                                    <input type="text" name="logradouro" value={formData.logradouro} required onChange={handleChange}/>
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
                                <div className={styleCad.inputBox}>
                                    <input type="text" name="complemento" value={formData.complemento} required onChange={handleChange} />
                                    <i>Complemento</i>
                                </div>
                            </div>

                            <div className={styleCad.buttonCad}>
                                <input className={styleCad.inputCad} type="submit" value="Cadastrar" />
                            </div>
                        </form>

                    </div>
                </div>
            </section>
        </section>
    );
};

export default Cadastro;