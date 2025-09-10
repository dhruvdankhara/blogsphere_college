function Logo() {
  return (
    <h1
      className="select-none text-2xl font-extrabold tracking-tight text-gray-100 md:text-3xl"
      style={{ fontFamily: '"Poppins", "Inter", system-ui, sans-serif' }}
    >
      <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">
        Blog
      </span>
      <span className="ml-1 rounded bg-gray-800/70 px-1.5 py-0.5 font-semibold text-blue-300 shadow-inner shadow-black/30 ring-1 ring-gray-700/60">
        Sphere
      </span>
    </h1>
  );
}

export default Logo;
