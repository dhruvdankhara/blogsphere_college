import { useEffect, useState } from "react";
import { BlogCard, Container } from "../components";
import { getPosts } from "../api/index.js";

function Blogs() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts()
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log("🚀 ~ fetch posts ~ error:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="mt-8">
        <Container>
          {loading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex h-full animate-pulse flex-col justify-between gap-5 rounded-3xl border border-gray-700/60 bg-gray-800/60 p-5">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 animate-pulse rounded-full bg-gray-600/60"></div>
                  <div className="h-10 w-40 animate-pulse rounded-md bg-gray-600/60"></div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="h-10 w-full animate-pulse rounded-2xl bg-gray-600/60"></div>
                  <div className="h-10 w-full animate-pulse rounded-2xl bg-gray-600/60"></div>
                  <div className="h-10 w-full animate-pulse rounded-2xl bg-gray-600/60"></div>
                </div>
                <div className="h-52 w-full animate-pulse rounded-2xl bg-gray-600/60"></div>
              </div>
              <div className="flex h-full animate-pulse flex-col justify-between gap-5 rounded-3xl border border-gray-700/60 bg-gray-800/60 p-5">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 animate-pulse rounded-full bg-gray-600/60"></div>
                  <div className="h-10 w-40 animate-pulse rounded-md bg-gray-600/60"></div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="h-10 w-full animate-pulse rounded-2xl bg-gray-600/60"></div>
                  <div className="h-10 w-full animate-pulse rounded-2xl bg-gray-600/60"></div>
                  <div className="h-10 w-full animate-pulse rounded-2xl bg-gray-600/60"></div>
                </div>
                <div className="h-52 w-full animate-pulse rounded-2xl bg-gray-600/60"></div>
              </div>
              <div className="flex h-full animate-pulse flex-col justify-between gap-5 rounded-3xl border border-gray-700/60 bg-gray-800/60 p-5">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 animate-pulse rounded-full bg-gray-600/60"></div>
                  <div className="h-10 w-40 animate-pulse rounded-md bg-gray-600/60"></div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="h-10 w-full animate-pulse rounded-2xl bg-gray-600/60"></div>
                  <div className="h-10 w-full animate-pulse rounded-2xl bg-gray-600/60"></div>
                  <div className="h-10 w-full animate-pulse rounded-2xl bg-gray-600/60"></div>
                </div>
                <div className="h-52 w-full animate-pulse rounded-2xl bg-gray-600/60"></div>
              </div>
            </div>
          ) : !posts.length ? (
            <div className="rounded-2xl border border-gray-700/60 bg-gray-800/70 p-10 text-center text-3xl font-bold text-gray-300 shadow-xl">
              <h1 className="bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                No Post Found
              </h1>
              <p className="mt-3 text-sm font-normal text-gray-500">
                Try creating a new post to get started.
              </p>
            </div>
          ) : (
            <div className="grid h-full gap-4 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <div key={post._id} className="mb-4">
                  <BlogCard {...post} />
                </div>
              ))}
            </div>
          )}
        </Container>
      </div>
    </>
  );
}

export default Blogs;
