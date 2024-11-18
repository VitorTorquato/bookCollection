import { Outlet } from "react-router-dom";
import { Header } from "../components/header";


export function Layout({children}:any){
    return(
        <>
        <Header
        children={children}
        />
        <Outlet/>
        </>
    )
}