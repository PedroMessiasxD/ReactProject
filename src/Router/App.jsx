import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Login from "../Components/Login.jsx"; 
import Register from "../Components/Register.jsx"; 
import RegisterForm from "../Components/RegisterForm.jsx"; 
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import queryClient from "../lib/queryClient.js";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/registerform",
        element: <RegisterForm />
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
