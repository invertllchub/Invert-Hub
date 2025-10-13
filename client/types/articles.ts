export interface Block {
  type: string;
  data: any; 
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
