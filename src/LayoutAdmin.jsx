import { Outlet } from "react-router";
import Header from "./components/header";
import Footer from "./components/footer";
import { useSelector } from "react-redux";

const LayoutAdmin = () => {
    const isAdminRoute = window.location.pathname.startsWith('/admin');
    const roleUser = useSelector(state => state.account.user.role);
    const isAdmin = isAdminRoute && roleUser === 'ADMIN' ? true : false;

    return (
        <>
            <div className="layout-app">
                {isAdmin && <Header />}
                <Outlet />
                {isAdmin && <Footer />}
            </div>
        </>
    )
}

export default LayoutAdmin;
