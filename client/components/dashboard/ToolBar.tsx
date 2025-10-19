import React from 'react'
import { Search } from 'lucide-react'
import Link from 'next/link';

type ToolBarProps = {
  allSelected: boolean;
  someSelected: boolean;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  children?: React.ReactNode;   
};

function ToolBar({ allSelected, someSelected, setSearchValue, title, children }: ToolBarProps) {
  return (
    <div className='w-full flex items-center justify-between gap-6 p-6 md:p-0'>
      <div className='w-full md:w-10/12 flex items-center justify-start gap-6'>
        <div className='w-full md:w-4/12 relative bg-white rounded-lg'>
          <input
            type="text"
            placeholder='Search'
            className="w-full px-10 py-3.5 md:py-2 outline-none "
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className='absolute top-1/2 -translate-y-1/2 left-2'>
            <Search size={20} />
          </div>
        </div>

        <div className={`${allSelected || someSelected ? "visible" : "invisible"}`}>
          {children}
        </div>
      </div>

      <div className='px-1 md:px-4 py-1 md:py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white cursor-pointer'>
        <Link href={`/dashboard/${title.toLowerCase()}/add`}>
          <button className='cursor-pointer'>
            + Add <span>{title}</span>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default ToolBar
