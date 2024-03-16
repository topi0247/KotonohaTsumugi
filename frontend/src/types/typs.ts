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
  username: string;
  created_at: string;
  updated_at: string;
  ssnovel_bodies: SSNovelBody[];
};

export const NarrativeType = {
  beginning: "起",
  rising_action: "承",
  climax: "転",
  falling_action: "結",
};
