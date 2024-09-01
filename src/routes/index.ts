import { AdsPage, ChatPage, HomePage, ProfilePage } from "../pages";
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
        path: "/ads",
        component: AdsPage
    }
]

const privateRoute : RouteType[] = [
    
]

export {privateRoute,publicRoute}