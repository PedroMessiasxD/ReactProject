import React from 'react';
import { format } from 'date-fns';

const mockUsers = [
  {
    id: 1,
    name: 'João',
    surname: 'Silva',
    email: 'joao.silva@email.com',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 2,
    name: 'Maria',
    surname: 'Santos',
    email: 'maria.santos@email.com',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: 3,
    name: 'Pedro',
    surname: 'Oliveira',
    email: 'pedro.oliveira@email.com',
    createdAt: new Date('2024-02-10'),
  },
];

function UserListAdmin() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Lista de Usuários</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sobrenome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data de Criação
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.surname}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {format(user.createdAt, 'dd/MM/yyyy')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserListAdmin;