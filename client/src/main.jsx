import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Blog from "./pages/Blog.jsx";
import Blogs from "./pages/Blogs.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import CreateBlog from "./pages/CreateBlog.jsx";
import EditPost from "./pages/EditPost.jsx";
import Profile from "./pages/Profile.jsx";
import Search from "./pages/Search.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/u/:username",
        element: <Profile />,
      },
      {
        path: "/blog/:slug",
        element: <Blog />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/create-post",
        element: <CreateBlog />,
      },
      {
        path: "/blog/edit/:blogId",
        element: <EditPost />,
      },
      {
        path: "/search",
        element: <Search />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={12}
      toastOptions={{
        duration: 4000,
        className:
          "group pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border border-gray-700/60 bg-gray-800/80 px-4 py-3 text-sm text-gray-200 shadow-xl backdrop-blur-md ring-1 ring-black/20 transition-all data-[swipe=move]:translate-x-[var(--toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--toast-swipe-end-x)]",
        style: {
          background: "#1f2937cc",
        },
        success: {
          iconTheme: { primary: "#10b981", secondary: "#1f2937" },
          className:
            "border-emerald-500/40 bg-emerald-500/15 text-emerald-200 ring-emerald-500/20",
          duration: 3000,
        },
        error: {
          iconTheme: { primary: "#ef4444", secondary: "#1f2937" },
          className:
            "border-red-500/50 bg-red-500/15 text-red-200 ring-red-500/30",
          duration: 5000,
        },
        loading: {
          className:
            "border-blue-500/40 bg-blue-500/15 text-blue-200 ring-blue-500/30",
        },
      }}
    />
  </Provider>
);
