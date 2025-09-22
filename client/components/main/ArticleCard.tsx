import Image from "next/image";
import Link from "next/link";
// toSlug Function
import { toSlug } from "@/utils/ToSlug";
// types
import { Article, Block } from "@/app/(main)/types/articles";


const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {

  const header = article.blocks.find((b) => b.type === "header")?.data?.text;
  const image = article.blocks.find((b) => b.type === "image")?.data?.file?.url;
  const paragraph = article.blocks.find((b) => b.type === "overview")?.data?.text;
  const slug = toSlug(header)

  return (
    <article className="group bg-white rounded-lg overflow-hidden border border-gray-100 hover:border-gray-300 transition-all duration-300">
      {image && (
        <div className="relative h-60 overflow-hidden">
          <Image
            src={image}
            alt={header || "Article image"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="p-6">
        <time className="text-sm text-gray-500 mb-3 block">
          {new Date(article.time).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>

        <h2
          className="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-gray-700 transition-colors"
        >
          {header}
        </h2>

        <p  className="text-gray-600 mb-3 line-clamp-3 font-light">
          {paragraph}
        </p>

        <Link
          href={`/news/${slug}`}
          className="font-medium text-gray-900 hover:text-gray-700 transition-colors flex items-center gap-1 mt-4"
        >
          Read More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default ArticleCard;
