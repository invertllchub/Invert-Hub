"use client"
import React from 'react'
import Link from 'next/link'
// React-hook-form and validation with Zod
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from '../schemas/LoginSchema';
import { FormFields } from '../schemas/LoginSchema';
// Toast
import { showToast } from "@/components/jobs/Toast";

function LoginForm() {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<FormFields>({
        resolver: zodResolver(LoginSchema),
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
    
        const toastId = showToast("loading", {
            message: "Please wait seconds to login..",
        });

        try {
            const formData = new FormData();
            formData.append("userName", data.userName);
            formData.append("passwoed", data.password);

            const response = await fetch("", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                reset();
            } 

        } catch (error) {
            console.error(error);
            showToast("error", {
                message: "Failed to login",
                toastId,
            });
        }
    };

    return (
        <form
        onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-col gap-4 w-80 mx-auto p-4">
                <div className='w-full'>
                    <label htmlFor="userName">User Name</label>
                    <input 
                    id='userName'
                    type="text"
                    { ...register("userName")}
                    placeholder='Enter Your User Name..'
                    className='border border-gray-500 outline-0 px-4 py-2 rounded-md w-full my-2'
                    />
                    {errors.userName && (
                        <div className='text-red-600'>{errors.userName.message}</div>
                    )}
                </div>
                <div className='w-full'>
                    <label htmlFor="password">Password</label>
                    <input 
                    id='password'
                    type="password"
                    { ...register("password")}
                    placeholder='Enter Your Password..'
                    className='border border-gray-500 outline-0 px-4 py-2 rounded-md w-full my-2'
                    />
                    {errors.password && (
                        <div className='text-red-600'>{errors.password.message}</div>
                    )}
                </div>
            </div>
            <button 
            type='submit'
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md 
            hover:bg-blue-700 hover:shadow-lg cursor-pointer mt-4
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
            transition duration-200"
            >
                Login
            </button>
            <p className="text-sm text-gray-600">
                Not registered yet?{" "}
                <Link href="/Signup" className="text-blue-600 font-medium hover:underline">
                    Create an account  
                </Link>
            </p>
        </form>
    )
}

export default LoginForm
