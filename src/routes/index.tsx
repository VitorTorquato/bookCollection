import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout";
import { Home } from "../pages/home";
import { Details } from "../pages/details";
import { Favorites } from "../pages/favorites";
import { Dashboard } from "../pages/dashboard";
import { NewBook } from "../pages/dashboard/new";
import { SignUp } from "../pages/singup";
import { LogIn } from "../pages/login";
import { NotFound } from "../pages/notfound";


const router = createBrowserRouter([

    {
        element: <Layout/>,
        children: [
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/book/details/:id',
                element:<Details/>
            },
            {
                path: "/favorites",
                element: <Favorites/>
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
            {
                path:'/newbook',
                element:<NewBook/>
            },
            {
                path:'*',
                element:<NotFound/>
            }
        ],

        
    },
    //authRoutes
    {
        path:'register',
        element:<SignUp/>

    },
    {
        path:'/login',
        element: <LogIn/>
    },

])


export {router}