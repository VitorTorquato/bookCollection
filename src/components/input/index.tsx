import { RegisterOptions, UseFormRegister } from "react-hook-form"

interface InputProps{
    type:string;
    placeholder:string;
    name:string;
    error?:string;
    register:UseFormRegister<any>;
    rules?:RegisterOptions;
}

export function Input({name,type,placeholder,register,rules,error}:InputProps){
    return(
        <div>
            <input 
                className="w-full border-2 rounded-md h-11 px-2"
                type={type}
                placeholder={placeholder}
                {...register(name,rules)}
                id={name}

            />

            {error && <p>{error}</p>}
        </div>
    )
}