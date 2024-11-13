import { Outlet } from "react-router-dom";
import React from "react";
import Navigation from "../Components/Navigation";

const Layout = () => {
    return (
        <div className="flex min-h-screen">
            <Navigation/>
                <main className="flex-1">
                    <Outlet/>
                </main>
        </div>
    );
};

export default Layout;