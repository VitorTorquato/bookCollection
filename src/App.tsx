import { RouterProvider } from "react-router-dom";
import {router} from './routes'

import AuthProvider from './contexts/authContext'

export function App() {
 return(
    <>
      <AuthProvider>
       <RouterProvider router={router}/>
      </AuthProvider>
    </>

 )
}

