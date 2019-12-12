import {
    Cart,
    Classify,
    Detail,
    Home,
    Login,
    My,
    Promotion
} from "../pages/index"

export const tableBar = [
    {
        pathname : "/app/home",
        component : Home
    },
    {
        pathname : "/app/classify",
        component : Classify
    },
    {
        pathname : "/app/promotion",
        component : Promotion
    },
    {
        pathname : "/app/cart",
        component : Cart
    },
    {
        pathname : "/app/my",
        component : My
    }
]