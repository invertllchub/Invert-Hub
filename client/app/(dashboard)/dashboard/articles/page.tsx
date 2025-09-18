"use client"
import React, { useState, useEffect, useRef } from "react";
import ToolBar from "@/components/dashboard/ToolBar";
import DeleteBtn from "@/components/dashboard/DeleteBtn";
import { SquarePen } from "lucide-react";
import Link from "next/link";

interface Article {
    id: number
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

  // fetch data
    const fetchData = async () => {
        try {
            const res = await fetch("/articles.json");
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
        if (allSelected) {
            setSelected([]);
        } else {
            setSelected(articles.map((_, i) => i));
        }
    };

    const toggleOne = (i: number) => {
        setSelected((prev) =>
            prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
        );
    };

    const handleDeleteOne = (i: number) => {
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
        <div className="w-full h-[200vh] bg-gray-200/75 pl-30 pr-15 py-10">
            <div>
                <ToolBar
                handleDeleteAll={handleDeleteAll}
                allSelected={allSelected}
                someSelected={someSelected}
                setSearchValue={setSearchValue}
                title={"Articles"}
                />
            </div>
            <div className="w-full h-full mt-10 rounded-lg bg-white p-8">
                <div className="grid grid-cols-[50px_250px_150px_150px_150px_200px] gap-8 mb-3">
                    <div className="h-[40px] flex items-center justify-center">
                        <input
                        type="checkbox"
                        ref={headerCheckboxRef}
                        checked={allSelected}
                        onChange={toggleAll}
                        className="w-4 h-4 cursor-pointer accent-blue-700"
                        />
                    </div>
                    <div className="h-[40px] flex items-center">Name</div>
                    <div className="h-[40px] flex items-center">Author</div>
                    <div className="h-[40px] flex items-center">Date</div>
                    <div className="h-[40px] flex items-center justify-center">Edit</div>
                </div>
                <hr />

                {/* Table Rows */}
                {filteredArticles.map((article, i) => {
                    const titleBlock = article.blocks.find((b) => b.type === "header");
                    const title = titleBlock?.data.text || "Untitled";
                    const date = new Date(article.time).toLocaleDateString();
                    return (
                        <div
                        key={i}
                        className="grid grid-cols-[50px_250px_150px_150px_150px_200px] gap-8 py-3 border-b last:border-b-0 text-gray-600"
                        >
                            <div className="flex items-center justify-center">
                                <input
                                type="checkbox"
                                checked={selected.includes(i)}
                                onChange={() => toggleOne(i)}
                                className="w-4 h-4 cursor-pointer accent-blue-700"
                                />
                            </div>
                            <div className="flex items-center">{title}</div>
                            <div className="flex items-center">{article.author || "N/A"}</div>
                            <div className="flex items-center">{date}</div>
                            <div className="flex items-center justify-center gap-5">
                                <DeleteBtn handleDeleteOne={() => handleDeleteOne(i)} />
                                <Link href={`/dashboard/articles/${article.id}/edit`}>
                                    <div 
                                    title="update" 
                                    className='cursor-pointer hover:bg-gray-200 p-2 rounded-full'
                                    >
                                        <SquarePen size={20}/>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Page;
