"use client";

import { useEffect, useState } from "react";
// components
import NewsHeader from "@/components/main/NewsPage/NewsHeader";
import ArticleCard from "@/components/main/NewsPage/ArticleCard";
// types
import { Article, ArticlesResponse } from "../../../types/articles";
import SubscribeForm from "@/components/main/NewsPage/SubscribeForm";

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
          {articles.map((article, i) => (
            <div key={i}>
              <ArticleCard key={article.id} article={article} />
            </div>
          ))}
        </div>

        <div className="text-center py-12 border-t border-gray-200 bg-gray-50 rounded-xl px-6">
          <div className="mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Stay updated with our insights
            </h3>
            <p className="text-gray-600 mb-6 font-light">
              Join our newsletter to receive future stories, insights, and
              opportunities directly in your inbox.
            </p>
          </div>
          <div>
            <SubscribeForm />
          </div>
          <p className="mt-4 text-gray-500 text-sm font-light">
            — Get INVERT's perspectives delivered monthly
          </p>
        </div>
      </div>
    </div>
  );
}
