import {VscStarFull, VscStarEmpty} from 'react-icons/vsc'


interface RatingProps{
    grade:number;
    isBigSize:boolean;

 }

export function Rating({grade , isBigSize = false} : RatingProps) {

    const stars = [];
    const starSize = isBigSize ? '30' : '20';

    for(let i = 1; i <= 5 ; i++){
        if(i <= grade){
            stars.push(<VscStarFull key={i} size={starSize} color='#ef4444'/>)
        }else{
            stars.push(<VscStarEmpty key={i} size={starSize} color='#ef4444'/>)
        }
    }

    return <div className='flex'>{stars}</div>
    
}