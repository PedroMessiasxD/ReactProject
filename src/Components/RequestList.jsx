import React from 'react';
import { Check, X, Clock } from 'lucide-react';

export const RequestList = () => {
  // Mock data - replace with actual API call
  const requests = [
    { id: 1, name: 'Carlos Oliveira', email: 'carlos@example.com', status: 'pending', date: '2024-03-15' },
    { id: 2, name: 'Ana Pereira', email: 'ana@example.com', status: 'pending', date: '2024-03-14' },
  ];

  const handleAccept = (id) => {
    // Implement accept logic
    console.log('Accept request:', id);
  };

  const handleReject = (id) => {
    // Implement reject logic
    console.log('Reject request:', id);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Solicitações Pendentes</h2>
      <div className="space-y-4">
        {requests.map((request) => (
          <div key={request.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{request.name}</h3>
                  <p className="text-sm text-gray-500">{request.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleAccept(request.id)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                >
                  <Check className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleReject(request.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Solicitado em: {request.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};