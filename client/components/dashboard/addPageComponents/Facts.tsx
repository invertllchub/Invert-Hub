import React from 'react'
import { Project } from '@/app/(main)/types/project';


interface FactsProps {
  project: Project;
  setProject: React.Dispatch<React.SetStateAction<Project>>;
}

function Facts({project, setProject}: FactsProps) {
  return (
        <div className="w-12/12 bg-gray-200 p-8 rounded-lg grid grid-cols-4 gap-6 mt-10">
          <h1 className="text-2xl font-bold mb-4 col-span-4">facts</h1>

          {project.facts.map((fact, i) => (
            <div
              key={fact.id}
              className={`bg-gradient-to-r h-[60vh] flex flex-col gap-4 p-6 rounded-2xl shadow-md
                ${i % 2 === 0 ? "from-sky-200 to-sky-100" : "from-yellow-200 to-yellow-100"}
              `}
            >
              {fact.type === "text" ? (
                <>
                  <div className="h-full flex items-end gap-4">
                    <input
                      type="string"
                      value={fact.value.number}
                      onChange={(e) => {
                        const updatedFacts = [...project.facts];
                        updatedFacts[i].value.number = Number(e.target.value);
                        setProject({ ...project, facts: updatedFacts });
                      }}
                      className="w-26 text-6xl font-bold bg-transparent outline-none"
                      placeholder="0"
                    />
                    <input
                    type="text"
                    value={fact.value.label}
                    onChange={(e) => {
                      const updatedFacts = [...project.facts];
                      updatedFacts[i].value.label = e.target.value;
                      setProject({ ...project, facts: updatedFacts });
                    }}
                    className="text-6xl font-bold bg-transparent outline-none"
                    placeholder=""
                    />
                  </div>
                  <textarea
                  value={fact.text}
                  onChange={(e) => {
                    const updatedFacts = [...project.facts];
                    updatedFacts[i].text = e.target.value;
                    setProject({ ...project, facts: updatedFacts });
                  }}
                  className="w-full bg-white/40 rounded-lg p-2 outline-none font-semibold text-lg"
                  placeholder=""
                  />
                </>
              ) : fact.type === "image" ? (
                <div className="relative w-full h-full rounded-xl overflow-hidden group">
                  {fact.img ? (
                    <>
                      <img
                        src={fact.img}
                        alt="fact-img"
                        className="w-full h-full object-cover"
                      />

                      <button
                        onClick={() => {
                            const updatedFacts = [...project.facts];
                            if (updatedFacts[i].type === "image") {
                                updatedFacts[i].img = "";
                            }
                            setProject({ ...project, facts: updatedFacts });
                        }}
                        className="absolute top-2 right-2 bg-black/60 text-white rounded-full cursor-pointer 
                        w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                      >
                        ✕
                      </button>
                    </>
                    ) : (
                      <label className="w-full h-full flex flex-col items-center justify-center
                      text-gray-500 cursor-pointer">
                        Drag & drop or click
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                const updatedFacts = [...project.facts];
                                if (updatedFacts[i].type === "image") {
                                    updatedFacts[i].img = reader.result as string;
                                }
                                setProject({ ...project, facts: updatedFacts });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    )}
                  </div>
              ) : null}
            </div>
          ))}
        </div>
  )
}

export default Facts
