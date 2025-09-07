import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import { Container } from "./index";
import { registerUser } from "../api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispacth = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const registerUserToast = toast.loading("Registering user...");

    try {
      const response = await registerUser({ name, email, username, password });

      toast.success(`welcome, ${response.data?.user?.name || "user"}`, {
        id: registerUserToast,
      });

      dispacth(login(response.data.user));
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);

      toast.error(error.response.data.message, {
        id: registerUserToast,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Container>
        <section className="rounded-3xl border-2 bg-white">
          <div className="flex h-dvh items-center justify-center">
            <div className="w-full max-w-lg rounded-xl border shadow-md">
              <div className="flex flex-col gap-8 p-14">
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                  Create new account
                </h1>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor={"name"}
                      className="text-base font-medium capitalize text-gray-900"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="john doe"
                      className={`w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-2.5 text-gray-900`}
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor={"email"}
                      className="text-base font-medium capitalize text-gray-900"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="example@mail.com"
                      className={`w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-2.5 text-gray-900`}
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor={"username"}
                      className="text-base font-medium capitalize text-gray-900"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      placeholder="name123"
                      className={`w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-2.5 text-gray-900`}
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor={"password"}
                      className="text-base font-medium capitalize text-gray-900"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className={`w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-2.5 text-gray-900`}
                      id="name"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {error ? (
                    <div className="text-wrap rounded-lg border border-red-800 bg-red-400/80 px-5 py-3 text-white">
                      {error}
                    </div>
                  ) : null}

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
                      "Register"
                    )}
                  </button>
                  <p className="text-sm font-light text-gray-500">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Log in
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

export default Register;
