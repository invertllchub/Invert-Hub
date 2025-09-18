"use client"
import React, { ChangeEvent } from "react";
import { Project } from "@/app/(main)/types/project";

interface ArticlesProps {
  project: Project;
  setProject: React.Dispatch<React.SetStateAction<Project>>;
}

function Articles({ project, setProject }: ArticlesProps) {

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const type = file.type.startsWith("image") ? "image" : "video";

    const newArticles = [...project.articles];
    newArticles[index] = {
      ...newArticles[index],
      type,
      media: url,
    };

    // لو الكارد الأخير اتملأ → ضيف كارد جديد فاضي
    if (index === project.articles.length - 1) {
      newArticles.push({ title: "", content: "", type: "", media: "" });
    }

    setProject((prev) => ({
      ...prev,
      articles: newArticles,
    }));
  };

  const handleContentChange = (value: string, index: number) => {
    const newArticles = [...project.articles];
    newArticles[index] = {
      ...newArticles[index],
      content: value,
    };

    // لو الكارد الأخير اتملأ → ضيف كارد جديد فاضي
    if (index === project.articles.length - 1 && value.trim() !== "") {
      newArticles.push({ title: "", content: "", type: "", media: "" });
    }

    setProject((prev) => ({
      ...prev,
      articles: newArticles,
    }));
  };

  const handleTitleChange = (value: string, index: number) => {
    const newArticles = [...project.articles];
    newArticles[index] = {
      ...newArticles[index],
      title: value,
    };

    // لو الكارد الأخير اتملأ → ضيف كارد جديد فاضي
    if (index === project.articles.length - 1 && value.trim() !== "") {
      newArticles.push({ title: "", content: "", type: "", media: "" });
    }

    setProject((prev) => ({
      ...prev,
      articles: newArticles,
    }));
  };


  const handleRemoveMedia = (index: number) => {
    let newArticles = [...project.articles];
    newArticles[index] = {
      ...newArticles[index],
      type: "",
      media: "",
  };

  // لو الكارد كله بقى فاضي ومش آخر واحد → احذفه
  if (
    newArticles[index].title.trim() === "" &&
    newArticles[index].content.trim() === "" &&
    index !== newArticles.length - 1
  ) {
    newArticles.splice(index, 1);
  }

  setProject((prev) => ({
    ...prev,
    articles: newArticles,
  }));
  };

  return (
    <div className="w-full p-8 bg-gray-200 rounded-lg mt-10 space-y-10">
      <h1 className="text-2xl font-bold mb-4 col-span-2">Articles</h1>

      {project.articles.map((article, i) => (
        <div
          key={i}
          className="p-4 rounded-lg shadow-md space-y-3"
        >
        {/* Input لاختيار صورة/فيديو */}
        {!article.media && (
        <div className="w-full">
          <input
            type="file"
            id={`file-${i}`}
            accept="image/*,video/*"
            onChange={(e) => handleFileChange(e, i)}
            className="hidden"
          />
        
          <label
            htmlFor={`file-${i}`}
            className="relative w-full h-[200px] border-2 border-dashed border-gray-400 rounded-md p-4 
            text-center cursor-pointer flex items-center justify-center"
          >
            <p className="text-gray-500">Drag Image or Video</p>
          </label>
        </div>
        )}
          
        <div className="relative w-full">
          {article.type === "image" && article.media && (
            <img
              src={article.media}
              alt={article.title}
              className="w-full rounded-lg"
            />
          )}
          {article.type === "video" && article.media && (
            <video controls className="w-full rounded-lg">
              <source src={article.media} type="video/mp4" />
            </video>
          )}

          {article.media && (
            <button
              type="button"
              onClick={() => handleRemoveMedia(i)}
              className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-8 h-8 flex 
              items-center justify-center hover:bg-red-600 transition"
            >
              ✕
            </button>
          )}
        </div>

          {/* Textarea لكتابة المحتوى */}
          <input 
          type="text" 
          value={article.title}
          onChange={(e) => handleTitleChange(e.target.value, i)}
          placeholder="Write the title here..."
          className="w-full rounded-md p-4 text-sm mt-4 bg-white/40"
          />
          <textarea
            value={article.content}
            onChange={(e) => handleContentChange(e.target.value, i)}
            placeholder="Write the content here..."
            className="w-full rounded-lg p-4 text-sm mt-4 bg-white/40"
          />
        </div>
      ))}
    </div>
  );
}

export default Articles;
