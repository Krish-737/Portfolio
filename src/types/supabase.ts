export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  live_url?: string;
  created_at: string;
  updated_at: string;
}

export type About = {
  id: string;
  name: string;
  email: string;
  location: string;
  bio: string;
  experience: string;
  profile_image: string;
  created_at: string;
  updated_at: string;
}