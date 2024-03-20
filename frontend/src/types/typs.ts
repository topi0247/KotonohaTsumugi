export type User = {
  id: number;
  name: string;
};

export type SSNovelBody = {
  id: number;
  content: string;
  created_at: string;
  narrative_stage: string;
  user: User;
};

export type SSNovel = {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  ssnovel_bodies: SSNovelBody[];
};
