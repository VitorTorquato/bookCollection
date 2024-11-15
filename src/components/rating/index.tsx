import {VscStarFull, VscStarEmpty} from 'react-icons/vsc'


interface RatingProps{
    grade:number; }

export function Rating({grade} : RatingProps) {

    const stars = [];

    for(let i = 1; i <= 5 ; i++){
        if(i <= grade){
            stars.push(<VscStarFull size={14} color='#ef4444'/>)
        }else{
            stars.push(<VscStarEmpty size={14} color='#ef4444'/>)
        }
    }

    return <div className='flex'>{stars}</div>
    
}