import React, { useState } from 'react';
import '../style/index.css';
import { useNavigate } from 'react-router-dom';
import { useLogin } from "../Services/Auth";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const { mutateAsync: login, isPending } = useLogin();

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setErrorMessage("Por favor, insira um email válido.");
            return;
        }

        setErrorMessage(""); // Limpa qualquer mensagem de erro anterior

        try {
            await login({ email, senha });
            navigate('/registerform');
        } catch (error) {
            setErrorMessage("Credenciais inválidas");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white-600 to-blue-500 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
                    <p className="text-gray-500 mt-2">Please sign in to your account</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="text-sm font-medium text-gray-700 block">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-purple-500 focus:outline-none transition"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <label className="text-sm font-medium text-gray-700 block">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-purple-500 focus:outline-none transition"
                            placeholder="Enter your password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={toggleShowPassword}
                            className="absolute right-3 top-9 text-gray-500"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

                    <div className="login-center-options">
                        <div className="remember-div">
                            <input type="checkbox" id="remember-checkbox" />
                            <label htmlFor="remember-checkbox">Remember-Me</label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white rounded-lg px-4 py-3 font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition"
                        disabled={isPending}
                    >
                        {isPending ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <p className="text-center mt-6 text-gray-600">
                    Don't have an account?{' '}
                    <a
                        href="/register"
                        className="text-purple-600 hover:text-purple-700 font-medium"
                        onClick={() => navigate('/register')}
                    >
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
};
export default Login;
