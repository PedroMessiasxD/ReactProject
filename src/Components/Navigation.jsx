import React, { useState } from 'react';
import { HiMenuAlt3, HiUserAdd, HiUsers, HiLogout } from 'react-icons/hi';
import { logout } from '../Services/Auth';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navigation = () => {
    const navigate = useNavigate();
    const { participante } = useAuth(); // Se necessário
    const [isExpanded, setIsExpanded] = useState(false);

    const menuItems = [
        { name: 'Solicitar Cadastro', icon: HiUserAdd, path: '/registerform' },
        { name: 'Listar Usuários', icon: HiUsers, path: '/userlist' },
    ];

    const { mutate: logoutFn } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("userId");
            navigate("/");
        },
        onError: (error) => {
            console.log("Erro ao fazer logout", error);
        }
    });

    return (
        <div
            className={`fixed top-0 left-0 h-screen overflow-y-auto bg-gray-800 ${isExpanded ? 'w-72' : 'w-16'} duration-300 flex flex-col`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            <nav className="mt-8 flex-1">
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        className="p-4 text-gray-300 flex items-center cursor-pointer hover:bg-gray-700"
                        onClick={() => navigate(item.path)}
                    >
                        <item.icon className="text-2xl" />
                        {isExpanded && (
                            <span className="ml-4 duration-300">{item.name}</span>
                        )}
                    </div>
                ))}
            </nav>
            <div
                className="p-4 text-red-400 flex items-center cursor-pointer hover:bg-gray-700 mb-4"
                onClick={() => logoutFn()}
            >
                <HiLogout className="text-2xl" />
                {isExpanded && (
                    <span className="ml-4 duration-300">Sair</span>
                )}
            </div>
        </div>
    );
};

export default Navigation;