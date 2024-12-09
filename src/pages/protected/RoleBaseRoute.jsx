import { useSelector } from "react-redux";
import NotPermitted from "./NotPermitted";
import AdminPage from "../admin";

const RoleBaseRoute = () => {
    const isAdminRoute = window.location.pathname.startsWith('/admin');
    const roleUser = useSelector(state => state.account.user.role);
    const isAdmin = isAdminRoute && roleUser === 'ADMIN' ? true : false;

    if (isAdmin) {
        return (<AdminPage />);
    } else {
        return (<NotPermitted />);
    }

}

export default RoleBaseRoute;