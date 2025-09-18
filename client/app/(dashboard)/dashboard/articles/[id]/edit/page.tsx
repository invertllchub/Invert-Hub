"use client"

import dynamic from "next/dynamic";

const EditArticlePage = dynamic(() => import("@/components/dashboard/EditArticlePage"), {
  ssr: false,
});
import React from 'react'

function page() {
  return (
    <div className='pl-30'>
      <EditArticlePage />
    </div>
  )
}

export default page
