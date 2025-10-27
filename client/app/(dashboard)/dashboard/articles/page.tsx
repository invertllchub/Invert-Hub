"use client";
import React, { useState, useEffect, useRef } from "react";
import ToolBar from "@/components/dashboard/ToolBar";
import DeleteBtn from "@/components/dashboard/DeleteBtn";
import UpdateBtn from "@/components/dashboard/UpdateBtn";

interface Article {
  id: string;
  time: number;
  blocks: {
    type: string;
    data: {
      text: string;
      level: number;
    };
  }[];
  version: string;
  author?: string;
}

function Page() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const headerCheckboxRef = useRef<HTMLInputElement>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("https://localhost:7253/api/Articles");
      const json = await res.json();
      setArticles(json.articles);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const allSelected = selected.length === articles.length && articles.length > 0;
  const someSelected = selected.length > 0 && !allSelected;

  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = someSelected;
    }
  }, [someSelected]);

  const toggleAll = () => {
    setSelected(allSelected ? [] : articles.map((_, i) => i));
  };

  const toggleOne = (i: number) => {
    setSelected((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  const handleDeleteOne = (i: number | string) => {
    setArticles((prev) => prev.filter((_, index) => index !== i));
  };

  const handleDeleteAll = () => {
    setArticles((prev) => prev.filter((_, i) => !selected.includes(i)));
    setSelected([]);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const filteredArticles = articles.filter((article) => {
    if (!searchValue) return true;
    const search = searchValue.toLowerCase();
    const titleBlock = article.blocks.find((b) => b.type === "header");

    const title = titleBlock?.data.text.toLowerCase() || "";
    const author = article.author?.toLowerCase() || "";
    const date = formatDate(article.time).toLowerCase();

    return title.includes(search) || author.includes(search) || date.includes(search);
  });

  return (
    <div className="w-full min-h-screen bg-gray-200/75 pl-0 md:pl-30 pr-0 md:pr-15 pb-20 md:pb-10 pt-5 md:pt-10 overflow-hidden">
      <ToolBar
      title="articles"
      allSelected={allSelected}
      someSelected={someSelected}
      setSearchValue={setSearchValue}
      >
        <DeleteBtn selectedIds={selected} onDeleted={handleDeleteAll} page={'articles'}/>
      </ToolBar>

      {/* 🖥️ TABLE VIEW */}
      <div className="hidden md:block w-full mt-8 rounded-lg bg-white p-12 shadow-sm overflow-x-auto">
        <div className="grid grid-cols-[50px_1fr_200px_200px_200px] gap-8 mb-3 font-semibold text-gray-700 border-b pb-2">
          <div className="flex justify-center">
            <input
              type="checkbox"
              ref={headerCheckboxRef}
              checked={allSelected}
              onChange={toggleAll}
              className="w-4 h-4 cursor-pointer accent-blue-700"
            />
          </div>
          <div>Title</div>
          <div>Author</div>
          <div>Date</div>
          <div className="text-center">Actions</div>
        </div>

        {filteredArticles.map((article, i) => {
          const titleBlock = article.blocks.find((b) => b.type === "header");
          const title = titleBlock?.data.text || "Untitled";
          const date = formatDate(article.time);
          return (
            <div
              key={i}
              className={`grid grid-cols-[50px_1fr_200px_200px_200px] gap-8 py-3 border-b text-gray-600 hover:bg-gray-50 transition-all duration-150 ${
                selected.includes(i) ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex justify-center">
                <input
                  type="checkbox"
                  checked={selected.includes(i)}
                  onChange={() => toggleOne(i)}
                  className="w-4 h-4 cursor-pointer accent-blue-700"
                />
              </div>
              <div className="flex items-center font-medium">{title}</div>
              <div className="flex items-center">{article.author || "N/A"}</div>
              <div className="flex items-center">{date}</div>
              <div className="flex justify-center gap-4">
                <DeleteBtn page={'articles'} id={article.id} onDeleted={() => handleDeleteOne(article.id)} />
                <UpdateBtn page="articles" id={article.id} />
              </div>
            </div>
          );
        })}

        {filteredArticles.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No articles found.
          </div>
        )}
      </div>

      {/* 📱 CARD VIEW */}
      <div className="block md:hidden mt-6 p-6 space-y-4">
        {filteredArticles.map((article, i) => {
          const titleBlock = article.blocks.find((b) => b.type === "header");
          const title = titleBlock?.data.text || "Untitled";
          const date = formatDate(article.time);

          return (
            <div
              key={i}
              className={`relative bg-white p-5 rounded-xl shadow-sm border transition-all duration-200 ${
                selected.includes(i) ? "border-blue-500" : "border-gray-200"
              }`}
            >
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={selected.includes(i)}
                onChange={() => toggleOne(i)}
                className="absolute top-4 left-4 w-4 h-4 accent-blue-700 cursor-pointer"
              />

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 pl-6 mb-1">
                {title}
              </h3>

              {/* Author + Date */}
              <p className="text-sm text-gray-500 pl-6 mb-3">
                {article.author || "N/A"} • {date}
              </p>

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <DeleteBtn page={'articles'} id={article.id} onDeleted={() => handleDeleteOne(article.id)} />
                <UpdateBtn page="articles" id={article.id} />
              </div>
            </div>
          );
        })}

        {filteredArticles.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No articles found.
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
