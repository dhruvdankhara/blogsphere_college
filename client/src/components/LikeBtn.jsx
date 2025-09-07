/* eslint-disable react/prop-types */
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { likeBlogPost, unlikeBlogPost } from "../api";
import { useSelector } from "react-redux";

function LikeBtn({ _id, isLiked, likes, setPost }) {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const likePost = async () => {
    if (!isLoggedIn) {
      toast.error("Login to like blog posts.");
      return;
    }

    const likeToast = toast.loading("Liking Post...");

    try {
      await likeBlogPost(_id);

      toast.success("Liked Post successfully.", { id: likeToast });

      setPost((prev) => ({ ...prev, isLiked: true, likes: likes + 1 }));
    } catch (error) {
      toast.error(error.response.data.message, {
        id: likeToast,
      });
    }
  };

  const unlikePost = async () => {
    const unlikeToast = toast.loading("Unliking Post...");

    try {
      await unlikeBlogPost(_id);

      toast.success("Unliked Post successfully.", { id: unlikeToast });

      setPost((prev) => ({ ...prev, isLiked: false, likes: likes - 1 }));
    } catch (error) {
      toast.error(error.response.data.message, {
        id: unlikeToast,
      });
    }
  };

  return (
    <div className="flex gap-2 p-5">
      {isLiked ? (
        <FaHeart
          className="h-7 w-7 cursor-pointer fill-red-600"
          onClick={unlikePost}
        />
      ) : (
        <FaRegHeart className="h-7 w-7 cursor-pointer" onClick={likePost} />
      )}{" "}
      <p className="text-lg font-bold">{likes}</p>
    </div>
  );
}

export default LikeBtn;
