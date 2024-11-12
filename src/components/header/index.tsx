import {FaSearch} from "react-icons/fa";
import {FiUser} from "react-icons/fi";
import { Link } from "react-router-dom";

import { useContext,useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { UserMenu } from "../userMenu";

export function Header(){

    const {signed,loadingAuth} = useContext(AuthContext);

    
    const [menuIsOpen , setMenuIsOpen] = useState(false); 
    
    const toggleMenu = () => setMenuIsOpen(prev => !prev);
    const closeMenu = () => setMenuIsOpen(false);

    return(
        <div className=" w-full flex items-center justify-center h-16 bg-slate-200 drop-shadow mb-4 ">

            <div className="w-full max-w-6xl relative">
                <header
                className="relative w-full max-w-6xl flex items-center justify-between gap-16 px-2"
                >
                    <Link to='/'>
                        <h1 className="text-white text-xl bg-red-500 p-2 rounded-lg">Book Collection</h1>
                    </Link>
                    <div
                    className="hidden flex-1 md:flex items-center gap-2 rounded-lg bg-slate-300 px-2"
                    >
                        <FaSearch size={24} color="#000"/>
                        <input
                        className="w-full h-10 py-4 px-2 text-zinc-600 bg-transparent outline-none"
                        type="text"
                        placeholder="Find your favorite book"
                        />
                    </div>
                    <nav className="flex items-center gap-5">
                
                    {
                        !loadingAuth && !signed &&  (
                        <Link to='/login'>
                            Login
                        </Link>
                        )
                    }

                    {
                       !loadingAuth && signed && (
                          
                               <button onClick={toggleMenu}>
                                   <FiUser size={24} color="#000"/>
                               </button>
                         
                         
                        )
                    }
                
                    </nav>
                
                </header>
                    <UserMenu
                    menuIsOpen={menuIsOpen}
                    closeMenu={closeMenu}
                    />
            </div>

        </div>
    )
}