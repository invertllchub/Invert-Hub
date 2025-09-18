import React from 'react'
import { Project } from '@/app/(main)/types/project';

interface DataProps {
  project: Project;
  setProject: React.Dispatch<React.SetStateAction<Project>>;
}




function Data({project, setProject}: DataProps) {

  const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-") 
    .replace(/^-+|-+$/g, "");  
}

const handleDataChange = (field: string, value: string) => {
  setProject((prev) => {
    const updatedData = {
      ...prev.data,
      [field]: value
    }

    if(field === "title") {
      updatedData.slug = generateSlug(value)
    }

    return {...prev, data: updatedData}
  })
}

  return (
        <div className="w-6/12 space-y-4 grid grid-cols-2 gap-6 p-8 bg-gray-200 rounded-lg mt-10">
          <h1 className="text-2xl font-bold mb-4 col-span-2">Data</h1>

          {Object.entries(project.data).map(([key, value]) => (
            <div
              key={key}
              className={key === "img" || key === "animatedText" || key === "overview" ? "col-span-2" : ""}
            >
              <label className="block mb-1 font-medium">{key}</label>

              {key === "overview" ? (
                <textarea
                  className="w-full border p-2 rounded h-32 mt-2"
                  placeholder={key}
                  value={value as string}
                  onChange={(e) => handleDataChange(key, e.target.value)}
                />
              ) : key === "img" ? (
                <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                e.preventDefault()
                const file = e.dataTransfer.files?.[0]
                if (file) {
                  const reader = new FileReader()
                  reader.onload = () => {
                    handleDataChange(key, reader.result as string)
                  }
                  reader.readAsDataURL(file)
                  }
                  }}
                  className="relative border-2 border-dashed border-gray-400 rounded-md p-4 text-center cursor-pointer mt-4 group min-h-[250px] flex items-center justify-center"
                  onClick={() => document.getElementById(`fileInput-${key}`)?.click()}
                >
                <input
                type="file"
                accept="image/*"
                className="hidden"
                id={`fileInput-${key}`}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const reader = new FileReader()
                    reader.onload = () => {
                      handleDataChange(key, reader.result as string)
                    }
                    reader.readAsDataURL(file)
                  }
                }}
                />

                {!value ? (
                  <p className="text-gray-600">Drag & drop image here or click to upload</p>
                ) : (
                <>
                  <img
                    src={value as string}
                    alt="uploaded-img"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation() 
                      handleDataChange(key, "")
                    }}
                    className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-8 h-8 flex 
                    items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
                  >
                    ✕
                  </button>
                </>
              )}
              </div>
              ) : (
                <input
                  className="w-full border p-2 rounded mt-2"
                  placeholder={key}
                  value={value as string}
                  onChange={(e) => handleDataChange(key, e.target.value)}
                  disabled={key === "slug"}
                />
              )}
            </div>
          ))}
        </div>

  )
}

export default Data
