import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { Container } from "./index";
import { loginUser } from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispacth = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    const loginUserToast = toast.loading("Login user...");

    try {
      const response = await loginUser({ email, password });

      toast.success(`Welcome back, ${response.data.user.name}`, {
        id: loginUserToast,
      });

      dispacth(login(response.data.user));
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);

      toast.error(`Error: ${error.response.data.message}`, {
        id: loginUserToast,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Container>
        <section className="rounded-3xl border-2 bg-white">
          <div className="mx-auto flex h-dvh flex-col items-center justify-center px-6 py-8">
            <div className="w-full max-w-lg rounded-xl border bg-white shadow-lg">
              <div className="flex flex-col gap-8 p-14">
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                  Sign in to your account
                </h1>
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor={"email"}
                      className="text-base font-medium capitalize text-gray-900"
                    >
                      email
                    </label>
                    <input
                      type="email"
                      placeholder="example@mail.com"
                      className={`w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-2.5 text-gray-900`}
                      id={"email"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="password"
                      className="text-base font-medium capitalize text-gray-900"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className={`w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-2.5 text-gray-900`}
                      id={"password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {error && (
                    <div className="text-wrap rounded-lg border border-red-800 bg-red-400/80 px-5 py-3 text-white">
                      {error}
                    </div>
                  )}
                  <button
                    className={
                      "rounded-xl bg-blue-700 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 md:text-base"
                    }
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="inline-block h-7 w-7 animate-spin rounded-full border-4 border-e-blue-700"></div>
                    ) : (
                      "Sign in"
                    )}
                  </button>
                  <p className="text-sm font-light text-gray-500">
                    Don’t have an account yet?{" "}
                    <Link
                      to="/register"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Sign up
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}

export default Login;
