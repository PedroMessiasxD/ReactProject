import React, { useState } from 'react';
import { 
    UserGroupIcon, BuildingOfficeIcon, LinkIcon, 
    DocumentTextIcon, InboxIcon, DocumentDuplicateIcon,
    ClockIcon, UserPlusIcon, ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Adminlogout } from '../Services/AdminAuth';

const NavigationAdmin = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();

    const menuItems = [
        { id: 'users', name: 'Listar Usuários', icon: UserGroupIcon, path: '/userlistadmin' },
        { id: 'companies', name: 'Empresas', icon: BuildingOfficeIcon, path: '/empresas' },
        { id: 'association', name: 'Associação de usuários', icon: LinkIcon, path: '/userassociation' },
        { id: 'campaign', name: 'Campanha', icon: DocumentTextIcon, path: '/campanha' },
        { id: 'requests', name: 'Solicitações', icon: InboxIcon, path: '/solicitacoes' },
        { id: 'posts', name: 'Postagens', icon: DocumentDuplicateIcon, path: '/postagens' },
        { id: 'history', name: 'Histórico', icon: ClockIcon, path: '/historico' },
        { id: 'register', name: 'Solicitar Cadastro', icon: UserPlusIcon, path: '/registerforadmin' },
    ];

    const { mutate: logoutFn } = useMutation({
        mutationFn: Adminlogout,
        onSuccess: () => {
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('userId');
            navigate('/admin-login');
        },
        onError: (error) => {
            console.log('Erro ao fazer logout:', error);
        },
    });

    const handleLogout = () => {
        logoutFn();
    };

    return (
        <div
            className={`bg-gray-800 text-white transition-all duration-300 flex flex-col h-screen ${
                isExpanded ? 'w-64' : 'w-20'
            }`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            <div className="p-4 flex-grow">
                <nav className="space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => navigate(item.path)}
                            className="flex items-center w-full p-3 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            <item.icon className="h-6 w-6" />
                            {isExpanded && (
                                <span className="ml-3 whitespace-nowrap">{item.name}</span>
                            )}
                        </button>
                    ))}
                </nav>
            </div>
            <div className="p-4 border-t border-gray-700">
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full p-3 rounded-lg hover:bg-gray-700 transition-colors text-red-400 hover:text-red-300"
                >
                    <ArrowRightOnRectangleIcon className="h-6 w-6" />
                    {isExpanded && (
                        <span className="ml-3 whitespace-nowrap">Logout</span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default NavigationAdmin;
