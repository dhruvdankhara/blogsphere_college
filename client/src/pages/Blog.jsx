/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Container, BlogPost, Loader } from "../components/index";
import { useParams } from "react-router-dom";
import { getPost, getUserProfile } from "../api";

function Blog() {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    (async () => {
      const postResponse = await getPost(slug);

      const userResponse = await getUserProfile(
        postResponse.data.author.username
      );

      setPost({ ...postResponse.data, author: userResponse.data });

      setLoading(false);
    })();
  }, []);
  return (
    <div>
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <>
            <BlogPost {...post} setPost={setPost} />
          </>
        )}
      </Container>
    </div>
  );
}

export default Blog;
