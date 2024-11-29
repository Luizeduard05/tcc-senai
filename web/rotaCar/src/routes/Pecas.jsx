import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Modal from "react-modal";
import api from "../../service/api";
import stylesPecas from "./Pecas.module.css";
import { useAuth } from "../Context/ContextUser";

Modal.setAppElement("#root");

const Pecas = () => {
    const {token} = useAuth()
  const [pecas, setPecas] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedPeca, setSelectedPeca] = useState(null);
  const [formData, setFormData] = useState({
    nome_produto: "",
    marca_produto: "",
    valor_produto: "",
  });

  const fetchPecas = async () => {
    try {
      const response = await api.get("/todasPecas",{
        headers: { Authorization: `Token ${token}` }
      });
      setPecas(response.data.pecas);
    } catch (error) {
      console.error("Erro ao buscar peças:", error);
    }
  };

  useEffect(() => {
    fetchPecas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit && selectedPeca) {
        await api.put(`/pecas/${selectedPeca.id}`, formData,{
            headers: { Authorization: `Token ${token}` }
        });
        alert("Peça atualizada com sucesso!");
      } else {
        await api.post("/pecas", formData,{
            headers: { Authorization: `Token ${token}` }
        });
        alert("Peça cadastrada com sucesso!");
      }
      fetchPecas();
      closeModal();
    } catch (error) {
      console.error("Erro ao salvar peça:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente excluir esta peça?")) {
      try {
        await api.delete(`/pecas/${id}`, {
          headers: { Authorization: `Token ${token}` }
        });
        alert("Peça excluída com sucesso!");
        fetchPecas();
      } catch (error) {
        console.error("Erro ao excluir peça:", error);
      }
    }
  };
  

  const openModal = (peca = null) => {
    setIsEdit(!!peca);
    setSelectedPeca(peca);
    setFormData(peca || { nome_produto: "", marca_produto: "", valor_produto: "" });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPeca(null);
    setFormData({ nome_produto: "", marca_produto: "", valor_produto: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className={stylesPecas.container}>
      <motion.h1
        className={stylesPecas.title}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Gerenciar Peças
      </motion.h1>

      <motion.button
        className={stylesPecas.addButton}
        onClick={() => openModal()}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Adicionar Peça
      </motion.button>

      <motion.div
        className={stylesPecas.tableContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <table className={stylesPecas.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Marca</th>
              <th>Valor</th>
              <th>Data de Cadastro</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pecas.map((peca) => (
              <tr key={peca.id}>
                <td>{peca.nome_produto}</td>
                <td>{peca.marca_produto}</td>
                <td>R$ {parseFloat(peca.valor_produto).toFixed(2)}</td>
                <td>{new Date(peca.data_cad).toLocaleDateString()}</td>
                <td>
                  <button className={stylesPecas.editButton} onClick={() => openModal(peca)}>
                    Editar
                  </button>
                  <button className={stylesPecas.deleteButton} onClick={() => handleDelete(peca.id)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={stylesPecas.modal}
        overlayClassName={stylesPecas.overlay}
      >
        <form onSubmit={handleSubmit} className={stylesPecas.modalForm}>
          <h2>{isEdit ? "Editar Peça" : "Cadastrar Peça"}</h2>
          <input
            type="text"
            name="nome_produto"
            placeholder="Nome do Produto"
            value={formData.nome_produto}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="marca_produto"
            placeholder="Marca do Produto"
            value={formData.marca_produto}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            step="0.01"
            name="valor_produto"
            placeholder="Valor do Produto"
            value={formData.valor_produto}
            onChange={handleChange}
            required
          />
          <div className={stylesPecas.modalActions}>
            <button type="submit" className={stylesPecas.saveButton}>
              {isEdit ? "Salvar Alterações" : "Cadastrar"}
            </button>
            <button type="button" onClick={closeModal} className={stylesPecas.cancelButton}>
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Pecas;
