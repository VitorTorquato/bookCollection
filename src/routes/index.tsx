import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout";
import { Home } from "../pages/home";
import { Details } from "../pages/details";
import { Dashboard } from "../pages/dashboard";
import { NewBook } from "../pages/dashboard/new";
import { SignUp } from "../pages/singup";
import { LogIn } from "../pages/login";
import { NotFound } from "../pages/notfound";

import { Private } from "./private";

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
                path: '/dashboard',
                element: <Private><Dashboard/></Private>
            },
            {
                path:'/newbook',
                element: <Private><NewBook/></Private>
            },
            {
                path:'*',
                element:<NotFound/>
            }
        ],

        
    },
    //authRoutes
    {
        path:'/register',
        element:<SignUp/>

    },
    {
        path:'/login',
        element: <LogIn/>
    },

])


export {router}