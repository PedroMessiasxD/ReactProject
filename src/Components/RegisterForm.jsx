import React, { useState } from 'react';
import { useSolicitarCadastro } from '../Services/Empresa';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    description: '',
    sector: '',
    socialMedia: '',
    adminName: '',
    adminEmail: '',
    adminPhone: ''
  });

  const { mutate: solicitarCadastro, isLoading, isError, error } = useSolicitarCadastro();

  const handleSubmit = (e) => {
    e.preventDefault();
    solicitarCadastro({
      nomeEmpresa: formData.companyName,
      descricaoEmpresa: formData.description,
      setorAtuacao: formData.sector,
      linkRedeSocial: formData.socialMedia,
      nomeAdministrador: formData.adminName,
      emailAdministrador: formData.adminEmail,
      telefoneAdministrador: formData.adminPhone
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Solicitar Cadastro</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Nome da Empresa</label>
          <input
            type="text"
            name="companyName"
            className="w-full p-2 border rounded-md"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Descrição da Empresa</label>
          <textarea
            name="description"
            className="w-full p-2 border rounded-md"
            rows="3"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Setor de Atuação</label>
          <input
            type="text"
            name="sector"
            className="w-full p-2 border rounded-md"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Link Rede Social</label>
          <input
            type="url"
            name="socialMedia"
            className="w-full p-2 border rounded-md"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Nome do Administrador</label>
          <input
            type="text"
            name="adminName"
            className="w-full p-2 border rounded-md"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Email do Administrador</label>
          <input
            type="email"
            name="adminEmail"
            className="w-full p-2 border rounded-md"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Telefone do Administrador</label>
          <input
            type="tel"
            name="adminPhone"
            className="w-full p-2 border rounded-md"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? 'Enviando...' : 'Enviar Cadastro'}
        </button>
        {isError && <p className="text-red-500">{error.message}</p>}
      </form>
    </div>
  );
};

export default RegisterForm;
