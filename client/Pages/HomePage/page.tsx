import React from 'react'
import ScreenText from '@/Components/ScreenText'

function HomePage() {
    return (
        <>
        <div className='relative w-full h-screen overflow-hidden'>
            <video 
            src="https://videos.pexels.com/video-files/2871916/2871916-hd_1920_1080_30fps.mp4"
            autoPlay
            muted
            className='absolute top-0 left-0 w-full h-full object-cover z-0'
            />
            <ScreenText />
        </div>
        </>
    )
}

export default HomePage
