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
    <div className="p-12">
      <h1 className="text-2xl font-bold mb-4">Edit Article</h1>
      <div id="editorjs" className="border p-4 rounded bg-white min-h-[400px]" />
      <button
        onClick={handleSave}
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded"
      >
        Save Changes
      </button>
    </div>
  );
}
