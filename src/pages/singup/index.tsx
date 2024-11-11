import backgroundImg from '../../assets/authImg.png'
import { Input } from '../../components/input'

import {useForm} from 'react-hook-form';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';


const schema = z.object({
    fullName: z.string().min(1, 'Name fiel is requirement'),
    email: z.string().min(1, 'E-mail field is requirement'),
    password: z.string().min(6,'Minimun 6 caracteres')
})

type FormData = z.infer<typeof schema>


export function SignUp(){

        const {register,handleSubmit, formState:{errors}} = useForm<FormData>({
            resolver:zodResolver(schema),
            mode:'onChange'
        })



        


    return(
       <div
       className="w-full h-screen flex justify-center p-2"
       > 
        <img 
        className='hidden md:block flex-1 max-w-xl'
        src={backgroundImg} alt="pile of books illustration" />

        <form 
        className='flex-1 w-full max-w-lg flex flex-col  items-center justify-center'
        >
            <h1
            className='text-slate-600 text-4xl text-center mb-4'
            >Ready to share adventures ?</h1>
            <p 
            className='text-sm text-slate-600 max-w-96 text-center mb-4'
            >Sign up to our website and start to leafing through your favorite literature today</p>

            <div className='w-full mb-3'>
                <Input
                name='full name'
                placeholder='Your name'
                type='text'
                error={errors.fullName?.message}
                register={register}
                />
            </div>

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
            >Create your account</button>

            <p>Already have an account ? <Link to='/login'className='text-slate-500'>Login</Link></p>


        </form>
       </div>
    )
}