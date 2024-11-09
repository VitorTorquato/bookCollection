import { Rating } from "../rating"


export function Cards(){
    
    
    return(
        <div className="w-full bg-white border-2 border-slate-400 p-6 flex flex-col gap-3 items-center justify-center">
            <img 
            className="object-cover"
            src='https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1334416842i/830502.jpg' alt="It cover" />

            <strong className="font-bold text-sm">It</strong>
            <Rating/>            
        </div>
    )
}