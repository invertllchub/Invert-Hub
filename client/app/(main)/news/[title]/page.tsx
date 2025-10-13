"use client";

import React, { useEffect, useState } from "react";
// Navigation
import { useParams } from "next/navigation";
// toSlug function
import { fromSlug } from "@/utils/FromSlug";
// components
import ArticlePage from "@/components/main/ArticlePage";
// types
import { Article, ArticlesResponse } from "../../../../types/articles";

function page() {
  const [articles, setArticles] = useState<Article[]>([]);
  const params = useParams();
  const title = fromSlug(params?.title as string);
  const article = articles.find((p) => {
    const headerBlock = p.blocks.find((b) => b.type === "header");
    return headerBlock?.data.text.toLowerCase() === title.toLowerCase();
  });

  // fetch data
  const fetchData = async () => {
    try {
      const res = await fetch("/articles.json");
      const json: ArticlesResponse = await res.json();
      setArticles(json.articles);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {article ? <ArticlePage article={article} /> : <p>Loading article...</p>}
    </div>
  );
}

export default page;
