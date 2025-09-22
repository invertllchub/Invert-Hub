"use client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
// Editor.js & Editor tools
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Embed from "@editorjs/embed";
import LinkTool from "@/utils/editorTools/LinkTool";
import VideoTool from "@/utils/editorTools/VideoTool";
import OverviewTool from "@/utils/editorTools/OverViewTool";

export default function EditArticlePage() {
  const { id } = useParams();
  const editorRef = useRef<EditorJS | null>(null);
  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const res = await fetch("/articles.json");
      const data = await res.json();
      const found = data.articles.find((a: any) => a.id === Number(id));
      setArticle(found);
    };
    fetchArticle();
  }, [id]);

  useEffect(() => {
    let editor: EditorJS;

    const initEditor = async () => {
      editor = new EditorJS({
        holder: "editorjs",
        data: article,
        autofocus: true,
        tools: {
          header: Header,
          list: List,
          image: ImageTool,
          embed: Embed,
          link: LinkTool,
          video: VideoTool,
          overview: OverviewTool
        },
      });
      editorRef.current = editor;
    };

    if (article && !editorRef.current) {
      initEditor();
    }

    return () => {
      if (editorRef.current && typeof editorRef.current.destroy === "function") {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [article]);

  const handleSave = async () => {
    const outputData = await editorRef.current?.save();
    console.log("Updated Article:", outputData);

    // تقدر تبعت update للـ backend هنا
    // await fetch(`/api/articles/${id}`, { method: "PUT", body: JSON.stringify(outputData) });
  };

  if (!article) return <p>Loading...</p>;

  return (
    <div className="w-full bg-gray-200/75 p-12">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-4xl font-extrabold text-gray-800">
          EDIT YOUR ARTICLE
        </h1>
        <button
          onClick={handleSave}
          className="px-4 w-42 py-2 bg-blue-600 text-white rounded-lg col-start-1 cursor-pointer"
        >
          Save Changes
        </button>
      </div>

      <div className="rounded-lg shadow-md py-6 min-h-[100vh] px-4 mt-10 bg-white w-full">
        <div id="editorjs" />
      </div>
    </div>
  );
}
