import {v4 as uuidV4} from 'uuid';
import {FiTrash2} from 'react-icons/fi'
import { Container } from "../../../components/container";
import { Input } from "../../../components/input";

import { ChangeEvent, useContext , useState } from "react";
import {AuthContext} from '../../../contexts/authContext'
import { useNavigate } from 'react-router-dom';


import {
    collection, addDoc
} from 'firebase/firestore';

import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject

} from 'firebase/storage';

import {db,storage} from '../../../services/firebaseConnection'


import {useForm} from 'react-hook-form';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
    title: z.string().min(1,'title is required'),
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
    rating: z.string(),
    description: z.string().min(20,'description is required')
})

type FormData = z.infer<typeof schema>

interface CoverProps{
    uid:string;
    name:string;
    previewUrl:string;
    url:string;
}

export function NewBook(){


        const {user} = useContext(AuthContext);

        const [bookCover,setBookCover] = useState<CoverProps[]>([]);
 
        const {register,handleSubmit, formState:{errors}, reset} = useForm<FormData>({
            resolver:zodResolver(schema),
            mode:'onChange'
        })

        const navigate = useNavigate()

        function onSubmit(data:FormData){

            if(bookCover.length === 0){
                alert('Image is required')
                return;
            }else if(bookCover.length >= 2){       
                alert('You can add only on image')
                return;
            }

            const bookCoverImage = bookCover.map((book) => {
                return{
                    uid:book.uid,
                    name:book.name,
                    url:book.url
                }
            })

            addDoc(collection(db, 'books') , {
                title: data.title.toUpperCase(),
                author: data.author,
                gender : data.gender,
                rate: data.rating,
                description: data.description,
                createdAt: new Date(),
                publishedBy: user?.name,
                uid: user?.uid,
                cover:bookCoverImage,
            })
            .then(() => {   
                reset();
                setBookCover([])
                navigate('/dashboard')
            }).catch((error) => {
                console.log(error , 'something went wrong')
            })
        }



        async function handleUploadImage(image:File){
            
            if(!user?.uid){
                return;
            }

            const currentUid = user?.uid;
            const uidCover = uuidV4();

            const uploadRef = ref(storage, `image/${currentUid}/${uidCover}`)

            uploadBytes(uploadRef, image)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref).then((downloadUrl) => {
                    const imageItem = {
                        name: uidCover,
                        uid: currentUid,
                        previewUrl: URL.createObjectURL(image),
                        url:downloadUrl,
                    }

                    setBookCover((prevState) => [...prevState,imageItem])
                })
            })

        }

        async function handleFile(e: ChangeEvent<HTMLInputElement>){
            if(e.target.files && e.target.files[0]){
                const imageFile = e.target.files[0]

                if(imageFile.type === 'image/jpeg' || imageFile.type === 'image/png'){
                    await handleUploadImage(imageFile)
                }else{
                    alert('Only jpeg or png image is allowed')
                    return;
                }
                console.log(imageFile)
            }

        }

        async function handleDeleteImage(item: CoverProps){

            const imagePath = `image/${item.uid}/${item.name}`

            const imageRef = ref(storage, imagePath);

            try{
                await deleteObject(imageRef)

                setBookCover(bookCover.filter((book) => book.url !== item.url))
                console.log(bookCover)
            }catch(error){
                console.log(error)
            };

        }


    return(
        <Container>

                    <div className='w-full flex flex-col items-center md:flex-row md:items-start md:mt-9 gap-6 pb-10'>
                        {
                            bookCover &&
                            bookCover.length === 0 ? (
                                <button
                                className="border-2 w-full border-dashed  rounded-lg flex items-center justify-center cursor-pointer py-2 md:w-48 md:mt-6"
                                style={{height:'284px'}}
                                >
                                    <div
                                    className="absolute p-1 w-48 h-48 -z-50 flex flex-col items-center justify-center gap-1 text-sm cursor-pointer"
                                    >
                                        <span>Drag 'JPEG or JPG', drop some file here , or clik to select file (10 MB limit per file)</span>
                                        
                                    </div>
                                    <div>
                                        <input
                                        className="opacity-0 h-64 cursor-pointer"
                                         type="file"
                                         accept="image"
                                         onChange={handleFile}
                                         />
                                    </div>
                                </button>
                            ) : (
                                bookCover.map((item) => (
                                    <div key={item.uid}
                                    className='relative w-full h-72 overflow-hidden rounded-lg border-2 p-2 flex items-center justify-center cursor-pointer py-2 mb-9 md:w-48'
                                    >
                                        <button
                                        onClick={() => handleDeleteImage(item)}
                                        className='absolute top-2 right-2 bg-slate-100 p-1 rounded-md'
                                        >
                                            <FiTrash2 size={32} color='#ef4444'/>
                                        </button>
                                        <img
                                        className='w-full  object-cover'
                                        src={item.previewUrl} alt={item.name} />
                                    </div>
                                ))
                            )
                        }
                        
                                    <form 
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="w-full ">
                        
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
                        
                        <button
                        type="submit"
                        className="w-full h-12 rounded-md mt-9 bg-red-500 font-medium text-white"
                        >
                            Upload
                        </button>
                                    
                        
                                    </form>
                    </div>
           
           
        </Container>
    )
}