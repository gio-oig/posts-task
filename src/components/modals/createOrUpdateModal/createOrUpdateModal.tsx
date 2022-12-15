import { useState } from "react";
import { Button } from "src/components/button/button";
import { Post } from "src/api/post";
import { usePosts } from "src/context/postContext";

type CreateOrUpdateModalProps = {
  post?: Post;
  close: () => void;
};

const CreateOrUpdateModal = ({ post, close }: CreateOrUpdateModalProps) => {
  const [title, setTitle] = useState(post?.title ?? "");
  const [body, setBody] = useState(post?.body ?? "");

  const { createNewPost, updatePostById } = usePosts();

  const handleSubmit = () => {
    const newPostData = {
      title,
      body,
    };

    if (post) {
      updatePostById({ ...newPostData, id: post.id });
    } else {
      createNewPost(newPostData);
    }
    close();
  };

  return (
    <div className="fixed left-0 top-0 w-screen h-screen bg-[rgba(128,128,128,0.78)]">
      <div
        className="rounded-2xl border w-full max-w-[500px] border-blue-100 bg-white p-8 shadow-lg fixed left-2/4 top-1/4 -translate-x-1/2"
        role="alert"
      >
        <p className="mt-3 text-lg font-medium sm:mt-0">
          {post ? "Update post" : "Create new post"}
        </p>
        <input
          name="title"
          placeholder="Title"
          className="mt-4 w-full rounded-md border outline-none p-3 border-gray-100 text-gray-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          name="body"
          className="resize-none mt-4 border border-blue-100 p-1 rounded-md outline-none sm:text-sm w-full h-40 text-gray-500"
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>

        <div className="mt-6 sm:flex  gap-x-3">
          <Button
            type="submit"
            className="bg-indigo-600"
            onClick={handleSubmit}
          >
            Save
          </Button>
          <Button
            type="button"
            className="bg-gray-50 text-gray-500"
            onClick={close}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateOrUpdateModal;
