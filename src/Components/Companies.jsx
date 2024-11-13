import React, { useState } from 'react';

const mockCompanies = [
  {
    id: "COMP001",
    name: "Tech Solutions Ltd",
    website: "https://techsolutions.com",
    description: "Empresa especializada em soluções tecnológicas inovadoras",
    email: "contact@techsolutions.com",
    participants: [
      {
        name: "Ana Silva",
        role: "Administrador",
        email: "ana.silva@techsolutions.com"
      },
      {
        name: "João Santos",
        role: "Desenvolvedor",
        email: "joao.santos@techsolutions.com"
      }
    ]
  },
  {
    id: "COMP002",
    name: "Digital Innovation Co",
    website: "https://digitalinnovation.com",
    description: "Consultoria em transformação digital e inovação",
    email: "info@digitalinnovation.com",
    participants: [
      {
        name: "Maria Oliveira",
        role: "CEO",
        email: "maria@digitalinnovation.com"
      },
      {
        name: "Pedro Costa",
        role: "Gerente de Projetos",
        email: "pedro@digitalinnovation.com"
      }
    ]
  }
];

function Companies() {
  const [expandedCompany, setExpandedCompany] = useState(null);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Empresas</h2>
        <div className="space-y-6">
          {mockCompanies.map((company) => (
            <div key={company.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{company.name}</h3>
                  <p className="text-gray-600">ID: {company.id}</p>
                </div>
                <button
                  onClick={() => setExpandedCompany(expandedCompany === company.id ? null : company.id)}
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md hover:bg-blue-200"
                >
                  {expandedCompany === company.id ? 'Ocultar' : 'Detalhes'}
                </button>
              </div>
              
              <div className="space-y-2">
                <p><span className="font-semibold">Website:</span> <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{company.website}</a></p>
                <p><span className="font-semibold">Email:</span> {company.email}</p>
                <p><span className="font-semibold">Descrição:</span> {company.description}</p>
              </div>

              {expandedCompany === company.id && (
                <div className="mt-4">
                  <h4 className="font-semibold text-lg mb-2">Participantes</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="text-left text-sm font-medium text-gray-500">Nome</th>
                          <th className="text-left text-sm font-medium text-gray-500">Papel</th>
                          <th className="text-left text-sm font-medium text-gray-500">Email</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {company.participants.map((participant, index) => (
                          <tr key={index}>
                            <td className="py-2">{participant.name}</td>
                            <td className="py-2">{participant.role}</td>
                            <td className="py-2">{participant.email}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Companies;