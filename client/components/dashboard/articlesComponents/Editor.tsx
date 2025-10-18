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
// Toast
import { showToast } from "@/components/jobs/Toast";
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
                  const url = await uploadToCloudinary(file);
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
    const toastId = showToast("loading", {
      message: "Publishing Article..."
    })

    
    const article = {     
      ...outputData,
      author: "Mohamed", 
    };
  
    console.log(article);

    try {
      const res = await fetch ('',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(article)
      })
      const result = await res.json()
      if(result.success){
        showToast("success", {
          message: "Succussefuly published the article",
          toastId
        })
      } else {
        showToast("error", {
          message: "Something went wrong. Please try again.",
          toastId
        })
      }
    } catch (error) {
      console.error('Fetch Error', error)
      showToast("error", {
        message: "Failed to publish the article, please try again later.",
        toastId,
      });
    }

  };

  return (
    <div className="p-12 w-full bg-gray-200/75">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-4xl font-extrabold text-gray-800">
          PUBLISH YOUR ARTICLE
        </h1>
        <button
          onClick={handleSave}
          className="px-4 w-24 py-2 bg-blue-600 text-white rounded-lg col-start-1 cursor-pointer"
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
