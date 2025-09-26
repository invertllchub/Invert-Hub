import React from 'react'
import Link from 'next/link'

function SignupForm() {
    return (
        <form
        className="flex flex-col gap-4 w-full mx-auto px-4"
        >
            <div className="w-full flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2 flex flex-col gap-1.5">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        type="text"
                        placeholder="Enter Your First Name.."
                        className="border border-gray-500 outline-0 px-4 py-2 rounded-md w-full"
                    />
                </div>
                <div className="w-full md:w-1/2 flex flex-col gap-1.5">
                    <label htmlFor="secondName">Second Name</label>
                    <input
                        id="secondName"
                        type="text"
                        placeholder="Enter Your Second Name.."
                        className="border border-gray-500 outline-0 px-4 py-2 rounded-md w-full"
                    />
                </div>
            </div>
            <label htmlFor="email">Email</label>
            <input 
            id='email'
            type="email"
            placeholder='Enter Your Email..'
            className='border border-gray-500 outline-0 px-4 py-2 rounded-md'
            />
            <div className="w-full flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2 flex flex-col gap-1.5">
                    <label htmlFor="password">Password</label>
                    <input 
                    id='password'
                    type="password"
                    placeholder='Enter Your Password..'
                    className='border border-gray-500 outline-0 px-4 py-2 rounded-md w-full'
                    />
                </div>
                <div className="w-full md:w-1/2 flex flex-col gap-1.5">
                    <label htmlFor="confirmedPassword">Confirm Password</label>
                    <input 
                    id='confirmedPassword'
                    type="password"
                    placeholder='Confirm Your Password..'
                    className='border border-gray-500 outline-0 px-4 py-2 rounded-md w-full'
                    />
                </div>
            </div>
            <label htmlFor="phone">Phone Number</label>
            <input
                id="phone"
                type="tel"
                placeholder="Enter Your Phone Number.."
                className="border border-gray-500 outline-0 px-4 py-2 rounded-md"
            />
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
