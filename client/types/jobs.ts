export type JobStatus = "Available" | "Not Available";

export interface Job {
  id: string;
  title: string;
  location: string;
  employmentType: "Full-time" | "Part-time" | "Contract";
  experienceLevel: "Entry-level" | "Junior" | "Mid-level" | "Senior";
  salary: string;
  status: JobStatus;
  datePosted: string;   
  closingDate: string;
  description: string;
  requirements: string[];
  skills: string[];
  benefits: string[];
}

export interface JobsResponse {
  jobs: Job[];
}
