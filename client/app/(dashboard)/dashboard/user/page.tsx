import React from 'react'
import { Pencil } from 'lucide-react';
import Image from 'next/image';

const team = [
    {
        name: "Mohamed Tharwat", 
        jobDescription: "Front-End-Developer",
        img: "https://res.cloudinary.com/dyfregti9/image/upload/v1758550159/user-image_zfcgfe.jpg"
    },
    {
        name: "Mohamed Tharwat", 
        jobDescription: "Front-End-Developer",
        img: "https://res.cloudinary.com/dyfregti9/image/upload/v1758550159/user-image_zfcgfe.jpg"
    },
    {
        name: "Mohamed Tharwat", 
        jobDescription: "Front-End-Developer",
        img: "https://res.cloudinary.com/dyfregti9/image/upload/v1758550159/user-image_zfcgfe.jpg"
    },
    {
        name: "Mohamed Tharwat", 
        jobDescription: "Front-End-Developer",
        img: "https://res.cloudinary.com/dyfregti9/image/upload/v1758550159/user-image_zfcgfe.jpg"
    },
    {
        name: "Mohamed Tharwat", 
        jobDescription: "Front-End-Developer",
        img: "https://res.cloudinary.com/dyfregti9/image/upload/v1758550159/user-image_zfcgfe.jpg"
    },
    {
        name: "Mohamed Tharwat", 
        jobDescription: "Front-End-Developer",
        img: "https://res.cloudinary.com/dyfregti9/image/upload/v1758550159/user-image_zfcgfe.jpg"
    }
]

function page() {
    return (
        <div className='pl-15 w-full h-[100vh] bg-gray-200/75'>
            <div className='p-12 h-full'>
                <div className='w-full h-full flex flex-col gap-8'>
                    <div className='bg-white w-full h-4/12 rounded-md shadow-md flex items-center gap-8 p-6'>
                        <div className='w-6/12 flex items-center gap-12'>
                            <div  className="relative w-[100px] h-[100px] rounded-full">
                                <Image
                                alt="User Picture"
                                src={`https://res.cloudinary.com/dyfregti9/image/upload/v1757971723/samples/people/boy-snow-hoodie.jpg`}
                                fill
                                className="object-cover rounded-md"
                                />
                            </div>
                            <div>
                                <h1 className='text-xl font-bold'>Mohamed Tharwat</h1>
                                <p className='text-gray-500'>Front-End-Developer</p>
                            </div>
                        </div>
                        <span className='h-20 w-0.25 bg-black' />
                        <div className='w-6/12 grid grid-cols-2'>
                            <h1 className='text-gray-500'>Staff Id : <span className='text-black'>5404884</span></h1>
                            <h1 className='text-gray-500'>Staff Account : <span className='text-black'>mohamedTh</span></h1>
                            <h1 className='text-gray-500'>Phone Number : <span className='text-black'>01067894804</span></h1>
                            <h1 className='text-gray-500'>Email : <span className='text-black'>mthawrat@gmail.com</span></h1>
                        </div>
                    </div>
                    <div className='w-full h-8/12 flex gap-8'>
                        <div className='bg-white w-6/12 h-full rounded-md shadow-md p-8 flex flex-col gap-4'>
                            <div className='w-full flex items-center justify-between'>
                                <h1 className='text-lg text-gray-500 font-bold'>Team</h1>
                            </div>
                            <div className="border-t-1 border-gray-500"></div>
                            <div className='w-full flex items-start justify-between'>
                                    {team && 
                                        <div className='w-full h-full grid grid-cols-2 gap-4'>
                                            {team.map((mem, i) => {
                                                return (
                                                    <div key={i} className='w-full flex items-center gap-2'>
                                                        <div  className="relative w-[60px] h-[60px] rounded-full overflow-hidden">
                                                            <Image
                                                            alt="Careers picture"
                                                            src={mem.img}
                                                            fill
                                                            className="object-cover rounded-full"
                                                            />
                                                        </div>
                                                        <div>
                                                            <h1 className='text-sm font-bold'>{mem.name}</h1>
                                                            <p className='text-xs text-gray-500'>{mem.jobDescription}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    }
                            </div>
                        </div>
                        <div className='w-6/12 h-full flex flex-col gap-4'>
                            <div className='bg-white w-full h-6/12 rounded-md shadow-md flex flex-col gap-4 p-8'>
                                <div className='w-full flex items-center justify-between'>
                                    <h1 className='text-lg text-gray-500 font-bold'>Educational Infomation</h1>
                                    <Pencil size={20} className='text-gray-500 cursor-pointer'/>
                                </div>
                                <div className="border-t-1 border-gray-500"></div>
                                <div className='w-full flex items-start justify-between'>
                                    <div>
                                        <h1 className='text-lg font-bold'>Bacholre of Medicine and Sergery</h1>
                                        <p className='text-gray-500'>Mansoura University</p>
                                    </div>
                                    <span>2018 - 2024</span>
                                </div>
                            </div>
                            <div className='bg-white w-full h-6/12 rounded-md shadow-md flex flex-col gap-4 p-6'>
                                <div className='w-full flex items-center justify-between'>
                                    <h1 className='text-lg text-gray-500 font-bold'>Personal Information</h1>
                                    <Pencil size={20} className='text-gray-500 cursor-pointer'/>
                                </div>
                                <div className="border-t-1 border-gray-500"></div>
                                <div className='w-full flex items-start justify-between'>
                                    <div className='h-full grid grid-cols-2 gap-2'>
                                        <h1 className='text-gray-500'>Gender: <span className='text-black'>Male</span></h1>
                                        <h1 className='text-gray-500'>Current Adress: <span className='text-black'>Mansoura, Egypt</span></h1>
                                        <h1 className='text-gray-500'>Date of birth: <span className='text-black'>9th jul, 2001</span></h1>
                                    </div>
                                </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
