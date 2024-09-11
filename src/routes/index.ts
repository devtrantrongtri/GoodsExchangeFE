import AdminLayout from "../layouts/AdminLayout";
import NoLayout from "../layouts/NoLayout";
import { AdsPage, ChatPage, HomePage, ProfilePage,ProductDetailPage } from "../pages";
import AdminPage from "../pages/Admin";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import ProductPage from "../pages/Product";
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
        component: ChatPage,
        layout:NoLayout
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
    },
    {
        path: "/product",
        component: ProductPage
    },
    {
        path: "/product/productDetail/:id",
        component: ProductDetailPage
    },
]

const privateRoute : RouteType[] = [
    
]

export {privateRoute,publicRoute}