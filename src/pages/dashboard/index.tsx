import { Container } from "../../components/container";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";

import {
    collection,
    getDocs,
    where,
    query,
    doc,
    deleteDoc
} from 'firebase/firestore';
import {ref, deleteObject} from 'firebase/storage'
import { db , storage } from "../../services/firebaseConnection";
import { Cards } from "../../components/cards";




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

export function Dashboard(){
    
    const {user} = useContext(AuthContext);
    
    const [books,setBooks] = useState<BookProps[]>([]);


    async function handleDeleteBook(book:BookProps){
        const itemBook = book;

        const docRef = doc(db, 'books' , itemBook.id)
        await deleteDoc(docRef)

        itemBook.cover.map( async (image) => {
                const imagePath = `/image/${image.uid}/${image.name}`;
                const imageRef = ref(storage, imagePath);

                try{
                    await deleteObject(imageRef)
                    setBooks(books.filter(book => book.id !== itemBook.id))
                }catch(error){
                    console.log(error);
                }
         })
    }


    useEffect(() => {

        function loadBooks(){
            if(!user?.uid){return}

            const bookRef = collection(db, 'books')
            const queryref = query(bookRef, where('uid' , '==' , user.uid))


            getDocs(queryref)
            .then((snapshot) => {
                let listBooks = [] as BookProps[] ;

                snapshot.forEach(doc => {
                    listBooks.push({
                        id: doc.id,
                        title: doc.data().title,
                        cover:doc.data().cover,
                        rate: doc.data().rate
                    })
                })

                setBooks(listBooks);
            })

        }

        loadBooks();

    } , [user] )


    return(
       <Container>
            <main  className="w-full pb-16 px-2">
                <section className="w-full mt-0 mx-auto grid gap-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
                {
                            books.map((book) => (
                                <div
                                className="relative -z-10 w-full"
                                key={book.id}
                                >
                                    <button
                                    onClick={() => handleDeleteBook(book)}
                                    className="absolute  text-sm font-medium bottom-1  right-6"
                                    >
                                    remove
                                    </button>
                                    <Cards
                                    cover={book.cover[0].url}
                                    bookTitle={book.title}
                                    grade={Number(book.rate)}
                                    />
                                </div> 
                            ))
                        }
                </section>

            </main>
       </Container>
    )
}