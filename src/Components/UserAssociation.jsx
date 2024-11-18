import React, { useState } from 'react';

const UserAssociation = () => {
  const [companyData, setCompanyData] = useState({ empresaId: '', email: '' });
  const [campaignData, setCampaignData] = useState({ 
    empresaId: '', 
    campanhaId: '', 
    email: '' 
  });

  const handleCompanyAssociation = (e) => {
    e.preventDefault();
    console.log('Associando usuário à empresa:', companyData);
    // Aqui você implementaria a lógica de associação
    alert('Usuário associado à empresa com sucesso!');
  };

  const handleCampaignAssociation = (e) => {
    e.preventDefault();
    console.log('Associando usuário à campanha:', campaignData);
    // Aqui você implementaria a lógica de associação
    alert('Usuário associado à campanha com sucesso!');
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Associação de Usuários</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Associação à Empresa */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Associar à Empresa</h3>
          <form onSubmit={handleCompanyAssociation} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">ID da Empresa</label>
              <input
                type="text"
                value={companyData.empresaId}
                onChange={(e) => setCompanyData({...companyData, empresaId: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email do Usuário</label>
              <input
                type="email"
                value={companyData.email}
                onChange={(e) => setCompanyData({...companyData, email: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Associar
            </button>
          </form>
        </div>

        {/* Associação à Campanha */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Associar à Campanha</h3>
          <form onSubmit={handleCampaignAssociation} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">ID da Empresa</label>
              <input
                type="text"
                value={campaignData.empresaId}
                onChange={(e) => setCampaignData({...campaignData, empresaId: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">ID da Campanha</label>
              <input
                type="text"
                value={campaignData.campanhaId}
                onChange={(e) => setCampaignData({...campaignData, campanhaId: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email do Usuário</label>
              <input
                type="email"
                value={campaignData.email}
                onChange={(e) => setCampaignData({...campaignData, email: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Associar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserAssociation;