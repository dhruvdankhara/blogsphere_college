import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserPosts, getUserProfile } from "../api/index";
import {
  Container,
  BlogCard,
  LogoutBtn,
  FollowBtn,
  Loader,
} from "../components/index";

function Profile() {
  const { username } = useParams();

  const [userData, setUserData] = useState({});
  const [blogs, setBlogs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const stateUserData = useSelector((state) => state.auth.data);

  useEffect(() => {
    (async () => {
      try {
        const [userProfileResponse, userPostResponse] = await Promise.all([
          getUserProfile(username),
          getUserPosts(username),
        ]);

        setUserData(userProfileResponse.data);
        setBlogs(userPostResponse.data);
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [username]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="my-10">
        <Container>
          <div className="rounded-2xl border-2 border-black p-5">
            <p className="text-center text-2xl font-bold">{error}</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="my-10">
      <Container>
        <div className="rounded-2xl border-2 border-gray-300 p-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div>
              <div className="sticky top-5 flex flex-col items-center gap-3 rounded-2xl border-black/70 bg-white p-5 md:items-start">
                <div>
                  <img
                    className="h-24 w-24 rounded-full"
                    src={userData.avatar}
                    alt={userData.name}
                  />
                </div>
                <div className="flex flex-col items-center gap-1 md:items-start">
                  <p className="text-2xl font-bold">{userData.name}</p>
                  <p className="text-base">@{userData.username}</p>
                </div>
                <div className="flex gap-2">
                  <p>
                    <span className="font-bold">{userData.followers} </span>
                    Followers
                  </p>
                  <p>
                    <span className="font-bold">{userData.following} </span>
                    Following
                  </p>
                </div>
                {userData._id == stateUserData._id ? (
                  <LogoutBtn />
                ) : (
                  <FollowBtn userData={userData} setUserData={setUserData} />
                )}
              </div>
            </div>
            <div className="col-span-3 grid grid-cols-1 gap-5 md:col-span-2">
              <div>
                {blogs.length > 0 ? (
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {blogs.map((blog) => (
                      <BlogCard key={blog._id} {...blog} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border-2 border-black p-5">
                    <p className="text-center text-3xl font-bold">
                      No Post Found
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Profile;
