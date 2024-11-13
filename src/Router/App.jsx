import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Login from "../Components/Login.jsx";
import Register from "../Components/Register.jsx";
import RegisterForm from "../Components/RegisterForm.jsx";
import AdminLogin from "../Components/AdminLogin.jsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "../lib/queryClient.js";
import Layout from "../Layouts/Layout.jsx"; // A importação deve ser ajustada se for exportação nomeada
import UserList from "../Components/UserList.jsx";
import UserListAdmin from "../Components/UserListAdmin.jsx";
import LayoutAdmin from "../Layouts/LayouTAdmin.jsx";
import { PromoteUser } from "../Components/PromoverUsuario.jsx";
import Requests from "../Components/Requests.jsx";
import Companies from "../Components/Companies.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/admin-login",
        element: <AdminLogin />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        element: <LayoutAdmin />,
        children: [
            {
                path: "/userlistadmin",
                element: <UserListAdmin />
            }
        ]
    },
    {
        element: <LayoutAdmin />,
        children: [
            {
                path: "/promoteuser",
                element: <PromoteUser />
            }
        ]
    },
      {
        element: <LayoutAdmin />,
        children: [
            {
                path: "/empresas",
                element: <Companies />
            }
        ]
    },
    {
        element: <LayoutAdmin />,
        children: [
            {
                path: "/requests",
                element: <Requests />
            }
        ]
    },
    {
        element: <Layout />,
        children: [
            {
                path: "/registerform",
                element: <RegisterForm />
            },
        ]
    },
    {
        element: <Layout />,
        children: [
            {
                path: "/userlist",
                element: <UserList />
            },
        ]
    }
]);

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <RouterProvider router={router} />
                <ReactQueryDevtools position="bottom-right" />
            </AuthProvider>
        </QueryClientProvider>
    );
}

export default App;
