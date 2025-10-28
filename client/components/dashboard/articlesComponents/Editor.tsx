"use client"

import "../../../app/(main)/globals.css"
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
  
    try {
      const response = await fetch ('https://localhost:7253/api/Articles',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(article)
      })

      const text = await response.text();
      let parsed;
      try {
        parsed = text ? JSON.parse(text) : null;
      } catch {
        parsed = text;
      }

      if (!response.ok) {
        console.error("❌ Server returned error", response.status, parsed);
        showToast("error", {
          message: `Failed: ${response.status} ${response.statusText}`,
          toastId,
        });
        return;
      }

      if (parsed && parsed.jobId !== undefined) {
        showToast("success", {
          message: parsed.message ?? "Article Published successfully!",
          toastId,
        });
      } else {
        showToast("success", {
          message: "Article Published successfully (unexpected response shape).",
          toastId,
        });
      }
    } catch (error) {
      console.error("⚠️ Request error", error);
      showToast("error", {
        message: "Failed to submit the application, please try again later.",
        toastId,
      });
    }

  };

  return (
    <div className="p-6 md:p-12 w-full bg-gray-200/75">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800">
          PUBLISH YOUR ARTICLE
        </h1>
        <button
          onClick={handleSave}
          className="px-4 w-24 py-2 bg-blue-600 text-white rounded-lg col-start-1 cursor-pointer"
        >
          Publish
        </button>
      </div>

      <div className="rounded-lg shadow-md py-6 min-h-[100vh] px-4 mt-10 mb-15 bg-white">
        <div id="editorjs" />
      </div>
    </div>
  );
}
