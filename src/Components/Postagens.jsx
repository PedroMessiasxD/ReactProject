import React, { useState } from 'react';

const mockPosts = {
  'camp001': {
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    campaignId: 'camp001',
    createdAt: '2024-02-15'
  }
};

const Postagens = () => {
  const [campaignId, setCampaignId] = useState('');
  const [post, setPost] = useState(null);

  const handleGeneratePost = (e) => {
    e.preventDefault();
    const generatedPost = mockPosts[campaignId];
    setPost(generatedPost || {
      content: 'Novo conteúdo gerado para a campanha.',
      campaignId,
      createdAt: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Postagens</h2>
      
      <form onSubmit={handleGeneratePost} className="mb-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">ID da Campanha</label>
            <input
              type="text"
              value={campaignId}
              onChange={(e) => setCampaignId(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors self-end"
          >
            Gerar Postagem
          </button>
        </div>
      </form>

      {post && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-2">
            <p className="text-gray-600">{post.content}</p>
            <p className="text-sm text-gray-500">ID da Campanha: {post.campaignId}</p>
            <p className="text-sm text-gray-500">Data de Criação: {new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Postagens;