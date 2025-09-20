export interface Block {
  type: string;
  data: any; // لو عايز تعمل typing لكل tool ممكن نفصلها أكتر
}

export interface Article {
  id: number;
  time: number;
  blocks: Block[];
  version: string;
}

export interface ArticlesResponse {
  articles: Article[];
}
