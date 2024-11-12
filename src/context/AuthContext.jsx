import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [roles, setRoles] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem("jwtToken");
        const storedUserId = localStorage.getItem("userId");
        const storedRoles = JSON.parse(localStorage.getItem("roles")) || [];
        const storedIsAdmin = JSON.parse(localStorage.getItem("isAdmin"));

        if (storedToken && storedUserId) {
            setToken(storedToken);
            setUserId(storedUserId);
            setRoles(storedRoles);
            setIsAdmin(storedIsAdmin);
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post("/api/Account/login", { email, password });
            const { token, roles, isAdmin } = response.data;

            const payload = JSON.parse(atob(token.split('.')[1]));
            const userId = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

            localStorage.setItem("jwtToken", token);
            localStorage.setItem("userId", userId);
            localStorage.setItem("roles", JSON.stringify(roles));
            localStorage.setItem("isAdmin", JSON.stringify(isAdmin));

            setToken(token);
            setUserId(userId);
            setRoles(roles);
            setIsAdmin(isAdmin);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await axios.post("/api/Account/logout", {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            localStorage.removeItem("jwtToken");
            localStorage.removeItem("userId");
            localStorage.removeItem("roles");
            localStorage.removeItem("isAdmin");

            setToken(null);
            setUserId(null);
            setRoles([]);
            setIsAdmin(false);
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    };

    const value = {
        token, 
        isAuthenticated,
        userId, 
        roles,
        isAdmin,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
        return useContext(AuthContext)
}
