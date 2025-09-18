"use client";

import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/dashboard/Editor"), {
  ssr: false,
});

export default function AddArticlePage() {
  return (
    <div className="pl-15">
      <Editor />
    </div>
  );
}
