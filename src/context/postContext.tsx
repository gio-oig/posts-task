import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
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
  deletePostHttp,
} from "../api/post";

type PostContextProps = {
  post: Post | undefined;
  postToUpdate: Post | undefined;
  setPostToUpdate: Dispatch<SetStateAction<Post | undefined>>;
  posts: Post[] | undefined;
  deletePost: (postId: number) => void;
  getPostById: (postId: number) => Promise<void>;
  createNewPost: (newPost: NewPost) => Promise<void>;
  updatePostById: (updatedPost: UpdatePost) => Promise<void>;
};

const PostContext = createContext<PostContextProps | null>(null);

type PostContextProviderProps = {
  children: ReactNode;
};

export const PostContextProvider = ({ children }: PostContextProviderProps) => {
  const [posts, setPosts] = useState<Post[]>();
  const [post, setPost] = useState<Post>();
  const [postToUpdate, setPostToUpdate] = useState<Post>();

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

    setPosts((posts) => {
      if (posts?.length) {
        const newPost = { ...res.data, id: posts.length + 1 };
        return [newPost, ...posts];
      } else {
        return [res.data];
      }
    });
  };

  const updatePostById = async (updatedPost: UpdatePost) => {
    const res = await updatePost(updatedPost);

    setPosts((posts) =>
      posts?.map((post) => (post.id === res.data.id ? res.data : post))
    );
  };

  const deletePost = async (postId: number) => {
    deletePostHttp(postId).then(() => {
      setPosts((posts) => posts?.filter((post) => post.id !== postId));
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const contextValues = {
    post,
    posts,
    postToUpdate,
    setPostToUpdate,
    getPostById,
    createNewPost,
    updatePostById,
    deletePost,
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
