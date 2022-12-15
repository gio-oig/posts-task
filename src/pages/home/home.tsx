import { useState } from "react";
import { Post } from "src/api/post";
import { Button } from "src/components/button/button";
import Modal from "src/components/modals/createOrUpdateModal/createOrUpdateModal";
import PostCard from "src/components/postCard/postCard";
import { usePosts } from "src/context/postContext";

const Home = () => {
  const { posts, postToUpdate, setPostToUpdate, deletePost } = usePosts();
  const [isCreateModalShown, setIsCreateModalShown] = useState(false);
  const [isUpdateModalShown, setIsUpdateModalShown] = useState(false);

  const handelUpdateClick = (post: Post) => {
    setPostToUpdate(post);
    setIsUpdateModalShown(true);
  };

  return (
    <div className="m-auto max-w-lg px-2 sm:px-0">
      <section className="flex items-center justify-between py-4">
        <h2 className="text-2xl font-bold">Posts</h2>
        <Button
          className="rounded bg-indigo-600 px-8 py-3 font-medium w-auto"
          onClick={() => setIsCreateModalShown(true)}
        >
          create new
        </Button>
      </section>
      <section>
        {posts?.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onUpdate={() => handelUpdateClick(post)}
            onDelete={() => deletePost(post.id)}
          />
        ))}
      </section>

      {isCreateModalShown && (
        <Modal close={() => setIsCreateModalShown(false)} />
      )}

      {isUpdateModalShown && (
        <Modal post={postToUpdate} close={() => setIsUpdateModalShown(false)} />
      )}
    </div>
  );
};

export default Home;
