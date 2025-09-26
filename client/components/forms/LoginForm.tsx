import Link from 'next/link'
import React from 'react'

function LoginForm() {
    return (
        <form
        className="flex flex-col gap-4 w-80 mx-auto p-4"
        >
            <label htmlFor="email">Email</label>
            <input 
            id='email'
            type="email"
            placeholder='Enter Your Email..'
            className='border border-gray-500 outline-0 px-4 py-2 rounded-md'
            />
            <label htmlFor="password">Password</label>
            <input 
            id='password'
            type="password"
            placeholder='Enter Your Password..'
            className='border border-gray-500 outline-0 px-4 py-2 rounded-md'
            />
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
