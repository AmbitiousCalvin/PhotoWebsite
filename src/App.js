import "./styles/styles.css";
import "./styles/loading.css";
import "./styles/slider.css";
import "./styles/error.css";

import { Header } from "./components/header";
import { Preview } from "./pages/Preview";
import { InitialLoading } from "./components/loading";
import { ScrollToTopButton } from "./components/ScrollToTopBtn";
import ScrollToTop from "./components/ScrollToTop";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { createContext, useState, useMemo, useEffect } from "react";
import { lazy, Suspense } from "react";

export const MyContext = createContext(null);

// Lazy load the pages
const Homepage = lazy(() =>
  import("./pages/Homepage").then((module) => ({ default: module.Homepage }))
);
const Videopage = lazy(() =>
  import("./pages/Videopage").then((module) => ({ default: module.Videopage }))
);
const NotFoundpage = lazy(() =>
  import("./pages/NotFound").then((module) => ({
    default: module.NotFoundpage,
  }))
);

const popularPhotoQueries = [
  "nature",
  "landscape",
  "sunset",
  "cityscape",
  "mountains",
  "beach",
  "forest",
  "animals",
  "people",
  "travel",
  "food",
  "flowers",
  "sky",
  "water",
  "architecture",
  "sunrise",
  "ocean",
  "trees",
  "urban",
  "vintage",
  "fall",
  "snow",
  "abstract",
  "technology",
  "fitness",
  "art",
];

export default function App() {
  const randomQuery = Math.floor(Math.random() * popularPhotoQueries.length);
  const [query, setQuery] = useState(popularPhotoQueries[randomQuery]);
  const [order, setOrder] = useState("popular");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 750);

    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleSubmit = (query, order = "popular", noScroll = false) => {
    setIsLoading(true);
    navigate("/photos");

    if (!noScroll) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    setQuery(query);
    if (order !== "") setOrder(order);
  };

  const contextValue = useMemo(
    () => ({ handleSubmit, order, query }),
    [query, order]
  );

  return (
    <MyContext.Provider value={contextValue}>
      {isLoading && <InitialLoading />}
      <ScrollToTopButton />
      <ScrollToTop />
      <Header />

      <Suspense fallback={<InitialLoading />}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/photos" element={<Homepage />} />
          <Route path="/video" element={<Videopage />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="*" element={<NotFoundpage />} />
        </Routes>
      </Suspense>
    </MyContext.Provider>
  );
}
