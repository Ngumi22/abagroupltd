export type Project = {
  slug: string;
  name: string;
  type: string;
  location: string;
  year: string;
  status: string;
  summary: string;
  description: string;
  image: string;
  gallery: string[];
  scope: string[];
};

export type Lead = {
  name: string;
  project: string;
  status: string;
  date: string;
};

export type Service = {
  number: string;
  title: string;
  description: string;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type Blog = {
  title: string;
  date: string;
  image: string;
};
