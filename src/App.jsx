import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "./components/Layout";
import Footer from "./components/Footer";


const Home       = lazy(() => import("./pages/Home"));
const Projects   = lazy(() => import("./pages/Projects"));
const About      = lazy(() => import("./pages/About"));
const Contact    = lazy(() => import("./pages/Contact"));
const Experience = lazy(() => import("./pages/Experience"));
const Blog = lazy(() => import("./pages/Blog"));
export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="h-screen grid place-items-center text-gray-200">Loading…</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="projects"   element={<Projects />} />
            <Route path="about"      element={<About />} />
            <Route path="contact"    element={<Contact />} />
            <Route path="experience" element={<Experience />} />
            <Route path="blog" element={<blog />} />
            <Route path="*"          element={<Home />} />
          </Route>
        </Routes>
      </Suspense>

      {/* site‑wide footer */}
      <Footer />
    </BrowserRouter>
  );
}
