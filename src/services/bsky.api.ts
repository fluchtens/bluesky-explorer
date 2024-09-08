import { Post } from "../types/post.type";

export const fetchPosts = async (search?: string): Promise<Post[]> => {
  try {
    let query = "lang:fr";
    if (search) {
      query += ` ${search}`;
    }

    const response = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.feed.searchPosts?q=${query}&limit=25&sort=top`);
    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.posts;
  } catch (error) {
    console.error(error);
    return [];
  }
};
