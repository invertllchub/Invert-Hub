import LoginForm from '@/components/forms/LoginForm'
import React from 'react'

function page() {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <div className="text-start w-80 mx-auto p-4">
                    <h1 className="text-3xl font-bold text-gray-800">Login</h1>
                    <p className="text-gray-500 mt-2">Hi, welcome back 👋</p>
                </div>
                <LoginForm />
            </div>
        </div>
    )
}

export default page
