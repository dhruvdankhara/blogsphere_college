/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import {formatDate} from "../Hooks/FormateDate"

function BlogCard({ _id, title, featureImage, author, createdAt, slug }) {
  

  return (
    <Link to={`/blog/${slug}`} key={_id}>
      <div className="mx-auto h-full max-w-md overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-800/80 px-6 pt-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-gray-800/90 hover:shadow-2xl md:max-w-lg lg:max-w-xl">
        <img
          src={featureImage}
          alt={title}
          className="aspect-video h-56 w-full rounded-xl object-cover ring-1 ring-gray-600"
        />
        <div className="py-5">
          <div className="mb-3 flex items-center gap-3">
            <img
              src={author.avatar}
              alt={author.username}
              className="h-10 w-10 rounded-full border-2 border-gray-600 ring-2 ring-gray-700"
            />
            <span className="text-sm font-medium text-gray-300">
              {author.username}
            </span>
          </div>

          <h2 className="line-clamp-2 text-lg font-bold text-gray-100 transition-colors hover:text-blue-400 md:text-xl">
            {title}
          </h2>

          <p className="mt-2 text-sm text-gray-400">{formatDate(createdAt)}</p>

          <Link
            to={`/blog/${slug}`}
            className="mt-4 inline-block rounded-xl bg-blue-600/20 px-4 py-2 text-sm font-semibold text-blue-400 transition-all duration-300 hover:bg-blue-600/30 hover:text-blue-300"
          >
            Read More →
          </Link>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
