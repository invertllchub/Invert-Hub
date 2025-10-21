"use client"
import Link from 'next/link'
import React from 'react'
// React-hook-form and validation with Zod
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from '../schemas/SignupSchema';
import { FormFields } from '../schemas/SignupSchema';
// Toast
import { showToast } from "@/components/jobs/Toast";
function SignupForm() {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<FormFields>({
        resolver: zodResolver(SignupSchema)
    })

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        const toastId = showToast("loading", {
            message: "Please wait a few seconds to login...",
        });

        try {
            const response = await fetch("", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                showToast("error", {
                    message: result.message || "Login failed!",
                    toastId,
                });
                return;
            }

            showToast("success", {
                message: "Login has been done successfully!",
                toastId,
            });

            reset();
        } catch (error) {
            console.error(error);
            showToast("error", {
                message: "Failed to login, please try again later.",
                toastId,
            });
        }
    };

    return (
        <form
        className="flex flex-col gap-4 w-full mx-auto px-4"
        onSubmit={handleSubmit(onSubmit)}
        >
            <div className="w-full flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2 flex flex-col gap-1.5">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        type="text"
                        { ...register("firstName")}
                        placeholder="Enter Your First Name.."
                        className="border border-gray-500 outline-0 px-4 py-2 rounded-md w-full"
                    />
                    {errors.firstName && (
                        <div className='text-red-600'>{errors.firstName.message}</div>
                    )}
                </div>
                <div className="w-full md:w-1/2 flex flex-col gap-1.5">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        id="lastName"
                        type="text"
                        { ...register("lastName")}
                        placeholder="Enter Your Second Name.."
                        className="border border-gray-500 outline-0 px-4 py-2 rounded-md w-full"
                    />
                    {errors.lastName && (
                        <div className='text-red-600'>{errors.lastName.message}</div>
                    )}
                </div>
            </div>
            <div className="w-full flex flex-col gap-1.5">
                <label htmlFor="email">Email</label>
                <input 
                id='email'
                type="email"
                { ...register("email")}
                placeholder='Enter Your Email..'
                className='border border-gray-500 outline-0 px-4 py-2 rounded-md'
                />
                {errors.email && (
                    <div className='text-red-600'>{errors.email.message}</div>
                )}
            </div>
            <div className="w-full flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2 flex flex-col gap-1.5">
                    <label htmlFor="password">Password</label>
                    <input 
                    id='password'
                    type="password"
                    { ...register("password")}
                    placeholder='Enter Your Password..'
                    className='border border-gray-500 outline-0 px-4 py-2 rounded-md w-full'
                    />
                    {errors.password && (
                        <div className='text-red-600'>{errors.password.message}</div>
                    )}
                </div>
                <div className="w-full md:w-1/2 flex flex-col gap-1.5">
                    <label htmlFor="confirmedPassword">Confirm Password</label>
                    <input 
                    id='confirmedPassword'
                    type="password"
                    { ...register("confirmedPassword")}
                    placeholder='Confirm Your Password..'
                    className='border border-gray-500 outline-0 px-4 py-2 rounded-md w-full'
                    />
                    {errors.confirmedPassword && (
                        <div className='text-red-600'>{errors.confirmedPassword.message}</div>
                    )}
                </div>
            </div>
            <div className="w-full flex flex-col gap-1.5">
                <label htmlFor="phone">Phone Number</label>
                <input
                    id="phone"
                    type="tel"
                    { ...register("phoneNumber")}
                    placeholder="Enter Your Phone Number.."
                    className="border border-gray-500 outline-0 px-4 py-2 rounded-md"
                />
                {errors.phoneNumber && (
                    <div className='text-red-600'>{errors.phoneNumber.message}</div>
                )}
            </div>

            <button 
            type='submit'
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md 
            hover:bg-blue-700 hover:shadow-lg cursor-pointer mt-4
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
            transition duration-200"
            >
                Signup
            </button>
            <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/Login" className="text-blue-600 font-medium hover:underline">
                    Login 
                </Link>
            </p>
        </form>
    )
}

export default SignupForm
