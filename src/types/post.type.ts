type Author = {
  handle: string;
};

type Record = {
  createdAt: string;
  text: string;
};

export type Post = {
  author: Author;
  record: Record;
};
