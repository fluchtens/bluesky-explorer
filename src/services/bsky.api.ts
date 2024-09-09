import { Post } from "../types/post.type";

type PostResponse = {
  posts: Post[];
  cursor: string;
};

const fetchPosts = async (search?: string, cursor?: string): Promise<PostResponse | null> => {
  try {
    let query = "lang:fr";
    if (search) {
      query += ` ${search}`;
    }

    const url = new URL("https://public.api.bsky.app/xrpc/app.bsky.feed.searchPosts");
    url.searchParams.append("q", query);
    url.searchParams.append("limit", "30");
    url.searchParams.append("sort", "top");
    if (cursor) {
      url.searchParams.append("cursor", cursor);
    }
    console.log(url.toString());

    const response = await fetch(url.toString());
    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { fetchPosts };
