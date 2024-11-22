import React, { useState } from "react";
import api from "../../service/api";
import styleCadAdm from "./CadastroAdm.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/ContextUser";

const CadastroAdm = () => {
    const { token } = useAuth();

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
        tipo: "",
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
            const response = await api.post('/adm/usuarios', formData, {
                headers: { Authorization: `Token ${token}` }
            });
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

        <section className={styleCadAdm.pai}>



            <section className={styleCadAdm.containerCad}>

                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>

                <div className={styleCadAdm.signin}>
                    <div className={styleCadAdm.content}>

                        <Link to="/">
                            <h3>voltar</h3>
                        </Link>

                        <h2>Cadastro de usuarios</h2>
                        <form className={styleCadAdm.form} onSubmit={handleSubmit}>
                            <div className={styleCadAdm.inputLeft}>
                                <div className={styleCadAdm.inputBox}>
                                    <input type="text" name="nome" value={formData.nome} required onChange={handleChange} />
                                    <i>Nome</i>
                                </div>
                                <div className={styleCadAdm.inputBox}>
                                    <input type="number" name="cpf" value={formData.cpf} required onChange={handleChange} />
                                    <i>CPF</i>
                                </div>
                                <div className={styleCadAdm.inputBox}>
                                    <input type="email" name="email" value={formData.email} required onChange={handleChange} />
                                    <i>Email</i>
                                </div>
                                <div className={styleCadAdm.inputBox}>
                                    <input type="number" name="telefone" value={formData.telefone} required onChange={handleChange} />
                                    <i>Telefone</i>
                                </div>
                                <div className={styleCadAdm.inputBox}>
                                    <input type="password" name="senha" value={formData.senha} required onChange={handleChange} />
                                    <i>Senha</i>
                                </div>
                            </div>

                            <div className={styleCadAdm.inputRight}>

                                <div className={styleCadAdm.Cepcontent}>
                                    <div className={styleCadAdm.inputBox}>
                                        <input type="number" name="cep" value={formData.cep} required onChange={handleChange} onBlur={buscarCep} />
                                        <i>CEP</i>
                                    </div>
                                    <div className={styleCadAdm.inputBox}>
                                        <input type="text" name="complemento" value={formData.complemento} required onChange={handleChange} />
                                        <i>Complemento</i>

                                    </div>
                                </div>
                                <div className={styleCadAdm.inputBox}>
                                    <input type="text" name="logradouro" value={formData.logradouro} required onChange={handleChange} />
                                    <i>Logradouro</i>
                                </div>
                                <div className={styleCadAdm.Cepcontent}>
                                    <div className={styleCadAdm.inputBox}>
                                        <input type="text" name="numero" value={formData.numero} required onChange={handleChange} />
                                        <i>Número</i>
                                    </div>

                                    <div className={styleCadAdm.inputBox}>
                                        <input type="text" name="estado" value={formData.estado} required onChange={handleChange} />
                                        <i>Estado</i>
                                    </div>
                                </div>
                                <div className={styleCadAdm.inputBox}>
                                    <input type="text" name="bairro" value={formData.bairro} required onChange={handleChange} />
                                    <i>Bairro</i>

                                </div>

                                <div className={styleCadAdm.inputBox}>

                                    <select
                                        name="tipo"
                                        value={formData.tipo}
                                        required
                                        onChange={handleChange}
                                        className={styleCadAdm.select}
                                    >
                                        <option value="">Tipo de Usuário</option>
                                        <option value="MEC">Mecânico</option>
                                        <option value="ADM">Administrador</option>
                                        <option value="CLI">Cliente</option>
                                    </select>
                                </div>


                            </div>
                            <div className={styleCadAdm.buttonCad}>
                                <input className={styleCadAdm.inputCad} type="submit" value="Cadastrar" />
                            </div>


                        </form>

                    </div>
                </div>
            </section>
        </section>
    );
};

export default CadastroAdm;