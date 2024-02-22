import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import AboutPage from "./routes/About.tsx";
import ErrorPage from "./pages/Error.tsx";
import Root from "./routes/Root.tsx";
import HomePage from "./routes/Home.tsx";
import BlogPage from "./routes/Blog.tsx";
import ProjectsPage from "./routes/Projects.tsx";
import ContactPage from "./routes/Contact.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/blog",
        element: <BlogPage />,
      },
      {
        path: "/projects",
        element: <ProjectsPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      }
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
