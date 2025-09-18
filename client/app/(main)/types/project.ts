export type Fact =
  | {
      id: number;
      type: "text";
      value: {
        number: string;
        label: string;
      };
      text: string;
    }
  | {
      id: number;
      type: "image";
      value: {
        number: number;
        label: string;
      };
      text: string;
      img: string;
    };

export type KeyInfoItem = {
  label: string;
  value: string | string[];
};

export type Article = {
  title: string;
  content: string;
  type: string;
  media: string;
};

export type Project = {
  data: {
    id: number
    title: string;
    slug: string;
    date: string;
    description: string;
    img: string;
    animatedText: string;
    overview: string;
  };
  keyInformation: KeyInfoItem[];
  images: (File | null)[];
  facts: Fact[];
  articles: Article[];
};

export type SwiperProps = {
  project: Project;
};

export type addProjectProps ={
  project: Project;
}


