import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userType, setUserType] = useState(null);

    const login = (type) => {
        // Logica para autentificar o tipo de usuario
        setUserType(type);
    };

    return (
        <AuthContext.Provider value={{ userType, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);