type Author = {
  handle: string;
  avatar: string;
};

type Record = {
  createdAt: string;
  text: string;
};

export type Post = {
  cid: string;
  uri: string;
  author: Author;
  record: Record;
  likeCount: number;
  quoteCount: number;
  replyCount: number;
  repostCount: number;
};
