import { useState } from "react";
import { Link } from "react-router-dom";
import { Post } from "src/api/post";
import { Button } from "src/components/button/button";

type PostCardPros = {
  post: Post;
  onUpdate: () => void;
  onDelete: () => void;
};

const PostCard = ({ post, onUpdate, onDelete }: PostCardPros) => {
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);

  const handelDeleteClick = () => {
    setIsDeleteClicked(true);

    if (isDeleteClicked) {
      onDelete();
    }

    setTimeout(() => {
      setIsDeleteClicked(false);
    }, 3000);
  };

  return (
    <article className="mb-4 rounded-xl bg-white p-6 ring ring-indigo-50 sm:p-4">
      <div>
        <h3 className="mt-4 text-lg font-medium sm:text-xl">
          <Link
            className="hover:underline cursor-pointer"
            to={`/post/${post.id}`}
          >
            {post.title}
          </Link>
        </h3>

        <p className="line-clamp mt-1 text-sm text-gray-700 ">{post.body}</p>
        <div className="flex gap-x-2 mt-5">
          <Button className="bg-indigo-600 py-2 px-2" onClick={onUpdate}>
            Update
          </Button>
          <Button className="bg-red-600 py-2 px-2" onClick={handelDeleteClick}>
            {isDeleteClicked ? "Click agan to delete" : "Delete"}
          </Button>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
