import AdminLayout from "../layouts/AdminLayout";
import { AdsPage, ChatPage, HomePage, ProfilePage } from "../pages";
import AdminPage from "../pages/Admin";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import { RouteType } from "../types";


const publicRoute : RouteType[] = [
    {
        path: "/",
        component: HomePage
    },
    {
        path: "/profile",
        component: ProfilePage
    },
    {
        path: "/chat",
        component: ChatPage
    },
    {
        path: "/ads", // trang hieenr thij casc thong tin sanr phamr nguoi dungf dax dang
        component: AdsPage
    },
    {
        path: "/admin",
        component: AdminPage,
        layout : AdminLayout
    },
    {
        path: "/auth/login",
        component: LoginPage
    },
    {
        path: "/auth/register",
        component: RegisterPage
    }
]

const privateRoute : RouteType[] = [
    
]

export {privateRoute,publicRoute}