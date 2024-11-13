// services/api.js
import { useMutation } from '@tanstack/react-query';
import connector from '../lib/axiosConnector'; // Ajuste conforme necessário para importar sua instância axios

const solicitarCadastro = async ({
    nomeEmpresa,
    descricaoEmpresa,
    setorAtuacao,
    linkRedeSocial,
    nomeAdministrador,
    emailAdministrador,
    telefoneAdministrador
}) => {
    const response = await connector.post('Empresa/solicitar-cadastro', {
        nomeEmpresa,
        descricaoEmpresa,
        setorAtuacao,
        linkRedeSocial,
        nomeAdministrador,
        emailAdministrador,
        telefoneAdministrador
    });
    return response.data;
};

export const useSolicitarCadastro = (options = {}) => {
    return useMutation({
        mutationFn: ({
            nomeEmpresa,
            descricaoEmpresa,
            setorAtuacao,
            linkRedeSocial,
            nomeAdministrador,
            emailAdministrador,
            telefoneAdministrador
        }) => solicitarCadastro({
            nomeEmpresa,
            descricaoEmpresa,
            setorAtuacao,
            linkRedeSocial,
            nomeAdministrador,
            emailAdministrador,
            telefoneAdministrador
        }),
        onSuccess: () => {
            console.log("Usuario Cadastrado")
        },
        onError: (error) => {
            console.error("Erro ao solicitar cadastro", error); // Exibe erro se houver
        },
        ...options,  // Permite passar opções adicionais, se necessário
    });
};