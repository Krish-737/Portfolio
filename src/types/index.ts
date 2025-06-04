export interface Project {
  id: string;  // Changed from number to string to match UUID type
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  liveUrl?: string;
}

export interface Skill {
  name: string;
  percentage: number;
}

export interface Tool {
  name: string;
  icon: string;
}