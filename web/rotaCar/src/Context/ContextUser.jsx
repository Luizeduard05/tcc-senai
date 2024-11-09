import React, { createContext, useContext, useState } from 'react';

// Criação do contexto
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [tipo, setUserTipo] = useState(null);
    const [token, setToken] = useState(null);
    const [id, setId] = useState(null);
    const [nome, setNome] = useState(null);

    const login = (tipo, token, id, nome) => {
        setUserTipo(tipo);
        setToken(token);
        setId(id);
        setNome(nome);
    };

    const logout = () => {
        setUserTipo(null);
        setToken(null);
        setId(null);
        setNome(null);
    };

    return (
        <AuthContext.Provider value={{ tipo, token, id, nome, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar o contexto
export const useAuth = () => useContext(AuthContext);
