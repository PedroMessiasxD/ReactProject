import React, { useState } from 'react';
import { format } from 'date-fns';

const mockHistory = [
  {
    id: 1,
    companyId: 'emp001',
    campaignName: 'Summer Campaign 2024',
    mainTheme: 'Sustainability',
    createdAt: new Date(2024, 0, 15),
    approved: true,
    active: true,
    content: 'This is the detailed content of the summer campaign...'
  },
  {
    id: 2,
    companyId: 'emp001',
    campaignName: 'Winter Promotion',
    mainTheme: 'Sales',
    createdAt: new Date(2024, 1, 1),
    approved: false,
    active: false,
    content: null
  }
];

function Historico() {
  const [companyId, setCompanyId] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [expandedContent, setExpandedContent] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    setShowHistory(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">ID da Empresa</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Ver Histórico
          </button>
        </form>
      </div>

      {showHistory && (
        <div className="space-y-4">
          {mockHistory.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow p-6">
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{item.campaignName}</h3>
                  <p className="text-sm text-gray-500">Empresa ID: {item.companyId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Tema Principal:</span> {item.mainTheme}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Data de Criação:</span>{' '}
                    {format(item.createdAt, 'dd/MM/yyyy')}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      item.approved
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {item.approved ? 'Aprovada' : 'Não Aprovada'}
                  </span>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      item.active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {item.active ? 'Ativa' : 'Inativa'}
                  </span>
                </div>
                {item.content && (
                  <div>
                    <button
                      onClick={() => setExpandedContent(expandedContent === item.id ? null : item.id)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      {expandedContent === item.id ? 'Ocultar' : 'Ver'} Conteúdo Gerado
                    </button>
                    {expandedContent === item.id && (
                      <div className="mt-2 p-4 bg-gray-50 rounded-md">
                        <p className="text-sm text-gray-700">{item.content}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Historico;