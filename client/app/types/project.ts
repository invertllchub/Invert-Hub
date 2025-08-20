export type Fact =
  | {
      id: number;
      type: "text";
      value: {
        number: number;
        string: string;
      };
      text: string;
    }
  | {
      id: number;
      type: "image";
      value: {
        number: number;
        string: string;
      };
      text: string;
      img: string;
    };

export type KeyInfoItem = {
  label: string;
  value: string | string[];
};
export type Article = {
  id: number;
  title: string;
  content: string;
  type: "image" | "video";
  media: string;
};

export type Project = {
  data: {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    img: string;
    animatedText: string; // مش text
    overview: string;
  };
  keyInformation: KeyInfoItem[]; 
  images: string[];
  facts: Fact[];
  articles: Article[];
};

export type SwiperProps = {
  project: Project;
};
