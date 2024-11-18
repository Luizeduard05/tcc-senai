import React, { createContext, useContext, useState, useEffect } from 'react';

// Criação do contexto
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [tipo, setUserTipo] = useState(localStorage.getItem('tipo') || null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [id, setId] = useState(localStorage.getItem('id') || null);
    const [nome, setNome] = useState(localStorage.getItem('nome') || null);

    const login = (tipo, token, id, nome) => {
        setUserTipo(tipo);
        setToken(token);
        setId(id);
        setNome(nome);

        // Armazena os dados no localStorage
        localStorage.setItem('tipo', tipo);
        localStorage.setItem('token', token);
        localStorage.setItem('id', id);
        localStorage.setItem('nome', nome);
    };

    const logout = () => {
        setUserTipo(null);
        setToken(null);
        setId(null);
        setNome(null);

        // Remove os dados do localStorage
        localStorage.removeItem('tipo');
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('nome');
    };

    // Sincroniza o estado com o localStorage ao montar o componente
    useEffect(() => {
        setUserTipo(localStorage.getItem('tipo'));
        setToken(localStorage.getItem('token'));
        setId(localStorage.getItem('id'));
        setNome(localStorage.getItem('nome'));
    }, []);

    return (
        <AuthContext.Provider value={{ tipo, token, id, nome, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar o contexto
export const useAuth = () => useContext(AuthContext);
