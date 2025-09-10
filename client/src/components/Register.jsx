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
  const [error, setError] = useState(""); // backend / general
  const [fieldErrors, setFieldErrors] = useState({}); // client side

  const dispacth = useDispatch();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      errs.email = "Enter a valid email";
    if (!username.trim()) errs.username = "Username is required";
    else if (username.trim().length < 3) errs.username = "Username too short";
    if (!password.trim()) errs.password = "Password is required";
    else if (password.length < 6) errs.password = "Min 6 characters";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const errs = validate();
    setFieldErrors(errs);
    if (Object.keys(errs).length) {
      toast.error("Please fix the highlighted fields");
      return;
    }

    setLoading(true);
    const registerUserToast = toast.loading("Creating account...");
    try {
      const response = await registerUser({
        name: name.trim(),
        email: email.trim(),
        username: username.trim(),
        password,
      });
      toast.success(`Welcome, ${response.data?.user?.name || "user"}`, {
        id: registerUserToast,
      });
      dispacth(login(response.data.user));
      navigate("/");
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Registration failed. Try again.";
      setError(message);
      toast.error(message, { id: registerUserToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Container>
        <section className="rounded-3xl border border-gray-700/50 bg-gray-800/40 backdrop-blur-sm">
          <div className="flex min-h-screen items-center justify-center py-12">
            <div className="w-full max-w-lg rounded-2xl border border-gray-700/60 bg-gray-800/80 shadow-2xl backdrop-blur-xl">
              <div className="flex flex-col gap-8 p-12">
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-100">
                  Create new account
                </h1>
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor={"name"}
                      className="text-base font-medium capitalize text-gray-300"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="john doe"
                      className={`w-full rounded-xl border bg-gray-700/60 px-4 py-3 text-gray-100 placeholder-gray-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${
                        fieldErrors.name
                          ? "border-red-500/70 focus:border-red-500 focus:ring-red-500/30"
                          : "border-gray-600"
                      }`}
                      id="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (fieldErrors.name)
                          setFieldErrors((f) => ({ ...f, name: undefined }));
                      }}
                      aria-invalid={!!fieldErrors.name}
                      aria-describedby={
                        fieldErrors.name ? "name-error" : undefined
                      }
                    />
                    {fieldErrors.name && (
                      <p
                        id="name-error"
                        className="text-xs font-medium text-red-400"
                      >
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor={"email"}
                      className="text-base font-medium capitalize text-gray-300"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="example@mail.com"
                      className={`w-full rounded-xl border bg-gray-700/60 px-4 py-3 text-gray-100 placeholder-gray-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${
                        fieldErrors.email
                          ? "border-red-500/70 focus:border-red-500 focus:ring-red-500/30"
                          : "border-gray-600"
                      }`}
                      id="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (fieldErrors.email)
                          setFieldErrors((f) => ({ ...f, email: undefined }));
                      }}
                      aria-invalid={!!fieldErrors.email}
                      aria-describedby={
                        fieldErrors.email ? "email-error" : undefined
                      }
                    />
                    {fieldErrors.email && (
                      <p
                        id="email-error"
                        className="text-xs font-medium text-red-400"
                      >
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor={"username"}
                      className="text-base font-medium capitalize text-gray-300"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      placeholder="name123"
                      className={`w-full rounded-xl border bg-gray-700/60 px-4 py-3 text-gray-100 placeholder-gray-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${
                        fieldErrors.username
                          ? "border-red-500/70 focus:border-red-500 focus:ring-red-500/30"
                          : "border-gray-600"
                      }`}
                      id="username"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        if (fieldErrors.username)
                          setFieldErrors((f) => ({
                            ...f,
                            username: undefined,
                          }));
                      }}
                      aria-invalid={!!fieldErrors.username}
                      aria-describedby={
                        fieldErrors.username ? "username-error" : undefined
                      }
                    />
                    {fieldErrors.username && (
                      <p
                        id="username-error"
                        className="text-xs font-medium text-red-400"
                      >
                        {fieldErrors.username}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor={"password"}
                      className="text-base font-medium capitalize text-gray-300"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className={`w-full rounded-xl border bg-gray-700/60 px-4 py-3 text-gray-100 placeholder-gray-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${
                        fieldErrors.password
                          ? "border-red-500/70 focus:border-red-500 focus:ring-red-500/30"
                          : "border-gray-600"
                      }`}
                      id="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (fieldErrors.password)
                          setFieldErrors((f) => ({
                            ...f,
                            password: undefined,
                          }));
                      }}
                      aria-invalid={!!fieldErrors.password}
                      aria-describedby={
                        fieldErrors.password ? "password-error" : undefined
                      }
                    />
                    {fieldErrors.password && (
                      <p
                        id="password-error"
                        className="text-xs font-medium text-red-400"
                      >
                        {fieldErrors.password}
                      </p>
                    )}
                  </div>
                  {error ? (
                    <div
                      className="text-wrap rounded-xl border border-red-500/40 bg-red-500/15 px-5 py-3 text-sm text-red-300"
                      role="alert"
                    >
                      {error}
                    </div>
                  ) : null}
                  <button
                    className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 md:text-base"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-transparent border-t-blue-400"></div>
                    ) : (
                      "Register"
                    )}
                  </button>
                  <p className="text-sm font-light text-gray-400">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-medium text-blue-400 hover:text-blue-300 hover:underline"
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
