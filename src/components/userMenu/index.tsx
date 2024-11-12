import { Link ,useNavigate } from "react-router-dom";
import {auth} from '../../services/firebaseConnection';
import {signOut} from 'firebase/auth'

import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";


interface MenuProps{
    menuIsOpen: boolean
}

export function UserMenu({menuIsOpen}: MenuProps){

    const {signed,loadingAuth} = useContext(AuthContext);
    const navigate = useNavigate()

    async function handleLogOut(){
        await signOut(auth);
        
        if(!signed || !loadingAuth){
            navigate('login')
        }
    }


    return(
        <div className="absolute bg-red-500  right-0 to-full w-full max-w-md  flex flex-col items-center justify-center" 
        
        >
            <nav className={`absolute right-0 w-80 top-full mt-3 max-w-md overflow-hidden bg-red-500 transition-all duration-500 ease-in-out ${menuIsOpen ? 'h-72' : 'h-0'}`}
            
            >
                <ul className="flex flex-col min-h-full max-h-72 justify-center gap-9 items-center text-white">
                    <li><Link to='/dashboard'>Dashboard</Link></li>
                    <li><Link to='/newbook'>New Book</Link></li>
                    <li><Link to="/favorites">Favorites</Link></li>
                    <li><button
                    onClick={handleLogOut}
                    >Logout</button></li>
                </ul>
            </nav>
        </div>
    )
}