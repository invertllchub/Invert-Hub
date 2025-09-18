import React from 'react'
import { Trash2 } from 'lucide-react';

type DeleteBtnProps = {
  handleDeleteOne: () => void;
};

function DeleteBtn({handleDeleteOne}: DeleteBtnProps) {

    return (
        <div
        title="delete"
        className='cursor-pointer hover:bg-gray-200 p-2 rounded-full'
        onClick={() => handleDeleteOne()}
        >
            <Trash2 size={20}/>
        </div>
    )
}

export default DeleteBtn
