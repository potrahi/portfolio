import { Link, Outlet } from "react-router-dom";

import "./Root.css";

export default function Root() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/projects">Projects</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
