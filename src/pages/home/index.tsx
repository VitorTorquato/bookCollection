import { Cards } from "../../components/cards";
import { Container } from "../../components/container";

import { useEffect, useState } from "react";


import { collection, query,getDocs,orderBy,where} from 'firebase/firestore';
import {db} from '../../services/firebaseConnection'

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
    const [loadCover,setLoadCover] = useState<string[]>([])
   
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

   useEffect(() => {

        loadBooks();

   } , [])
   
    return(
        <Container>
            <main className="w-full pb-16 px-2">
                <section className="w-full">
                <h1 className="text-2xl text-black text-center mb-8">All books</h1>
                    
                    <div
                    className="w-full mt-0 mx-auto grid gap-2 grid-cols-2 md:grid-flow-col-3 lg:grid-cols-5"
                    >   
                        {
                            books.map((book) => (
                                <Cards
                                key={book.id}
                                cover={book.cover[0].url}
                                bookTitle={book.title}
                                grade={Number(book.rate)}
                                />
                            ))
                        }

                    </div>
                </section>
            </main>
        </Container>
            
        
    )
}