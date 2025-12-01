# BlogSphere - Complete Technical Analysis Report

## 📌 Project Overview

**BlogSphere** is a full-stack blogging platform that allows users to create, publish, and manage blog posts with social features like comments, likes, and following users.

---

## ✨ Features Overview

### Core Features

| Feature                    | Description                                                                                                       |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 🔐 **User Authentication** | Register, login, and logout with secure JWT-based authentication. Passwords are hashed using bcrypt for security. |
| 📝 **Blog Management**     | Create, edit, and delete blog posts with a rich text editor (TipTap). Supports images, formatting, and markdown.  |
| 🖼️ **Image Upload**        | Upload feature images for blogs and profile avatars. Images are stored on Cloudinary CDN for fast delivery.       |
| ❤️ **Like System**         | Users can like and unlike blog posts. Like counts are displayed on each blog.                                     |
| 💬 **Comment System**      | Users can comment on blog posts. Comments show author info and timestamps.                                        |
| 👥 **Follow System**       | Users can follow/unfollow other users. Follower and following counts are shown on profiles.                       |
| 🔍 **Search**              | Search blogs by title or content using keyword search.                                                            |
| 👤 **User Profiles**       | View user profiles with their blogs, follower count, following count, and post count.                             |
| ✏️ **Profile Editing**     | Users can update their name, username, email, gender, and profile avatar.                                         |
| 🔑 **Password Management** | Users can change their password from their account settings.                                                      |

---

## 👥 User Roles & Permissions

### 🔓 Visitor (Not Logged In)

Visitors can access the website without creating an account, but with limited functionality:

| Action             | Allowed | Description                                      |
| ------------------ | ------- | ------------------------------------------------ |
| View Home Page     | ✅      | Can see the landing page                         |
| View All Blogs     | ✅      | Can browse and read all published blog posts     |
| View Single Blog   | ✅      | Can read full blog content with author info      |
| View User Profiles | ✅      | Can see user profiles with their posts and stats |
| Search Blogs       | ✅      | Can search for blogs by keywords                 |
| View Comments      | ✅      | Can read comments on blog posts                  |
| Register           | ✅      | Can create a new account                         |
| Login              | ✅      | Can login to existing account                    |
| Like Blog          | ❌      | Must be logged in                                |
| Comment on Blog    | ❌      | Must be logged in                                |
| Follow Users       | ❌      | Must be logged in                                |
| Create Blog        | ❌      | Must be logged in                                |
| Edit/Delete Blog   | ❌      | Must be logged in                                |

### 🔐 Registered User (Logged In)

Logged-in users have full access to all features:

| Action                | Allowed | Description                                                |
| --------------------- | ------- | ---------------------------------------------------------- |
| All Visitor Actions   | ✅      | Can do everything a visitor can                            |
| Create Blog Post      | ✅      | Can write and publish new blog posts with images           |
| Edit Own Blog         | ✅      | Can modify their own published blogs                       |
| Delete Own Blog       | ✅      | Can remove their own blogs (also deletes comments & likes) |
| Like/Unlike Blogs     | ✅      | Can like any blog post (one like per blog)                 |
| Comment on Blogs      | ✅      | Can add comments to any blog post                          |
| Follow/Unfollow Users | ✅      | Can follow other users (cannot follow themselves)          |
| View Own Profile      | ✅      | Can see their profile with stats                           |
| Edit Profile          | ✅      | Can update name, username, email, gender                   |
| Change Avatar         | ✅      | Can upload a new profile picture                           |
| Change Password       | ✅      | Can update their account password                          |
| Logout                | ✅      | Can securely log out of their account                      |

### 🛡️ Authorization Rules

| Rule                   | Description                                             |
| ---------------------- | ------------------------------------------------------- |
| Blog Ownership         | Only the author can edit or delete their own blog posts |
| Self-Follow Prevention | Users cannot follow themselves                          |
| Single Like            | Users can only like a blog once (toggle like/unlike)    |
| Comment Authorship     | Comments are linked to the user who created them        |

---

## 🏗️ Architecture Overview

### High-Level Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│                 │   API   │                 │  ODM    │                 │
│   React Client  │ ◄─────► │  Express Server │ ◄─────► │    MongoDB      │
│   (Vite + NPM)  │  REST   │   (Node.js)     │Mongoose │   (Atlas)       │
│                 │         │                 │         │                 │
└─────────────────┘         └────────┬────────┘         └─────────────────┘
                                     │
                                     ▼
                            ┌─────────────────┐
                            │   Cloudinary    │
                            │ (Image Storage) │
                            └─────────────────┘
