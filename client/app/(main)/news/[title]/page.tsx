"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fromSlug } from "@/utils/FromSlug";
import ArticlePage from "@/components/main/NewsPage/ArticlePage";
import { Article, ArticlesResponse } from "../../../../types/articles";

function page() {
  const [articles, setArticles] = useState<Article[]>([]);
  const params = useParams();
  const title = fromSlug(decodeURIComponent(params?.title as string));

  const fetchData = async () => {
    try {
      const res = await fetch("https://localhost:7253/api/Articles");
      const json: ArticlesResponse = await res.json();
      setArticles(json.articles);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

const article = articles.find((p) => {
  const firstHeader = p.blocks.find((b) => b.type === "header"); 
  return firstHeader?.data.text.toLowerCase() === title.toLowerCase();
});

  return (
    <div>
      {articles.length === 0 ? (
        <p>Loading article...</p>
      ) : article ? (
        <ArticlePage article={article} />
      ) : (
        <p>Article not found</p>
      )}
    </div>
  );
}

export default page;
