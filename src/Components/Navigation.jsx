import React, {useState} from 'react';
import { HiMenuAlt3, HiUserAdd, HiUsers, HiLogout } from 'react-icons/hi';
import { logout } from '../Services/Auth'

export const Navigation = ({ setActiveComponent }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { name: 'Solicitar Cadastro', icon: HiUserAdd, component: 'register' },
    { name: 'Listar Usuários', icon: HiUsers, component: 'list' },
  ];

 return (
    <div
      className={`bg-gray-800 h-screen ${
        isExpanded ? 'w-72' : 'w-16'
      } duration-300 relative flex flex-col`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="p-4">
        <HiMenuAlt3 className="text-white text-2xl cursor-pointer" />
      </div>
      <nav className="mt-4 flex-1">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="p-4 text-gray-300 flex items-center cursor-pointer hover:bg-gray-700"
            onClick={() => setActiveComponent(item.component)}
          >
            <item.icon className="text-2xl" />
            <span
              className={`ml-4 duration-300 ${
                !isExpanded && 'opacity-0 overflow-hidden'
              }`}
            >
              {item.name}
            </span>
          </div>
        ))}
      </nav>
      <div
        className="p-4 text-red-400 flex items-center cursor-pointer hover:bg-gray-700 mb-4"
        onClick={logout}
      >
        <HiLogout className="text-2xl" />
        <span
          className={`ml-4 duration-300 ${
            !isExpanded && 'opacity-0 overflow-hidden'
          }`}
        >
          Sair
        </span>
      </div>
    </div>
  );
}

export default Navigation;