import { Outlet } from "react-router";
import Header from "./components/header";
import Footer from "./components/footer";

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout;
