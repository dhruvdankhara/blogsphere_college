/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import parse from "html-react-parser";
import { marked } from "marked";
import { FaRegEye } from "react-icons/fa";
import { MdOutlineComment } from "react-icons/md";
import { Comment, LikeBtn } from "./index";
import { deletePost, getUserProfile } from "../api/index";

function BlogPost({
  title,
  featureImage,
  content,
  author,
  _id,
  createdAt,
  slug,
  visits,
  isLiked,
  likes,
  setPost,
  comments,
}) {
  const [deletingPost, setDeletingPost] = useState(false);

  const user = useSelector((state) => state.auth.data);
  const navigate = useNavigate();

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  }

  const handleDeletePost = async () => {
    const deleteBlogToast = toast.loading("Deleting Blog Post...");
    setDeletingPost(true);

    try {
      await deletePost(slug);

      toast.success("Blog Post deleted successfully.", {
        id: deleteBlogToast,
      });
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message, {
        id: deleteBlogToast,
      });
    } finally {
      setDeletingPost(false);
    }
  };

  useEffect(() => {
    getUserProfile(author.username).then((response) => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      author = response.data;
    });
  }, []);

  return (
    <div className="my-5">
      <div className="flex flex-col gap-8">
        {author._id == user._id && (
          <div className="flex items-center gap-4 rounded-3xl border-2 border-black/50 p-4">
            <button
              onClick={() => navigate(`/blog/edit/${slug}`)}
              className="rounded-xl bg-blue-700 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 md:text-base"
            >
              Edit
            </button>
            <button
              onClick={handleDeletePost}
              className="rounded-xl bg-red-600 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-900 md:text-base"
              disabled={deletingPost}
            >
              {deletingPost ? (
                <div className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-e-blue-700"></div>
              ) : (
                "Delete"
              )}
            </button>
            <p className="text-slate-600">*This button only display to you.</p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <h1 className="truncat text-wrap text-5xl font-bold">{title}</h1>
          <p className="flex items-center justify-start gap-2">
            <FaRegEye className="h-5 w-5" />{" "}
            <p>
              <span className="font-semibold">{visits}</span> views
            </p>
          </p>
          <p className="text-lg font-semibold text-slate-800">
            {formatDate(createdAt)}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-5 flex border-b-2 border-t-2 border-slate-400">
              <LikeBtn
                _id={_id}
                isLiked={isLiked}
                likes={likes}
                setPost={setPost}
              />
              <a href="#comments" className="flex gap-2 p-5">
                <MdOutlineComment className="h-7 w-7" />
                <p className="text-lg font-bold">{comments}</p>
              </a>
            </div>
            <img
              className="mx-auto aspect-video rounded-2xl object-cover"
              src={featureImage}
              alt={title}
            />
            <pre className="text-wrap font-sans text-lg">
              {parse(marked.parse(content))}
            </pre>
            <Comment
              {...{ title, featureImage, content, author, _id, slug, visits }}
            />
          </div>

          <div className="col-span-1">
            <div className="flex flex-col gap-4 rounded-2xl border-2 border-black/50 bg-white p-5">
              <p className="text-slate-700">Author</p>
              <Link
                to={`/u/${author.username}`}
                className="flex items-center gap-4"
              >
                <img
                  className="h-12 w-12 rounded-2xl object-cover"
                  src={author.avatar}
                  alt=""
                />
                <div>
                  <p className="font-bold">{author.name}</p>
                  <p className="font-light">@{author.username}</p>
                </div>
              </Link>
              <div>
                <div className="flex gap-5 text-center">
                  <p>
                    <span className="font-bold">{author.posts}</span>
                    <br />
                    Posts
                  </p>
                  <p>
                    <span className="font-bold">{author.followers}</span>
                    <br />
                    Followers
                  </p>
                  <p>
                    <span className="font-bold">{author.following}</span>
                    <br />
                    Following
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
