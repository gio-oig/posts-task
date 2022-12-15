import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePosts } from "src/context/postContext";

const PostDetails = () => {
  const { id } = useParams();
  const { getPostById, post } = usePosts();

  useEffect(() => {
    if (!id) return;
    getPostById(+id);
  }, [id]);

  return (
    <div className="max-w-[1000px] mx-auto mt-5 px-5">
      <div>
        <h1 className="text-2xl font-medium mb-8 capitalize">{post?.title}</h1>
        <div className="">{post?.body}</div>
      </div>
    </div>
  );
};

export default PostDetails;
