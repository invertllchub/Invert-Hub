"use client"

import { useEffect, useRef } from "react";
// Editor.js & Editor tools
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Embed from "@editorjs/embed";
import VideoTool from "@/utils/editorTools/VideoTool";
import LinkTool from "@/utils/editorTools/LinkTool";
import OverviewTool from "@/utils/editorTools/OverViewTool";
// id generator
import { v4 as uuidv4 } from "uuid";
// Upload to Cloudinary fn()
import { uploadToCloudinary } from "@/utils/CloudinaryUpload";


export default function Editor() {
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
            config: {
              placeholder: "Enter a heading",
              levels: [1, 2, 3, 4, 5, 6],
              defaultLevel: 1,
            },
          },
          overview: OverviewTool,
          link: LinkTool,
          list: List,
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const url = await uploadToCloudinary(file, "image");
                  return {
                    success: 1,
                    file: { url },
                  };
                },
              },
            },
          },
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
                vimeo: true,
                facebook: true,
              },
            },
          },
          video: VideoTool,
        },
      });
    }

    return () => {
      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  const handleSave = async () => {
    const outputData = await editorRef.current?.save();

    
    const articleWithId = {
      id: uuidv4(),   // 👈 توليد id
      ...outputData,
      author: "Mohamed", // ممكن تضيف أي بيانات إضافية
    };
  
    console.log("✅ Article with ID:", articleWithId);
  };

  return (
    <div className="p-12 w-full bg-gray-400/30">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-4xl font-extrabold text-gray-800">
          PUBLISH YOUR ARTICLE
        </h1>
        <button
          onClick={handleSave}
          className="mt-4 px-6 py-2 bg-gray-800 hover:bg-gray-600 text-white rounded cursor-pointer"
        >
          Publish
        </button>
      </div>

      <div className="rounded-lg shadow-md py-6 min-h-[100vh] px-4 mt-10 bg-white">
        <div id="editorjs" />
      </div>
    </div>
  );
}
