import { FaHeart ,FaSearch} from "react-icons/fa";
import { FiLogIn , FiUser} from "react-icons/fi";
import { Link } from "react-router-dom";

export function Header(){

    const signed = true;

    return(
        <div className="w-full flex items-center justify-center h-16 bg-slate-200 drop-shadow mb-4 px-1">

            <header 
            className="w-full max-w-6xl flex items-center justify-between gap-16"
            >
                <Link to='/'>
                    <h1 className="text-white text-xl bg-red-500 p-2 rounded-lg">BookCollection</h1>
                </Link>

                <div
                className="flex-1 flex items-center gap-2 rounded-lg bg-slate-300 px-2"
                >
                    <FaSearch size={24} color="#000"/>
                    <input
                    className="w-full h-10 py-4 px-2 text-zinc-600 bg-transparent outline-none"
                    type="text"
                    placeholder="Find your favorite book"
                    />
                </div>

                <nav className="flex items-center gap-5">

                <Link
                className="relative flex gap-1 items-center p-2 rounded-lg bg-red-500 text-white font-medium"
                to='/favorites'>
                        Favorites
                     <FaHeart size={16} color="#FFF"/>
                </Link>

                {
                    !signed && (

                    <Link to='/login'>
                        <FiLogIn size={24} color="#000"/>
                    </Link>    
                    )
                }

                {
                    signed && (
                        <Link to='/login'>
                        <FiUser size={24} color="#000"/>
                    </Link>  
                    )
                }

              

                </nav>

            </header>
        </div>
    )
}