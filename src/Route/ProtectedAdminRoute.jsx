import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ element }) => {
  const token = localStorage.getItem('jwtToken');
  const roles = localStorage.getItem('roles');
  const isAdmin = roles && roles.includes('AdminEmpresarial'); // Verifica se "Admin" está entre os roles
  const isParticipante = roles && roles.includes('ParticipanteEmpresa'); 

  if (!token || !isAdmin || !isParticipante) {
    return <Navigate to="/admin-login" />;
  }

  return element;
};

export default ProtectedAdminRoute;
