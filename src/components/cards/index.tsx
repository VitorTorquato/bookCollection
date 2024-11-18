import { Rating } from "../rating"

interface CardsProps{
    cover:string;
    bookTitle:string;
    grade:number;
}

export function Cards({cover,bookTitle,grade}:CardsProps){
    
    
    return(
        <div className="w-full h-96 bg-white border-2 border-slate-400 p-6 flex flex-col gap-3 items-center justify-center">
            <div className="w-full h-64 flex items-center justify-center overflow-hidden">
                <img
                className="object-cover h-full"
                src={cover} alt={`${bookTitle} cover`} />
            </div>

            <strong className="h-10 font-bold text-sm text-center">{bookTitle}</strong>
            <Rating
            isBigSize
            grade={grade}
            />            
        </div>
    )
}