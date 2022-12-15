import PostCard from "../../components/postCard/postCard";
import { usePosts } from "../../context/postContext";

const Home = () => {
  const { posts, createNewPost } = usePosts();
  return (
    <div>
      Home
      <button
        onClick={() => {
          createNewPost({
            title: "title1",
            body: "body1",
          });
        }}
      >
        create new
      </button>
      <div className="m-auto max-w-lg">
        {posts?.map((post) => (
          <PostCard post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
