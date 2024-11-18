import React, { useState } from 'react';

const mockCampaigns = [
  {
    id: 'camp001',
    name: 'Campanha Verão 2024',
    empresaId: 'emp001',
    mainTheme: 'Sustentabilidade',
    participants: [
      { name: 'João Silva', role: 'Coordenador' },
      { name: 'Maria Santos', role: 'Editor' }
    ]
  }
];

const Campanha = () => {
  const [viewSection, setViewSection] = useState('create');
  const [campaignForm, setCampaignForm] = useState({
    name: '',
    mainTheme: '',
    frequency: '',
    description: '',
    empresaId: ''
  });
  const [acceptForm, setAcceptForm] = useState({ empresaId: '', solicitacaoId: '' });
  const [rejectForm, setRejectForm] = useState({ empresaId: '', solicitacaoId: '' });
  const [viewCampaignId, setViewCampaignId] = useState('');
  const [showCampaigns, setShowCampaigns] = useState(false);

  const handleCreateCampaign = (e) => {
    e.preventDefault();
    console.log('Criando campanha:', campaignForm);
    alert('Campanha criada com sucesso!');
  };

  const handleAcceptCampaign = (e) => {
    e.preventDefault();
    console.log('Aceitando campanha:', acceptForm);
    alert('Campanha aceita com sucesso!');
  };

  const handleRejectCampaign = (e) => {
    e.preventDefault();
    console.log('Recusando campanha:', rejectForm);
    alert('Campanha recusada.');
  };

  const handleViewCampaigns = (e) => {
    e.preventDefault();
    setShowCampaigns(true);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6 space-x-4">
        <button
          onClick={() => setViewSection('create')}
          className={`px-4 py-2 rounded ${viewSection === 'create' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Solicitar Criação
        </button>
        <button
          onClick={() => setViewSection('accept')}
          className={`px-4 py-2 rounded ${viewSection === 'accept' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Aceitar Campanha
        </button>
        <button
          onClick={() => setViewSection('reject')}
          className={`px-4 py-2 rounded ${viewSection === 'reject' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Recusar Campanha
        </button>
        <button
          onClick={() => setViewSection('view')}
          className={`px-4 py-2 rounded ${viewSection === 'view' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Campanhas
        </button>
      </div>

      {viewSection === 'create' && (
        <form onSubmit={handleCreateCampaign} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome da Campanha</label>
            <input
              type="text"
              value={campaignForm.name}
              onChange={(e) => setCampaignForm({...campaignForm, name: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tema Principal</label>
            <input
              type="text"
              value={campaignForm.mainTheme}
              onChange={(e) => setCampaignForm({...campaignForm, mainTheme: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Frequência</label>
            <input
              type="text"
              value={campaignForm.frequency}
              onChange={(e) => setCampaignForm({...campaignForm, frequency: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea
              value={campaignForm.description}
              onChange={(e) => setCampaignForm({...campaignForm, description: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows="3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">ID da Empresa</label>
            <input
              type="text"
              value={campaignForm.empresaId}
              onChange={(e) => setCampaignForm({...campaignForm, empresaId: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Gerar
          </button>
        </form>
      )}

      {viewSection === 'accept' && (
        <form onSubmit={handleAcceptCampaign} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">ID da Empresa</label>
            <input
              type="text"
              value={acceptForm.empresaId}
              onChange={(e) => setAcceptForm({...acceptForm, empresaId: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">ID da Solicitação</label>
            <input
              type="text"
              value={acceptForm.solicitacaoId}
              onChange={(e) => setAcceptForm({...acceptForm, solicitacaoId: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Aceitar
          </button>
        </form>
      )}

      {viewSection === 'reject' && (
        <form onSubmit={handleRejectCampaign} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">ID da Empresa</label>
            <input
              type="text"
              value={rejectForm.empresaId}
              onChange={(e) => setRejectForm({...rejectForm, empresaId: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">ID da Solicitação</label>
            <input
              type="text"
              value={rejectForm.solicitacaoId}
              onChange={(e) => setRejectForm({...rejectForm, solicitacaoId: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
          >
            Recusar
          </button>
        </form>
      )}

      {viewSection === 'view' && (
        <div className="space-y-4">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">ID da Empresa</label>
              <input
                type="text"
                value={viewCampaignId}
                onChange={(e) => setViewCampaignId(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleViewCampaigns}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Ver
            </button>
          </div>

          {showCampaigns && (
            <div className="space-y-4">
              {mockCampaigns.map((campaign) => (
                <div key={campaign.id} className="border rounded-lg p-4">
                  <h3 className="text-xl font-semibold">{campaign.name}</h3>
                  <p className="text-gray-600">ID da Empresa: {campaign.empresaId}</p>
                  <p className="text-gray-600">Tema Principal: {campaign.mainTheme}</p>
                  <div className="mt-2">
                    <h4 className="font-medium">Participantes:</h4>
                    <ul className="mt-1 space-y-1">
                      {campaign.participants.map((participant, index) => (
                        <li key={index} className="text-gray-600">
                          {participant.name} - {participant.role}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Campanha;