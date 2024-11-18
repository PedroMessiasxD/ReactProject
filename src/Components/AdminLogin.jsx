import React, { useState } from 'react';
import { useAdminLogin } from '../Services/AdminAuth';
import '../style/adminLogin.css';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Estado para mensagem de erro
    const { mutate: adminLogin } = useAdminLogin({
        onError: (error) => {
            setErrorMessage("Erro ao fazer login: Usuário ou senha incorretos ou sem permissões administrativas.");
        }
    });
    const navigate = useNavigate();

    const handleAdminLogin = async (e) => {
        e.preventDefault();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setErrorMessage("Por favor, insira um email válido.");
            return;
        }

        setErrorMessage(""); // Limpa qualquer mensagem de erro anterior

        try {
            const data = await adminLogin({ email, senha });

            if (!data.roles.includes('AdminGlobal')) {
                setErrorMessage("Este perfil não possui permissões de administrador.");
                return;
            }

            navigate('/userlistadmin'); // Ajuste a rota conforme necessário
        } catch (error) {
            setErrorMessage("Credenciais inválidas");
        }
    };


    return (
        <div className="admin-login-container">
            <div className="admin-login-box">
                <h2>Admin Login</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleAdminLogin}>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Senha</label>
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Entrar</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
