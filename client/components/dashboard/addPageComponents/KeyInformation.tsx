import React from 'react'
import { Project } from '@/app/(main)/types/project';

interface KeyInfoProps {
  project: Project;
  setProject: React.Dispatch<React.SetStateAction<Project>>;
}



function KeyInformation({project, setProject}: KeyInfoProps) {

  const handleKeyInfoChange = (index: number, value: string) => {
    setProject((prev) => {
      const newKeyInfo = [...prev.keyInformation];
      newKeyInfo[index].value = value;
      return { ...prev, keyInformation: newKeyInfo };
    });
  };

  const fullWidthLabels = ["Programmes", "Sectors", "Services", "Location"];

  return (
        <div className="w-full space-y-4 grid grid-cols-2 gap-6 p-8 bg-gray-200 rounded-lg">
          <h1 className="text-2xl font-bold mb-4 col-span-2">Key information</h1>
          {project.keyInformation.map((info, index) => (
            <div 
            key={index} 
            className={fullWidthLabels.includes(info.label) ? "col-span-2" : ""}
            >
              <label className="block mb-1 font-medium">{info.label}</label>
              <input
                className="w-full border p-2 rounded mt-2"
                placeholder={info.label}
                value={info.value}
                onChange={(e) => handleKeyInfoChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
  )
}

export default KeyInformation
