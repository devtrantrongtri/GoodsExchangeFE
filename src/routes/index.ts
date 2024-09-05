import AdminLayout from "../layouts/AdminLayout";
import { AdsPage, ChatPage, HomePage, ProfilePage } from "../pages";
import AdminPage from "../pages/Admin";
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
    }
]

const privateRoute : RouteType[] = [
    
]

export {privateRoute,publicRoute}