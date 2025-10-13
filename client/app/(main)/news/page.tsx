"use client";

import { useEffect, useState } from "react";
// components
import NewsHeader from "@/components/main/NewsHeader";
import SubscriptionCTA from "@/components/main/SubscriptionCTA";
import ArticleCard from "@/components/main/ArticleCard";
// types
import { Article, ArticlesResponse } from "../../../types/articles";

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);

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
    <div className="w-full min-h-screen bg-white py-12 mt-20">
      <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        <NewsHeader />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-20">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        <SubscriptionCTA />
      </div>
    </div>
  );
}
