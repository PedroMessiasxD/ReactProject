import React, { useState } from 'react';

const mockRequest = {
  id: 'req001',
  campaignName: 'Summer Campaign 2024',
  companyId: 'emp001',
  mainTheme: 'Sustainability',
  frequency: 'Weekly',
  description: 'A campaign focused on environmental awareness',
  approved: true,
};

function SolicitacoesAdmin() {
  const [requestId, setRequestId] = useState('');
  const [requestData, setRequestData] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    setRequestData(mockRequest);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">ID da Solicitação</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={requestId}
              onChange={(e) => setRequestId(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Buscar Solicitação
          </button>
        </form>
      </div>

      {requestData && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{requestData.campaignName}</h3>
              <p className="mt-1 text-sm text-gray-500">ID da Empresa: {requestData.companyId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Tema Principal:</span> {requestData.mainTheme}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Frequência:</span> {requestData.frequency}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Descrição:</span> {requestData.description}
              </p>
            </div>
            <div>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  requestData.approved
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {requestData.approved ? 'Aprovada' : 'Ainda Não Aprovada'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SolicitacoesAdmin;