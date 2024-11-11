import backgroundImg from '../../assets/authImg.png'
import { Input } from '../../components/input'

import {useForm} from 'react-hook-form';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link , useNavigate} from 'react-router-dom';

import {auth} from '../../services/firebaseConnection';
import {
    signInWithEmailAndPassword,
    signOut

} from 'firebase/auth'
import { useEffect } from 'react';


const schema = z.object({
    email: z.string().min(1, 'E-mail field is requirement'),
    password: z.string().min(6,'Minimun 6 caracteres')
})

type FormData = z.infer<typeof schema>


export function LogIn(){

        const {register,handleSubmit, formState:{errors}} = useForm<FormData>({
            resolver:zodResolver(schema),
            mode:'onChange'
        })

        const navigate = useNavigate()

        function onSubmit(data:FormData){
            signInWithEmailAndPassword(auth, data.email, data.password)
            .then((user) => {
                console.log(user)
                navigate('/' , {replace:true})
            }).catch(() => {
                alert('somethint went wrong')
            })
 
         }
         
         useEffect(() => {

            async function handleLogout(){
                await signOut(auth);
            }

            handleLogout();

         },[])

    return(
       <div
       className="w-full h-screen flex justify-center p-2"
       > 
      

        <form 
        onSubmit={handleSubmit(onSubmit)}
        className='flex-1 w-full max-w-lg flex flex-col  items-center justify-center'
        >
            <h1
            className='text-slate-600 text-4xl text-center mb-4'
            >Welcome Back</h1>
            <p 
            className='text-sm text-slate-600 max-w-96 text-center mb-4'
            >Please enter your details</p>

         

            <div className='w-full mb-3'>
                <Input
                name='email'
                placeholder='Email address'
                type='email'
                error={errors.email?.message}
                register={register}
                />
            </div>

            <div className='w-full mb-3'>
                <Input
                name='password'
                placeholder='Password'
                type='password'
                error={errors.password?.message}
                register={register}
                />
            </div>

            <button
            type='submit'
            className='bg-slate-200 w-full rounded-lg text-black h-10 font-medium mb-4 cursor-pointer hover:bg-slate-500 duration-300 hover:text-white'
            >Login</button>

            <p>Dont't have an account ? <Link to='/register' className='text-slate-500'>Register</Link></p>

            <Link to='/'>
                Go to home without login 
            </Link>
        </form>


        <img 
        className='hidden md:block flex-1 max-w-xl'
        src={backgroundImg} alt="pile of books illustration" />
       </div>
    )
}