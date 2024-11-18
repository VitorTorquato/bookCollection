import { Container } from "../../components/container";



import { useEffect, useState} from "react";

import { useNavigate, useParams } from "react-router-dom";

import { getDoc,doc} from 'firebase/firestore';
import { db } from "../../services/firebaseConnection";
import { Rating } from "../../components/rating";



interface BookProps{
    id:string;
    title:string;
    author:string;
    rate:number | string;
    description: string;
    cover: BookCoverImg[]
    publishedBy:string;
}

interface BookCoverImg{
    name:string;
    uid:string;
    url:string;
}
export function Details(){
    
   
    const [book,setBook] = useState<BookProps>()
    const [isBigSize, setIsBigSize] = useState<boolean>(true);
    const {id} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        function handleResize() {
            setIsBigSize(window.innerWidth > 425);
        }

       
        handleResize();

       
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        async function loadBook(){
            if(!id){return}

            const docRef = doc(db, 'books' , id)
            getDoc(docRef)
            .then((snapshot) => {
                if(!snapshot.data()){
                    navigate('/')
                }

                setBook({
                    id:snapshot.data()?.id,
                    title:snapshot.data()?.title,
                    description:snapshot.data()?.description,
                    rate:snapshot.data()?.rate,
                    cover:snapshot.data()?.cover,
                    author:snapshot.data()?.author,
                    publishedBy:snapshot.data()?.publishedBy
                })
            })

                 
        }

        loadBook();

    } , [id])
    
    return(
        <Container>
            
                {
                    book && (
                        <main className="w-full flex flex-col md:flex-row gap-5 justify-center items-center md:items-start mt-16"> 
                        <div
                            className="w-60 md:w-96 overflow-hidden bg-white border-2 border-slate-400 p-6 flex flex-col gap-3 items-center justify-center"
                            >
                                <img 
                                className="object-cover"
                                src={book.cover[0].url} alt={book.title} />
                        </div>

                        <div
                            className="w-full flex flex-col gap-6 px-2"
                        >
                            <div 
                            className="flex justify-center md:justify-start"
                            >
                                <Rating
                                    grade={Number(book.rate)}
                                    isBigSize={isBigSize}
                                />
                            </div>
                            <h1 
                            className="font-bold flex items-center gap-3"
                            >{book.title} <span className="text-sm font-light text-slate-600">by: {book.author} </span></h1>

                            <h2 className="font-medium">Opinion of: <span className="text-sm font-light">{book.publishedBy}</span></h2>
                            <p className="font-medium">{book.description} </p>

                            

                        </div>    
                     </main>
                
                    )
                    

                }


        </Container>
    )
}