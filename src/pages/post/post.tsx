import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePosts } from "../../context/postContext";

const PostDetails = () => {
  const { id } = useParams();
  const { getPostById, post } = usePosts();

  useEffect(() => {
    if (!id) return;
    getPostById(+id);
  }, [id]);

  return (
    <div>
      post {id}
      <div>
        <h1>{post?.title}</h1>
        <div>{post?.body}</div>
      </div>
    </div>
  );
};

export default PostDetails;