```

---

## 🖥️ Frontend (Client)

### Tech Stack & Dependencies (Detailed)

#### 🔷 Core Framework & Build Tools

| Package       | Version | Description                                                                                                                                                                                                                                                                                  |
| ------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **React**     | 18.3.1  | The core UI library for building component-based user interfaces. React uses a virtual DOM to efficiently update only the parts of the page that change, making the app fast and responsive. In BlogSphere, every page and component (BlogCard, Header, Comment, etc.) is built using React. |
| **React DOM** | 18.3.1  | The package that connects React to the browser's DOM. It provides the `createRoot()` method used in `main.jsx` to render the entire React application into the HTML page. Without this, React components cannot be displayed in the browser.                                                 |
| **Vite**      | 5.4.1   | A modern, lightning-fast build tool and development server. Unlike older tools like Webpack, Vite uses native ES modules for instant hot module replacement (HMR). When you save a file, changes appear in the browser almost immediately without full page reload.                          |

#### 🔷 Routing

| Package              | Version | Description                                                                                                                                                                                                                                                        |
| -------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **React Router DOM** | 6.26.1  | Enables client-side navigation without full page reloads. It maps URL paths to React components (e.g., `/blog/:slug` → `Blog.jsx`). The `createBrowserRouter` in `main.jsx` defines all routes, and `<Outlet />` in `App.jsx` renders the matched child component. |

#### 🔷 State Management

| Package           | Version | Description                                                                                                                                                                                                                                           |
| ----------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Redux Toolkit** | 2.2.7   | The official, simplified way to use Redux for global state management. In BlogSphere, it manages the authentication state (`isLoggedIn`, `userData`) that needs to be accessed across multiple components like Header, Profile, and protected routes. |
| **React Redux**   | 9.1.2   | Provides React bindings for Redux. The `<Provider>` component wraps the app to make the Redux store available everywhere. Hooks like `useSelector()` read state and `useDispatch()` triggers actions (login/logout).                                  |

#### 🔷 HTTP & API Communication

| Package   | Version | Description                                                                                                                                                                                                                                                                 |
| --------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Axios** | 1.7.4   | A promise-based HTTP client for making API requests to the backend. It's configured in `api/index.js` with base URL, timeout (60s), and `withCredentials: true` to send cookies with every request. All API calls (login, getPosts, createComment) use this axios instance. |

#### 🔷 Rich Text Editor (Blog Content Creation)

| Package                           | Version | Description                                                                                                                                                                                                  |
| --------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **@tiptap/react**                 | 3.4.2   | The React wrapper for TipTap editor. It provides the `useEditor` hook and `<EditorContent />` component used in `RichEditor.jsx` to create the WYSIWYG blog editor where users write their posts.            |
| **@tiptap/starter-kit**           | 3.4.2   | A bundle of essential TipTap extensions including bold, italic, headings, paragraphs, lists, blockquotes, and code blocks. This single package provides most common text formatting features out of the box. |
| **@tiptap/extension-link**        | 3.4.2   | Adds hyperlink support to the editor. Users can select text and add a link URL. The extension is configured with `openOnClick: false` so links don't navigate away while editing.                            |
| **@tiptap/extension-image**       | 3.4.2   | Enables embedding images in blog content. When a user uploads an image, it's sent to Cloudinary and the returned URL is inserted into the editor. Images are styled with rounded corners and max-height.     |
| **@tiptap/extension-placeholder** | 3.4.2   | Shows placeholder text ("Write your story...") when the editor is empty. This provides a visual hint to users about where to start typing their blog content.                                                |
| **@tiptap/extension-underline**   | 3.4.2   | Adds underline text formatting capability to the editor. Though not always visible in the toolbar, it's available as an extension for text decoration.                                                       |

#### 🔷 Markdown Processing

| Package               | Version | Description                                                                                                                                                                                                      |
| --------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Turndown**          | 7.2.1   | Converts HTML to Markdown. When a user writes in the TipTap editor (which outputs HTML), Turndown converts it to Markdown before saving to the database. This keeps blog content in a portable, readable format. |
| **Marked**            | 15.0.7  | Converts Markdown back to HTML. When editing an existing blog post, the stored Markdown content is parsed to HTML using Marked so TipTap can display it properly in the editor.                                  |
| **React Markdown**    | 9.0.3   | A React component that renders Markdown content as formatted HTML. Used to display blog posts on the frontend, converting the stored Markdown into readable paragraphs, headings, lists, etc.                    |
| **HTML React Parser** | 5.2.2   | Safely converts HTML strings into React elements. Used when blog content needs to be rendered as actual React components rather than raw HTML, preventing XSS attacks while maintaining formatting.              |

#### 🔷 Styling

| Package          | Version | Description                                                                                                                                                                                                                                               |
| ---------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tailwind CSS** | 3.4.10  | A utility-first CSS framework that provides pre-built classes like `flex`, `p-4`, `bg-blue-500`. Instead of writing custom CSS, you compose styles directly in JSX. BlogSphere uses it for all styling - layouts, colors, spacing, and responsive design. |
| **PostCSS**      | 8.4.41  | A CSS transformation tool that Tailwind requires. It processes the CSS, applying Tailwind's utilities and optimizations. The `postcss.config.js` file configures it to use Tailwind and Autoprefixer.                                                     |
| **Autoprefixer** | 10.4.20 | Automatically adds vendor prefixes (like `-webkit-`, `-moz-`) to CSS for cross-browser compatibility. Works with PostCSS to ensure styles work on all browsers without manual prefix management.                                                          |

#### 🔷 Icons

| Package          | Version | Description                                                                                                                                                                                                                                   |
| ---------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Lucide React** | 0.475.0 | A library of beautiful, customizable SVG icons as React components. Used throughout BlogSphere for UI elements like search icons, menu icons, heart (like), comment bubbles, and user avatars. Import icons like `<Heart />` or `<Search />`. |
| **React Icons**  | 5.3.0   | Another icon library providing access to multiple icon packs (FontAwesome, Material, etc.) as React components. Offers more variety when Lucide doesn't have a specific icon needed.                                                          |

#### 🔷 User Notifications

| Package             | Version | Description                                                                                                                                                                                                                                                           |
| ------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **React Hot Toast** | 2.4.1   | A lightweight toast notification library. When a user logs in, creates a blog, or encounters an error, toast messages pop up in the corner. The `<Toaster />` component in `main.jsx` handles displaying these notifications with customizable duration and position. |

#### 🔷 Utilities

| Package      | Version | Description                                                                                                                                                                                                                                        |
| ------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **UUID**     | 11.0.5  | Generates unique identifiers. Used when creating new items that need unique IDs before being saved to the database, or for React list keys when mapping arrays of data.                                                                            |
| **Prettier** | 3.3.3   | An opinionated code formatter that automatically formats code on save. Ensures consistent code style across the project - proper indentation, quotes, line breaks. The `prettier-plugin-tailwindcss` sorts Tailwind classes in a consistent order. |

#### 🔷 Development Dependencies

| Package                  | Version | Description                                                                                                                                                                                                            |
| ------------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ESLint**               | 9.9.0   | A linting tool that catches code errors and enforces coding standards. It warns about unused variables, missing imports, and React-specific issues. The `eslint.config.js` configures rules for React and React Hooks. |
| **@vitejs/plugin-react** | 4.3.1   | Vite's official React plugin that enables JSX transformation, Fast Refresh (hot reloading), and React-specific optimizations during development and build.                                                             |

### Project Structure

```
client/
├── src/
│   ├── api/
│   │   └── index.js          # Axios API client with all endpoints
│   ├── components/
│   │   ├── Header/           # Navigation header component
│   │   ├── BlogCard.jsx      # Blog post preview card
│   │   ├── BlogForm.jsx      # Blog creation/editing form
│   │   ├── BlogPost.jsx      # Individual blog display
│   │   ├── Comment.jsx       # Comment section component
│   │   ├── CommentCard.jsx   # Individual comment display
│   │   ├── LikeBtn.jsx       # Like button with toggle
│   │   ├── FollowBtn.jsx     # Follow/Unfollow button
│   │   ├── RichEditor.jsx    # TipTap WYSIWYG editor
│   │   ├── Login.jsx         # Login form component
│   │   ├── Register.jsx      # Registration form
│   │   ├── ChangePassword.jsx # Password change form
│   │   ├── UpdateAvatar.jsx  # Avatar upload component
│   │   ├── Loader.jsx        # Loading spinner
│   │   └── ...
│   ├── features/
│   │   └── auth/
│   │       └── authSlice.js  # Redux slice for auth state
│   ├── pages/
│   │   ├── Home.jsx          # Landing page
│   │   ├── Blogs.jsx         # Blog listing page
│   │   ├── Blog.jsx          # Single blog view
│   │   ├── CreateBlog.jsx    # Create new blog page
│   │   ├── EditPost.jsx      # Edit existing blog
│   │   ├── Profile.jsx       # User profile page
│   │   ├── EditUser.jsx      # Edit user profile
│   │   ├── Search.jsx        # Blog search page
│   │   ├── Login.jsx         # Login page
│   │   └── Register.jsx      # Registration page
│   ├── store/
│   │   └── store.js          # Redux store configuration
│   ├── Hooks/
│   │   └── FormateDate.js    # Date formatting utility
│   ├── App.jsx               # Root component with routing
│   ├── main.jsx              # Entry point with providers
│   └── index.css             # Global styles with Tailwind
└── public/                   # Static assets
```

### State Management (Redux)

The app uses Redux Toolkit with a single auth slice:

- **State**: `{ isLoggedIn: boolean, data: object }`
- **Actions**: `login(userData)`, `logout()`
- **Store Configuration**: Single reducer for auth state

### Routing Structure

| Route                | Page       | Description           |
| -------------------- | ---------- | --------------------- |
| `/`                  | Home       | Landing page          |
| `/login`             | Login      | User login            |
| `/register`          | Register   | New user registration |
| `/blogs`             | Blogs      | All blogs listing     |
| `/blog/:slug`        | Blog       | Single blog view      |
| `/create-post`       | CreateBlog | Create new blog       |
| `/blog/edit/:blogId` | EditPost   | Edit existing blog    |
| `/u/:username`       | Profile    | User profile page     |
| `/edit-user`         | EditUser   | Edit profile page     |
| `/search`            | Search     | Search blogs          |

### Rich Text Editor (TipTap)

The `RichEditor.jsx` component uses TipTap with:

- **Extensions**: StarterKit, Link, Image, Placeholder
- **Features**: Bold, Italic, Headings, Blockquote, Code blocks, Lists, Links, Image uploads
- **Image Handling**: Uploads to Cloudinary via `/api/v1/upload` endpoint
- **Markdown Support**: Converts HTML to Markdown using Turndown for storage

### API Client (Axios)

- **Base URL**: `VITE_SERVER_URL` from environment
- **Timeout**: 60 seconds
- **Credentials**: Enabled (for cookies)

---

## 🔧 Backend (Server)

### Tech Stack

| Technology         | Version | Purpose                       |
| ------------------ | ------- | ----------------------------- |
| Node.js            | -       | Runtime Environment           |
| Express.js         | 4.19.2  | Web Framework                 |
| MongoDB            | -       | NoSQL Database                |
| Mongoose           | 8.5.2   | MongoDB ODM                   |
| JWT (jsonwebtoken) | 9.0.2   | Authentication Tokens         |
| bcrypt             | 5.1.1   | Password Hashing              |
| Cloudinary         | 2.4.0   | Image Storage & CDN           |
| Multer             | 1.4.5   | File Upload Middleware        |
| Yup                | 1.4.0   | Schema Validation             |
| Morgan             | 1.10.0  | HTTP Request Logger           |
| CORS               | 2.8.5   | Cross-Origin Resource Sharing |
| Cookie-Parser      | 1.4.6   | Cookie Parsing                |
| dotenv             | 16.4.5  | Environment Variables         |
| uuid               | 11.0.5  | Unique ID Generation          |

### Project Structure

```
server/
├── src/
│   ├── config/
│   │   └── jwt.js            # JWT token generation/verification
│   ├── controllers/
│   │   ├── auth.controller.js    # Authentication handlers
│   │   ├── blog.controller.js    # Blog CRUD handlers
│   │   ├── comment.controller.js # Comment handlers
│   │   └── user.controller.js    # User profile & follow handlers
│   ├── DB/
│   │   └── index.js          # MongoDB connection setup
│   ├── middlewares/
│   │   ├── auth.middleware.js    # JWT verification
│   │   ├── error.middleware.js   # Global error handler
│   │   └── multer.middlewares.js # File upload config
│   ├── models/
│   │   ├── user.model.js     # User schema
│   │   ├── blog.model.js     # Blog post schema
│   │   ├── comment.model.js  # Comment schema
│   │   ├── like.model.js     # Like schema
│   │   └── follow.model.js   # Follow relationship schema
│   ├── router/
│   │   ├── auth.routes.js    # Auth endpoints
│   │   ├── blog.routes.js    # Blog endpoints
│   │   └── user.routes.js    # User endpoints
│   ├── schemas/
│   │   ├── auth.schema.js    # Auth validation schemas
│   │   └── blog.schema.js    # Blog validation schemas
│   ├── utils/
│   │   ├── ApiError.js       # Custom error class
│   │   ├── ApiResponse.js    # Standardized response class
│   │   ├── asyncHandler.js   # Async error wrapper
│   │   ├── cloudinary.js     # Cloudinary upload/delete
│   │   └── helper.js         # Helper utilities
│   ├── app.js                # Express app configuration
│   ├── server.js             # Server entry point
│   └── constants.js          # App constants
└── public/
    └── images/               # Temporary image storage
