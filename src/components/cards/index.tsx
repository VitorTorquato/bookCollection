import { Rating } from "../rating"

interface CardsProps{
    cover:string;
    bookTitle:string;
    grade:number;
}

export function Cards({cover,bookTitle,grade}:CardsProps){
    
    
    return(
        <div className="w-full bg-white border-2 border-slate-400 p-6 flex flex-col gap-3 items-center justify-center">
            <img 
            className="object-cover h-full"
            src={cover} alt={`${bookTitle} cover`} />

            <strong className="font-bold text-sm">{bookTitle}</strong>
            <Rating
            grade={grade}
            />            
        </div>
    )
}