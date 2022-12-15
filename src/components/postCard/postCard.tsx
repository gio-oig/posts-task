import { useNavigate } from "react-router-dom";
import { Post } from "../../api/post";

type PostCardPros = {
  post: Post;
};

const PostCard = ({ post }: PostCardPros) => {
  const navigate = useNavigate();
  return (
    <article className="mb-4 rounded-xl bg-white p-6 ring ring-indigo-50 sm:p-4">
      <div className="">
        <h3 className="mt-4 text-lg font-medium sm:text-xl">
          <p
            className="hover:underline"
            onClick={() => navigate(`/post/${post.id}`)}
          >
            {post.title}
          </p>
        </h3>

        <p className="mt-1 text-sm text-gray-700">{post.body}</p>
      </div>
    </article>
  );
};

export default PostCard;
