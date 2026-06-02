export interface Project {
  slug: string;
  title: string;
  status: 'live' | 'in-development' | 'archived' | 'paused';
  description: string;
  why: string;
  tech: string[];
  links: {
    github?: string;
    live?: string;
    appStore?: string;
    writeup?: string;
  };
  content: string;
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: number;
  content: string;
}
