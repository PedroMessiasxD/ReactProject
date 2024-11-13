import { useNavigate } from 'react-router-dom';
import connector from '../lib/axiosConnector.js';
import { useMutation } from '@tanstack/react-query';
import { data } from 'autoprefixer';

// function
const registerUser = async ({
    nome,
    sobrenome,
    email,
    senha,
    confirmarSenha
}) => {
    const response = await connector.post('Account/registro', {
        nome,
        sobrenome,
        email,
        senha,
        confirmarSenha
    });
    return response.data;
};

// function
const loginUser = async ({ email, senha }) => {
    const response = await connector.post('Account/login', {
        email, senha
    });
    return response.data;
};


// hooks
export const logout = async () => {
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

export const useRegisterUser = (options = {}) => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: ({
            nome,
            sobrenome,
            email,
            senha,
            confirmarSenha
        }) => registerUser({
            nome,
            sobrenome,
            email,
            senha,
            confirmarSenha
        }),
        onSuccess: (data) => {
            navigate("/")
        },
        onError: (error) => {
            console.error("Erro ao registrar", error);
        },
        ...options
    })
}

export const useLogin = (options = {}) => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: ({ email, senha }) => loginUser({ email, senha }),
        onSuccess: (data) => {
            localStorage.setItem('jwtToken', data.token);

            const payload = JSON.parse(atob(data.token.split('.')[1]));
            const userId = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
            localStorage.setItem('userId', userId);
            console.log(userId)
            console.log(data.userId)

            navigate("/");
        },
        onError: (error) => {
            console.error("Erro ao realizar login", error);
        },
        ...options
    });
};