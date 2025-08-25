// Careers Types
export interface Employee {
  name: string;
  jopDescription: string; 
  video: string;
  poster: string;
}

export interface CareersArticle {
  label: string;
  content: string;
}

export interface Location {
  capitalCity: string;
  street: string;
  postalCode: string;
  country: string;
  tele: string;
  domain: string;
}

export interface Swiper4Props {
  locations: Location[];
}

export interface CareersType {
  Employees: Employee[];
  articles: CareersArticle[];
  locations: Location[];
}