import React from 'react'
import { SquarePen } from 'lucide-react';
import Link from 'next/link';
import { addProjectProps } from '@/app/(main)/types/project';


function UpdateBtn({project}: addProjectProps) {
    return (
        <Link href={`/dashboard/projects/${project.data.id}/edit`}>
            <div 
            title="update" 
            className='cursor-pointer hover:bg-gray-200 p-2 rounded-full'
            >
                <SquarePen size={20}/>
            </div>
        </Link>
    )
}

export default UpdateBtn
