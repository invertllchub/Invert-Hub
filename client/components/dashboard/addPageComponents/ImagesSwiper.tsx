import React, { ChangeEvent } from 'react';
import { FileImage, X } from 'lucide-react';
import { Project } from '@/app/(main)/types/project';

interface ImagesSwiperProps {
  project: Project;
  setProject: React.Dispatch<React.SetStateAction<Project>>;
}

function ImagesSwiper({ project, setProject }: ImagesSwiperProps) {


    const handleImagesChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);

            setProject((prev) => {
                const newImages = [...(prev.images ?? Array(5).fill(null))];

                if (filesArray.length === 1) {
                    newImages[index] = filesArray[0];
                } else {
                    let insertIndex = newImages.findIndex((img) => !img);
                    if (insertIndex === -1) insertIndex = 0; 
                    filesArray.forEach((file) => {
                        while (insertIndex < 5 && newImages[insertIndex]) {
                            insertIndex++;
                        }
                        if (insertIndex < 5) {
                            newImages[insertIndex] = file;
                            insertIndex++;
                        }
                    });
                }

                return { ...prev, images: newImages };
            });
        }
    };

    const handleRemoveImage = (index: number) => {
        setProject((prev) => {
            const newImages = [...(prev.images || Array(5).fill(null))];
            newImages[index] = null;
            return { ...prev, images: newImages };
        });
    };

    const images = project.images || Array(5).fill(null);

    return (
        <div className="w-full p-8 bg-gray-200 rounded-lg mt-10 space-y-8">
            <div className="w-full h-[240px]">
                <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                id="image-upload-0"
                onChange={(e) => handleImagesChange(e, 0)}
                />
                    {images[0] ? (
                        <div className="relative w-full h-full">
                            <img
                            src={images[0] instanceof File ? URL.createObjectURL(images[0]) : images[0]}
                            alt="preview-0"
                            className="w-full h-full object-cover rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();  
                                    handleRemoveImage(0);
                                }}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                >
                                    <X size={16} />
                            </button>
                        </div>
                    ) : (
                        <label
                        htmlFor="image-upload-0"
                        className="flex flex-col items-center justify-center w-full h-full cursor-pointer 
                        border-2 border-dashed text-gray-500 border-gray-400 rounded-lg bg-gray-50 hover:bg-gray-100"
                        >
                            <FileImage size={50} />
                            <span>Main Image</span>
                        </label>
                    )}
            </div>

            <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => {
                    const index = i + 1; 
                    const img = images[index];

                    return (
                        <div key={index} className="w-full h-[100px]">
                            <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            id={`image-upload-${index}`}
                            onChange={(e) => handleImagesChange(e, index)}
                            />
                                {img ? (
                                    <div className="relative w-full h-full">
                                    <img
                                    src={img instanceof File ? URL.createObjectURL(img) : img}
                                    alt={`preview-${index}`}
                                    className="w-full h-full object-cover rounded-lg"
                                    />
                                        <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();  
                                            handleRemoveImage(index);
                                        }}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <label
                                    htmlFor={`image-upload-${index}`} 
                                    className="flex flex-col items-center justify-center w-full h-full cursor-pointer 
                                    border-2 border-dashed text-gray-500 border-gray-400 rounded-lg bg-gray-50 hover:bg-gray-100"
                                    >
                                        <FileImage size={50} />
                                        <span>Main Image</span>
                                    </label>
                                )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ImagesSwiper;
