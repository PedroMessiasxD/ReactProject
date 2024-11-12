import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { useRegisterUser } from '../Services/Auth';
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate();

  // State para as senhas e visibilidade da senha
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isWaitingForConfirmation, setIsWaitingForConfirmation] = useState(false);
  const [confirmationToken, setConfirmationToken] = useState(''); // Novo estado para armazenar o token

  // Hook para registro
  const { mutate } = useRegisterUser();

  // Função para alternar a visibilidade da senha
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      setErrorMessage('As senhas não coincidem');
      return;
    }

    // Validações de email e senha
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrorMessage('Por favor, insira um email válido.');
      return;
    }
    if (senha.length < 6) {
      setErrorMessage('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setErrorMessage(''); // Resetando mensagem de erro

    // Chama o hook de registro com os dados do formulário
    mutate(
      { nome, sobrenome, email, senha, confirmarSenha },
      {
        onSuccess: (response) => {
          setIsWaitingForConfirmation(true);
          setConfirmationToken(response.token); // Define o token retornado pela API
        },
        onError: () => {
          setErrorMessage('Ocorreu um erro ao registrar.');
        },
      }
    );
  };

  // useEffect para verificar a confirmação de e-mail periodicamente
  useEffect(() => {
    let interval;
    if (isWaitingForConfirmation && confirmationToken) {
      interval = setInterval(async () => {
        try {
          const response = await axios.get(`/api/Account/confirm-email`, {
            params: { email, token: confirmationToken },
          });
          if (response.status === 200) {
            clearInterval(interval);
            navigate('/'); // Redireciona para a tela de login após confirmação
          }
        } catch (error) {
          console.log('Aguardando confirmação...');
        }
      }, 5000); // Verifica a cada 5 segundos
    }
    return () => clearInterval(interval);
  }, [isWaitingForConfirmation, confirmationToken, email, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white-600 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-500 mt-2">Please fill in your details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block">First Name</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-purple-500 focus:outline-none transition"
                placeholder="First Name"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block">Last Name</label>
              <input
                type="text"
                value={sobrenome}
                onChange={(e) => setSobrenome(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-purple-500 focus:outline-none transition"
                placeholder="Last Name"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-purple-500 focus:outline-none transition"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-purple-500 focus:outline-none transition"
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-purple-500 focus:outline-none transition"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg px-4 py-3 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
          >
            Create Account
          </button>
        </form>

        {isWaitingForConfirmation && (
          <p className="text-center mt-4 text-gray-500">Esperando Confirmação de E-mail...</p>
        )}

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <a
            href="#"
            className="text-blue-600 hover:text-blue-700 font-medium"
            onClick={() => navigate('/')}
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}