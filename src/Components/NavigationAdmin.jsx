import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaUsers, FaUserPlus, FaClipboardList, FaChevronRight, FaSignOutAlt } from 'react-icons/fa';
import { FaBuilding } from 'react-icons/fa6';
import { useNavigate, useLocation } from 'react-router-dom';
import { Adminlogout } from '../Services/AdminAuth';

function NavigationAdmin() {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate(); // Hook para navegação
  const location = useLocation(); // Hook para obter a rota atual

  const { mutate: logoutFn } = useMutation({
        mutationFn: Adminlogout,
        onSuccess: () => {
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("userId");
            localStorage.removeItem("roles");
            navigate("/");
        },
        onError: (error) => {
            console.log("Erro ao fazer logout", error);
        }
    });

  const menuItems = [
    { id: 'users', label: 'Usuários', icon: FaUsers, path: '/userlistadmin' },
    { id: 'promote', label: 'Promover Usuário', icon: FaUserPlus, path: '/promoteuser' },
    { id: 'requests', label: 'Solicitações', icon: FaClipboardList, path: '/requests' },
    { id: 'companies', label: 'Empresas', icon: FaBuilding, path: '/empresas' },
  ];

  const handleClick = (item) => {
    navigate(item.path); // Navega para a rota desejada
  };

  return (
    <div
      className={`bg-gray-800 text-white transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-64' : 'w-20'
      } relative group`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="p-4 flex items-center">
        <h1
          className={`text-xl font-bold whitespace-nowrap ${
            isExpanded ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-300`}
        >
          Dashboard
        </h1>
        {!isExpanded && <FaChevronRight className="mx-auto" />}
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item)} // Chama a função de clique
            className={`w-full flex items-center p-4 hover:bg-gray-700 ${
              location.pathname === item.path ? 'bg-gray-700' : ''
            }`}
          >
            <item.icon className={`${isExpanded ? 'mr-3' : 'mx-auto'}`} size={20} />
            <span
              className={`whitespace-nowrap ${
                isExpanded ? 'opacity-100' : 'opacity-0 w-0'
              } transition-all duration-300`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </nav>
      <button
        onClick={logoutFn}
        className="w-full flex items-center p-4 hover:bg-red-700 mt-auto border-t border-gray-700"
      >
        <FaSignOutAlt className={`${isExpanded ? 'mr-3' : 'mx-auto'}`} size={20} />
        <span className={`whitespace-nowrap ${
          isExpanded ? 'opacity-100' : 'opacity-0 w-0'
        } transition-all duration-300`}>
          Sair
        </span>
      </button>
    </div>
  );
}

export default NavigationAdmin;