// app/news/page.tsx
import ArticleCard from "@/components/main/Article";
import NewsHeader from "@/components/main/NewsHeader";
import SubscriptionCTA from "@/components/main/SubscriptionCTA";

type ArticleCategory =
  | "Studio News"
  | "Publications / Features"
  | "Articles & Opinions"
  | "Events & Awards";

interface Article {
  id: string;
  imageUrl: string;
  title: string;
  excerpt: string;
  date: string;
  category: ArticleCategory;
  readMoreLink: string;
}

const articles: Article[] = [
  {
    id: "1",
    imageUrl: "/architecture-1.jpg",
    title: "ArchYards featured in FRAME Magazine",
    excerpt:
      "Our urban design strategy for creative districts was spotlighted in the latest issue of FRAME.",
    date: "2023-10-15",
    category: "Publications / Features",
    readMoreLink: "/articles/archyards-frame",
  },
  {
    id: "2",
    imageUrl: "/business-playbook.jpg",
    title: "From Zero to Hero: Behind the Business Playbook",
    excerpt:
      "A deep dive into the structure behind our creative coaching system.",
    date: "2023-09-28",
    category: "Articles & Opinions",
    readMoreLink: "/articles/business-playbook",
  },
  {
    id: "3",
    imageUrl: "/dubai-design.jpg",
    title: "INVERT at Dubai Design Week",
    excerpt:
      "We presented the WOW WORLD publishing model at the AI+Design panel.",
    date: "2023-11-05",
    category: "Events & Awards",
    readMoreLink: "/articles/dubai-design-week",
  },
];

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <NewsHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        <SubscriptionCTA />
      </div>
    </div>
  );
}
