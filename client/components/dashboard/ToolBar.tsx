import React from 'react'
import { Search, Trash2 } from 'lucide-react'
import Link from 'next/link';

type DeleteBtnProps = {
  handleDeleteAll: () => void;
  allSelected: boolean;
  someSelected: boolean;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  title: string
};


function ToolBar({handleDeleteAll, allSelected, someSelected, setSearchValue, title}: DeleteBtnProps) {
    return (
        <div className='w-full flex items-center justify-between'>
            <div className='w-10/12 flex items-center justify-start gap-6'>
                <div className='w-4/12 relative bg-white rounded-lg'>
                    <input 
                    type="text" 
                    placeholder='Search' 
                    className="w-full px-10 py-2 outline-none "
                    onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <div className='absolute top-1/2 -translate-y-1/2 left-2'>
                        <Search size={20}/>
                    </div>
                </div>
                <div
                    title="delete"
                    className={`cursor-pointer hover:bg-white p-2 rounded-full
                        ${allSelected || someSelected ? "visible" : "invisible"}`}
                    onClick={() => handleDeleteAll()}
                    >
                        <Trash2 size={20}/>
                </div>
            </div>
            <div className='px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white cursor-pointer'>
                <Link href={`/dashboard/${title.toLocaleLowerCase()}/add`}>
                    <button className='cursor-pointer'>
                    + Add <span>{title}</span>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default ToolBar
