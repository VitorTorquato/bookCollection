import { Container } from "../../../components/container";
import { Input } from "../../../components/input";


import {useForm} from 'react-hook-form';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
    title: z.string().min(5,'title is required'),
    author: z.string().min(1, 'author is required'),
    gender: z.enum([
        'Fiction',
        'Romance',
        'Adventure',
        'Mystery',
        'Fantasy',
        'Science Fiction',
        'Horror',
        'Historical Fiction',
        'Thriller',
        'Biography/Autobiography',
        'Memoir',
        'Self-Help',
        'Science',
        'History',
        'Religion/Spirituality',
        'Politics',
        'Poetry',
        'Young Adult (YA)',
        'Children’s Literature'
    ], { 
        required_error: 'Genre is required' 
    }),
    rating: z.string().min(1, 'rate your book'),
    description: z.string().min(20,'description is required')
})

type FormData = z.infer<typeof schema>

import {FiUpload} from 'react-icons/fi'
export function NewBook(){


   
 
        const {register,handleSubmit, formState:{errors}} = useForm<FormData>({
            resolver:zodResolver(schema),
            mode:'onChange'
        })

    return(
        <Container>

            <form className="w-full mt-16">

                <div className="mb-3">
                    <p>Title</p>
                    <Input
                    type="text"
                    register={register}
                    name='title'
                    placeholder="Book title"
                    error={errors.title?.message}
                    />
                </div>

                <div className="flex -w-full mb-3 flex-col  md:flex-row  justify-between gap-4">

                <div
                className="w-full"
                >
                    <p>Author</p>
                    <Input
                    type="text"
                    register={register}
                    name='author'
                    placeholder="author name"
                    error={errors.author?.message}
                    />
                </div>

               

                <div
                className="w-full md:w-48"
                >
                    <p>Gender</p>
                    <select 
                    className="mb-3 w-full border-2 rounded-md h-11 p-2 text-sm"
                    {...register('gender')}
                    defaultValue=''
                    >

                        <option value="" disabled>Select one option</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Romance">Romance</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Science Fiction">Science Fiction</option>
                        <option value="Horror">Horror</option>
                        <option value="Historical Fiction">Historical Fiction</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Biography/Autobiography">Biography/Autobiography</option>
                        <option value="Memoir">Memoir</option>
                        <option value="Self-Help">Self-Help</option>
                        <option value="Science">Science</option>
                        <option value="History">History</option>
                        <option value="Religion/Spirituality">Religion/Spirituality</option>
                        <option value="Politics">Politics</option>
                        <option value="Poetry">Poetry</option>
                        <option value="Young Adult (YA)">Young Adult (YA)</option>
                        <option value="Children’s Literature">Children’s Literature</option>
                    
                    {errors.gender && <p className="text-red-500">{errors.gender?.message}</p>}
                    </select>
                </div>

                <div
                className="w-full md:w-16"
                >
                    <p>Rate</p>
                    <Input
                    type="number"
                    register={register}
                    name='rating'
                    placeholder="0"
                    min={1}
                    max={5}
                    error={errors.author?.message}
                    />
                </div>
             

                

                </div>

                <div>
                    <p>Description</p>

                    <textarea
                    className="border-2 w-full rounded-md h-24 px-2 mb-3"
                    {...register('description')}
                    name="description"
                    id="description"
                    placeholder="Describe some details of this book"
                    />
                </div>

                
               

                <div className="w-full flex flex-col items-center md:flex-row gap-4">


                    <button
                    className="border-2 w-full rounded-lg flex items-center justify-center cursor-pointer py-2 md:w-48"
                    >
                        <div
                        className="absolute flex gap-1 font-medium cursor-pointer"
                        >
                            <span>Select an image</span>
                            <FiUpload size={24} color="#000"/>
                        </div>
                        <div>
                            <input
                            className="opacity-0 cursor-pointer"
                             type="file"
                             accept="image"
                             />
                        </div>
                    </button>
                    
                    <button
                    type="submit"
                    className="w-full h-12 rounded-md bg-red-500 font-medium text-white"
                    >
                        Upload
                    </button>
                </div>

            </form>
           
           
        </Container>
    )
}