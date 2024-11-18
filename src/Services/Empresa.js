// services/api.js
import { useMutation } from '@tanstack/react-query';
import connector from '../lib/axiosConnector'; // Ajuste conforme necessário para importar sua instância axios

const solicitarCadastro = async (data, token) => {
    const response = await connector.post(
      'Empresa/solicitar-cadastro',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  };
  
  // Hook para encapsular o uso da mutation
  export const useSolicitarCadastro = (options = {}) => {
    return useMutation({
      mutationFn: ({ data, token }) =>
        solicitarCadastro(data, token), // Inclui token na requisição
      onSuccess: () => {
        console.log('Solicitação enviada com Sucesso');
      },
      onError: (error) => {
        if (error.response) {
          console.error('Erro ao solicitar cadastro', {
            status: error.response.status,
            data: error.response.data,
            headers: error.response.headers
          });
        } else if (error.request) {
          console.error('Erro de requisição: Sem resposta do servidor', error.request);
        } else {
          console.error('Erro ao configurar a requisição', error.message);
        }
      },
      ...options // Permite personalizar o comportamento do hook
    });
  };