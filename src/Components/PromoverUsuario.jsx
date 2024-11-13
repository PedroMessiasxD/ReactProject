import React, { useState } from 'react';
import { Search, ArrowUpCircle } from 'lucide-react';

export const PromoteUser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data - replace with actual API call
  const users = [
    { id: 1, name: 'Roberto Silva', email: 'roberto@example.com', role: 'Usuário' },
    { id: 2, name: 'Patricia Santos', email: 'patricia@example.com', role: 'Usuário' },
  ];

  const handlePromote = (userId) => {
    // Implement promotion logic
    console.log('Promote user:', userId);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Promover Usuário</h2>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar usuário..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
              <span className="text-xs text-gray-500">Função atual: {user.role}</span>
            </div>
            <button
              onClick={() => handlePromote(user.id)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowUpCircle className="h-4 w-4" />
              <span>Promover</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};