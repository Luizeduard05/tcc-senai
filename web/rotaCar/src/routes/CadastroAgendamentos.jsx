import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Modal from 'react-modal';
import api from '../../service/api';
import stylesAgendarCad from './CadastroAgendamento.module.css';
import { useAuth } from '../Context/ContextUser';

Modal.setAppElement('#root'); // Define o elemento raiz para acessibilidade

const CadastroAgendamento = () => {
    const { id, tipo, token } = useAuth();
    const [formData, setFormData] = useState({
        dataHora: '',
        observacao: '',
        idPessoa: '',
        idVeiculo: '',
    });

    const [usuarios, setUsuarios] = useState([]);
    const [pessoas, setPessoas] = useState([]); // Apenas clientes filtrados
    const [veiculos, setVeiculos] = useState([]);
    const [nomePessoa, setNomePessoa] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        console.log('Modal aberto:', isModalOpen);
        if (isModalOpen) {
            console.log('Buscando usuários...');
            api.get('/todosUser', {
                headers: { Authorization: `Token ${token}` },
            })
                .then((res) => {
                    console.log('Resposta da API:', res.data);
                    const usuarios = res.data.result || []; // Garante que result é um array
                    const clientes = usuarios.filter((user) => user.tipo === 'CLI');
                    console.log('Usuários encontrados (clientes):', clientes);
                    setUsuarios(usuarios); // Define todos os usuários
                    setPessoas(clientes); // Define apenas os clientes
                })
                .catch((err) => {
                    console.error('Erro ao buscar usuários:', err);
                    console.error('Detalhes do erro:', err.response?.data || err.message);
                });
        }
    }, [isModalOpen]);

    const handlePessoaSelect = (pessoa) => {
        setFormData({ ...formData, idPessoa: pessoa.pessoa_id }); // Atualiza o idPessoa no formData
        setNomePessoa(pessoa.nome); // Exibe o nome selecionado no botão
        setIsModalOpen(false); // Fecha o modal

        // Buscar veículos associados ao cliente selecionado
        api.get(`/veiculos/${pessoa.pessoa_id}`, {
            headers: { Authorization: `Token ${token}` },
        })
            .then((res) => {
                // Garante que res.data seja um array
                const veiculosData = res.data.person || []; // A resposta contém "person" como o array de veículos
                console.log('Veículos associados:', veiculosData);
                setVeiculos(veiculosData); // Atualiza o estado dos veículos
            })
            .catch((err) => {
                console.error('Erro ao buscar veículos:', err);
                setVeiculos([]); // Reseta para array vazio em caso de erro
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Converte os campos idPessoa e idVeiculo para números (se necessário)
        const formatDate = (dateString) => {
            const date = new Date(dateString); // Cria um objeto Date a partir do valor da data
            const day = String(date.getDate()).padStart(2, '0'); // Adiciona zero à esquerda se necessário
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses começam do 0, então somamos 1
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
        
            return `${day}/${month}/${year} ${hours}:${minutes}`;
        };
        
        const formDataToSend = {
            data_e_hora: formatDate(formData.dataHora), // Formata a data no formato correto
            observacao: formData.observacao,
            idVeiOs: Number(formData.idVeiculo),
            idPessoaVeiOs: Number(formData.idPessoa),
        };
        
    
        console.log('Dados do formulário:', formDataToSend); // Verifica os dados antes do envio
    
        try {
            await api.post('/agendar', formDataToSend,{
                headers: { Authorization: `Token ${token}` }
            });
            alert('Agendamento cadastrado com sucesso!');
            setFormData({
                dataHora: '',
                observacao: '',
                idPessoa: '',
                idVeiculo: '',
            });
            setNomePessoa('');
            setVeiculos([]); // Limpa os veículos após o agendamento
        } catch (error) {
            console.error('Erro ao cadastrar agendamento:', error.response || error.message);
            alert('Erro ao cadastrar agendamento. Verifique os dados e tente novamente.');
        }
    };
    
    
    return (
        <motion.div
            className={stylesAgendarCad.container}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className={stylesAgendarCad.title}>Cadastrar Agendamento</h2>
            <motion.form
                onSubmit={handleSubmit}
                className={stylesAgendarCad.form}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
            >
                {/* Selecionar Pessoa */}
                <div className={stylesAgendarCad.inputGroup}>
                    <label htmlFor="idPessoa">Cliente</label>
                    <button
                        type="button"
                        className={stylesAgendarCad.selectButton}
                        onClick={() => {
                            console.log('Abrindo modal...');
                            setIsModalOpen(true);
                        }}
                    >
                        {nomePessoa || 'Selecionar Cliente'}
                    </button>
                </div>

                {/* Selecionar Veículo */}
                <div className={stylesAgendarCad.inputGroup}>
                    <label htmlFor="idVeiculo">Veículo</label>
                    <select
                        id="idVeiculo"
                        name="idVeiculo"
                        value={formData.idVeiculo}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>
                            Selecione um veículo
                        </option>
                        {veiculos.map((veiculo) => (
                            <option key={veiculo.id} value={veiculo.id}>
                                {veiculo.modelo} - {veiculo.placa}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Data e Hora */}
                <div className={stylesAgendarCad.inputGroup}>
                    <label htmlFor="dataHora">Data e Hora</label>
                    <input
                        type="datetime-local"
                        id="dataHora"
                        name="dataHora"
                        value={formData.dataHora}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Observação */}
                <div className={stylesAgendarCad.inputGroup}>
                    <label htmlFor="observacao">Observação</label>
                    <textarea
                        id="observacao"
                        name="observacao"
                        value={formData.observacao}
                        onChange={handleChange}
                        rows="3"
                        required
                    ></textarea>
                </div>

                <button type="submit" className={stylesAgendarCad.submitButton}>
                    Cadastrar
                </button>
            </motion.form>

            {/* Modal de Seleção de Pessoa */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                className={stylesAgendarCad.modal}
                overlayClassName={stylesAgendarCad.overlay}
            >
                <h3>Selecionar Cliente</h3>
                <input
                    type="text"
                    placeholder="Buscar pelo nome"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={stylesAgendarCad.searchInput}
                />
                <ul className={stylesAgendarCad.modalList}>
                    {pessoas
                        .filter((pessoa) =>
                            pessoa.nome.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((pessoa) => (
                            <li key={pessoa.id} onClick={() => handlePessoaSelect(pessoa)}>
                                {pessoa.nome}
                            </li>
                        ))}
                </ul>
                <button onClick={() => setIsModalOpen(false)} className={stylesAgendarCad.closeButton}>
                    Fechar
                </button>
            </Modal>
        </motion.div>
    );
};

export default CadastroAgendamento;
