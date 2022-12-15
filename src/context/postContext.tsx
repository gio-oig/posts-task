import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  updatePost,
  createPost,
  getAllPosts,
  getPost,
  UpdatePost,
  NewPost,
  Post,
} from "../api/post";

type PostContextProps = {
  post: Post | undefined;
  posts: Post[] | undefined;
  getPostById: (postId: number) => Promise<void>;
  createNewPost: (newPost: NewPost) => Promise<void>;
};

const PostContext = createContext<PostContextProps | null>(null);

type PostContextProviderProps = {
  children: ReactNode;
};

export const PostContextProvider = ({ children }: PostContextProviderProps) => {
  const [posts, setPosts] = useState<Post[]>();
  const [post, setPost] = useState<Post>();

  const fetchPosts = async () => {
    const res = await getAllPosts();
    setPosts(res.data);
  };

  const fetchPost = async (postId: number) => {
    const res = await getPost(postId);
    return res.data;
  };

  const getPostById = async (postId: number) => {
    const foundPost = posts?.find((post) => post.id === postId);
    if (foundPost) {
      return setPost(foundPost);
    }

    const fetchedPost = await fetchPost(postId);
    setPost(fetchedPost);
  };

  const createNewPost = async (newPost: NewPost) => {
    const res = await createPost(newPost);
    setPosts((posts) => [res.data, ...(posts || [])]);
  };

  const updatePostById = async (updatedPost: UpdatePost) => {
    const res = await updatePost(updatedPost);
    if (res.status === 200) {
    }
    setPosts((posts) => [res.data, ...(posts || [])]);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const contextValues = {
    post,
    posts,
    getPostById,
    createNewPost,
  };

  return (
    <PostContext.Provider value={contextValues}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const value = useContext(PostContext);

  if (!value) {
    throw new Error("Post Context Provider is not defined");
  }
  return value;
};
