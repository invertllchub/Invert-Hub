import Image from "next/image";
import Link from "next/link";

export type ArticleCategory =
  | "Studio News"
  | "Publications / Features"
  | "Articles & Opinions"
  | "Events & Awards";

export interface Article {
  id: string;
  imageUrl: string;
  title: string;
  excerpt: string;
  date: string;
  category: ArticleCategory;
  readMoreLink: string;
}

interface ArticleProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleProps> = ({ article }) => (
  <article className="group bg-white rounded-lg overflow-hidden border border-gray-100 hover:border-gray-300 transition-all duration-300">
    <div className="relative h-60 overflow-hidden">
      <Image
        src={article.imageUrl}
        alt={article.title}
        layout="fill"
        objectFit="cover"
        className="w-full transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute bottom-4 left-4">
        <span className="text-xs font-medium px-3 py-1.5 bg-white text-gray-800 rounded-full border border-gray-200 backdrop-blur-sm">
          {article.category}
        </span>
      </div>
    </div>
    <div className="p-6">
      <time className="text-sm text-gray-500 mb-3 block">
        {new Date(article.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </time>
      <h2 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-gray-700 transition-colors">
        {article.title}
      </h2>
      <p className="text-gray-600 mb-5 line-clamp-3 font-light">
        {article.excerpt}
      </p>
      <Link
        href={article.readMoreLink}
        className="font-medium text-gray-900 hover:text-gray-700 transition-colors flex items-center gap-1"
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

export default ArticleCard;
