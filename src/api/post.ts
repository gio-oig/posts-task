import axios from "axios";

export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export type NewPost = Omit<Post, "id" | "userId">;
export type UpdatePost = Omit<Post, "userId">;

const baseurl = "https://jsonplaceholder.typicode.com/posts";

export const getAllPosts = async () => {
  return await axios.get<Post[]>(baseurl);
};

export const getPost = async (postId: number) => {
  return await axios.get<Post>(`${baseurl}/${postId}`);
};

export const createPost = async (newPost: NewPost) => {
  return await axios.post<Post>(baseurl, newPost);
};

export const updatePost = async (updatedPost: UpdatePost) => {
  return await axios.put<Post>(baseurl, updatedPost);
};
