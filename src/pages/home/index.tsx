import {FaSearch } from "react-icons/fa";
import { Cards } from "../../components/cards";
import { Container } from "../../components/container";

import { useEffect, useState } from "react";


import { collection, query,getDocs,orderBy,where} from 'firebase/firestore';
import {db} from '../../services/firebaseConnection'
import { Link } from "react-router-dom";

interface BookProps{
    id:string;
    cover:BookCoverImg[];
    title:string;
    rate:number | string;
}

interface BookCoverImg{
    name:string;
    uid:string;
    url:string;
}

export function Home(){
    
    const [books,setBooks] = useState<BookProps[]>([]);
    const [search,setSearch] = useState('');

   
   function loadBooks(){
            const booksRef = collection(db, 'books');
            const queryRef = query(booksRef, orderBy('createdAt' , 'desc'))

            getDocs(queryRef)
            .then((snapshot) => {
                    let booksList = [] as BookProps[];

                    snapshot.forEach( doc => {
                        booksList.push({
                            id: doc.id,
                            title:doc.data().title,
                            rate:doc.data().rate,
                            cover:doc.data().cover
                        })
                    })

                    setBooks(booksList)
            })
   }

   async function handleSearchBooks(){
        if(!search){
            loadBooks();
            return;
        }

        setBooks([]);

        const q = query(collection(db, 'books'),

        where('title' , '>=' , search.toUpperCase()),
        where('title' , '<=' , search.toUpperCase() + '\uf8ff')
    )

    const querySnapshot = await getDocs(q)

    let listBooks = [] as BookProps[]

    querySnapshot.forEach(doc => {
            listBooks.push({
                id :doc.id,
                title: doc.data().title,
                cover: doc.data().cover,
                rate:doc.data().rate
            })
    })

    setBooks(listBooks)
  
        
   }

   useEffect(() => {

        loadBooks();

   } , [])


  
   
    return(
        <Container>     

                    
    

            <main className="w-full pb-16 px-2">

        
                    <div
                    className=" w-full flex max-w-3xl mx-auto lg:ml-44 xl:ml-60 items-center justify-center p-2 rounded-lg bg-slate-300 mb-9"
                    >
                        <input
                        className="w-full h-9 py-4 px-2 text-zinc-600 bg-transparent outline-none"
                        type="text"
                        placeholder="Find your favorite book"
                        onChange={(e) => setSearch(e.target.value)}
                        />
                        <button
                        onClick={handleSearchBooks}
                        >
                            <FaSearch size={24} color="#000"/>
                        </button>

                    </div>

                <section className="w-full">
                <h1 className="text-2xl text-black text-center mb-8">What people think about it:</h1>
                    
                    <div
                    className="w-full mt-0 mx-auto grid gap-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-5"
                    >   
                        {
                            books.map((book) => (
                               <Link
                               key={book.id}
                               to={`/book/details/${book.id}`}>
                                <Cards
                                cover={book.cover[0].url}
                                bookTitle={book.title}
                                grade={Number(book.rate)}
                                />
                               
                               </Link>
                            ))
                        }

                    </div>
                </section>
            </main>
        </Container>
            
        
    )
}