```

---

## 📊 Database Models

### User Model

```javascript
{
  name: String (required),
  username: String (required, unique, lowercase),
  email: String (required, unique, lowercase),
  password: String (required, hashed),
  gender: String (enum: MALE/FEMALE/OTHER, default: MALE),
  avatar: String (URL),
  timestamps: true
}
```

**Methods**:

- `isPasswordCorrect(password)` - Compare password with hash
- `generateAccessToken()` - Generate JWT token

**Hooks**:

- `pre('save')` - Hash password using bcrypt (8 salt rounds)

### Blog Model

```javascript
{
  userId: ObjectId (ref: User),
  title: String (required),
  slug: String (required, unique),
  featureImage: String (URL),
  content: String (required, Markdown),
  visits: Number (default: 0),
  timestamps: true
}
```

### Comment Model

```javascript
{
  userId: ObjectId (ref: User),
  blogId: ObjectId (ref: Blog),
  content: String (required),
  timestamps: true
}
```

### Like Model

```javascript
{
  userId: ObjectId (ref: User),
  blogId: ObjectId (ref: Blog),
  timestamps: true
}
```

### Follow Model

```javascript
{
  follower: ObjectId (ref: User),   // Who is following
  following: ObjectId (ref: User),  // Who is being followed
  timestamps: true
}
```

---

## 🔐 Authentication System

### Flow

1. **Registration**: User submits name, email, username, password → Password hashed → JWT generated → Cookie set
2. **Login**: User submits email/username + password → Password verified → JWT generated → Cookie set
3. **Authentication**: JWT token stored in HTTP-only cookie, verified on protected routes
4. **Logout**: Cookie cleared

### Middleware

- **verifyJWT**: Extracts token from cookie, verifies, attaches user to request
- **getLoggedInUserOrIgnore**: Optional auth - proceeds even if no token (for public routes needing optional user context)

### Password Handling

- **Hashing**: bcrypt with 8 salt rounds
- **Comparison**: `bcrypt.compare()` in `isPasswordCorrect()` method

---

## 📡 API Endpoints

### Authentication Routes (`/api/v1/auth`)

| Method | Endpoint           | Auth | Description            |
| ------ | ------------------ | ---- | ---------------------- |
| POST   | `/login`           | ❌   | User login             |
| POST   | `/logout`          | ❌   | User logout            |
| POST   | `/register`        | ❌   | User registration      |
| GET    | `/me`              | ✅   | Get current user       |
| POST   | `/change-password` | ✅   | Change password        |
| POST   | `/update-avatar`   | ✅   | Update profile picture |
| POST   | `/update-user`     | ✅   | Update user details    |

### Blog Routes (`/api/v1/blog`)

| Method | Endpoint               | Auth     | Description               |
| ------ | ---------------------- | -------- | ------------------------- |
| GET    | `/`                    | ❌       | Get all blogs             |
| POST   | `/`                    | ✅       | Create new blog           |
| GET    | `/:blogId`             | Optional | Get single blog (by slug) |
| POST   | `/:blogId`             | ✅       | Edit blog                 |
| DELETE | `/:blogId`             | ✅       | Delete blog               |
| GET    | `/search/:searchQuery` | ❌       | Search blogs              |
| GET    | `/:blogId/comment`     | ❌       | Get blog comments         |
| POST   | `/:blogId/comment`     | ✅       | Add comment               |
| POST   | `/:blogId/like`        | ✅       | Like blog                 |
| POST   | `/:blogId/unlike`      | ✅       | Unlike blog               |

### User Routes (`/api/v1/user`)

| Method | Endpoint              | Auth     | Description      |
| ------ | --------------------- | -------- | ---------------- |
| GET    | `/:username`          | Optional | Get user profile |
| GET    | `/:username/blogs`    | ❌       | Get user's blogs |
| POST   | `/:username/follow`   | ✅       | Follow user      |
| POST   | `/:username/unfollow` | ✅       | Unfollow user    |

### Upload Route

| Method | Endpoint         | Auth | Description                |
| ------ | ---------------- | ---- | -------------------------- |
| POST   | `/api/v1/upload` | ❌   | Upload image to Cloudinary |

---

## 🖼️ Image Handling

### Upload Flow

1. Client sends image via FormData
2. Multer saves to local `public/images/` directory
3. Cloudinary SDK uploads from local path
4. Local file deleted after successful upload
5. Cloudinary URL returned to client

### Cloudinary Integration

- **Upload**: `cloudinary.uploader.upload(localPath)`
- **Delete**: `cloudinary.uploader.destroy(publicId)`
- Returns secure HTTPS URLs

---

## 🔄 Data Flow Examples

### Creating a Blog Post

```
1. User fills BlogForm with title, content, feature image
2. RichEditor converts HTML to Markdown
3. FormData sent to POST /api/v1/blog
4. Multer processes image
5. Image uploaded to Cloudinary
6. Blog saved to MongoDB with Cloudinary URL
7. Response returned with blog data
```

### Viewing a Blog Post

```
1. User navigates to /blog/:slug
2. GET /api/v1/blog/:slug called
3. MongoDB aggregation joins User data
4. Visit count incremented
5. Like status checked if user logged in
6. Comments and likes count fetched
7. Full blog data returned
```

### Following a User

```
1. User clicks Follow button on profile
2. POST /api/v1/user/:username/follow called
3. Follow document created with follower/following IDs
4. Success response returned
5. UI updates to show "Following"
```

---

## 🛡️ Security Features

1. **Password Security**: bcrypt hashing with salt
2. **JWT Authentication**: Secure token-based auth
3. **HTTP-Only Cookies**: XSS protection
4. **CORS Configuration**: Restricted origins
5. **Input Validation**: Yup schema validation
6. **Error Handling**: Centralized error middleware
7. **File Upload Security**: Multer with file type restrictions

---

## 📦 Deployment

### Frontend (Vercel)

- Build command: `vite build`
- Output directory: `dist`
- Environment: `VITE_SERVER_URL`

### Backend (Render)

- Start command: `node src/server.js`
- Environment variables required:
  - `MONGODB_URL`
  - `JWT_SECRET`
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
  - `CORS_ORIGIN`

---

## 🔑 Key Features Summary

| Feature             | Implementation                                    |
| ------------------- | ------------------------------------------------- |
| User Authentication | JWT + bcrypt + Cookies                            |
| Blog Creation       | TipTap Rich Editor + Markdown storage             |
| Image Uploads       | Multer + Cloudinary                               |
| Like System         | Separate Like model with user-blog relationship   |
| Comment System      | Nested comments with author info                  |
| Follow System       | Follow model with follower/following relationship |
| Search              | MongoDB regex-based text search                   |
| State Management    | Redux Toolkit                                     |
| Styling             | Tailwind CSS                                      |
| Routing             | React Router DOM v6                               |
| Notifications       | React Hot Toast                                   |
| API Communication   | Axios with credentials                            |

---

## 📝 Notes for Development

1. **Package Managers**:

   - Client uses **NPM**
   - Server uses **NPM**

2. **Database**: MongoDB Atlas (cloud) or local MongoDB

3. **No Email Service Currently Active**: Nodemailer mentioned in README but not implemented in code

4. **Slug-based Blog URLs**: Blogs use SEO-friendly slugs instead of ObjectIds

5. **Visit Tracking**: Each blog view increments the `visits` counter

---

_Report generated by Dhruv Dankhara_
