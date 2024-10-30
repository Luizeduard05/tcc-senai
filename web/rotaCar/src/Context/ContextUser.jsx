import React, { createContext, useContext, useState } from 'react';

// Criação do contexto
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userType, setUserType] = useState(null);
    const [token, setToken] = useState(null);
    const [id, setId] = useState(null);
    const [nome, setNome] = useState(null);

    const login = (type, token, id, nome) => {
        setUserType(type);
        setToken(token);
        setId(id);
        setNome(nome);
    };

    const logout = () => {
        setUserType(null);
        setToken(null);
        setId(null);
        setNome(null);
    };

    return (
        <AuthContext.Provider value={{ userType, token, id, nome, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar o contexto
export const useAuth = () => useContext(AuthContext);
