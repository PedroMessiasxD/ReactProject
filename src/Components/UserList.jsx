import React from 'react';
import { useFetchUsuarios } from '../Services/Usuarios';
import { useAuth } from '../context/AuthContext';

const UserList = () => {
  const { token } = useAuth();
  const { data, isLoading, isError, error } = useFetchUsuarios(token);

  const usuarios = data ?? [];

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Carregando usuários...</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Erro ao carregar usuários</h2>
        <p className="text-red-500">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Usuários Cadastrados</h2>
      <div className="space-y-4">
        {Array.isArray(usuarios) && usuarios.length > 0 ? (
          usuarios.map((user) => (
            <div
              key={user.id}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-semibold text-lg text-gray-800">
                {user.nome} {user.sobrenome}
              </h3>
              <p className="text-gray-600">{user.email}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">Nenhum usuário encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default UserList;