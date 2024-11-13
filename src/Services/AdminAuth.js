import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import connector from "../lib/axiosConnector";

// function
const loginAdmin = async ({ email, senha }) => {
    const response = await connector.post('Account/login', {
        email,
        senha
    });
    return response.data;
};

export const useAdminLogin = (options = {}) => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: ({ email, senha }) => loginAdmin({ email, senha }),
        onSuccess: (data) => {
            localStorage.setItem('jwtToken', data.token);
            localStorage.setItem('roles', JSON.stringify(data.roles));

            console.log("Login bem sucedido", data)

            const payload = JSON.parse(atob(data.token.split('.')[1]));
            const userId = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
            localStorage.setItem('userId', userId);
            console.log(userId)
            console.log(data.userId)

            if (data.roles.includes('AdminGlobal')) {
                navigate('/userlistadmin');
            } else {
                console.error("Usuario não possui permissões de adminisstrador");
            }
        },
        onError: (error) => {
            console.error("Erro ao realizar login administrador", error);
        },
        ...options
    });
};

export const Adminlogout = async () => {
    const token = localStorage.getItem('jwtToken');
    console.log("Token:", token); 
    if (!token) {
        console.log("Não foi encontrado token")
        return;
    }
    const response = await connector.post("Account/logout", {}, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return response.data;
};
