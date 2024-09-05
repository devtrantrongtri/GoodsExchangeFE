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
        component: AdminPage
    }
]

const privateRoute : RouteType[] = [
    
]

export {privateRoute,publicRoute}