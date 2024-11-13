import { Outlet } from "react-router-dom"
import NavigationAdmin from "../Components/NavigationAdmin";

const LayoutAdmin = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            <NavigationAdmin />
            <main>
                <Outlet/>
            </main>
        </div>
    )
}

export default LayoutAdmin;