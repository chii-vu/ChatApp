// import { createContext } from "react";

// export const AuthContext = createContext("");
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        username: "",
        id: 0,
        status: false,
        isAdmin: false,
    });

    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
            {children}
        </AuthContext.Provider>
    );
};

