import React from 'react';

const mockRequests = [
  {
    id: 1,
    status: 'Pendente',
    message: 'Solicito acesso ao módulo administrativo',
    adminEmail: 'admin@empresa.com',
    adminName: 'Carlos Administrador',
  },
  {
    id: 2,
    status: 'Pendente',
    message: 'Preciso de permissões avançadas',
    adminEmail: 'gerente@empresa.com',
    adminName: 'Ana Gerente',
  },
];

function Requests() {
  const handleApprove = (id) => {
    console.log('Aprovado:', id);
  };

  const handleReject = (id) => {
    console.log('Recusado:', id);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Solicitações</h2>
        <div className="space-y-4">
          {mockRequests.map((request) => (
            <div
              key={request.id}
              className="border rounded-lg p-4 flex items-center justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">Status:</span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                    {request.status}
                  </span>
                </div>
                <p><span className="font-semibold">Mensagem:</span> {request.message}</p>
                <p><span className="font-semibold">Email Admin:</span> {request.adminEmail}</p>
                <p><span className="font-semibold">Nome Admin:</span> {request.adminName}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleApprove(request.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Aprovar
                </button>
                <button
                  onClick={() => handleReject(request.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Recusar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Requests;