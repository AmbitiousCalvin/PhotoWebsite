import "./styles/styles.css";
import "./styles/loading.css";
import "./styles/error.css";

import { Homepage } from "./pages/Homepage.js";
import { Preview } from "./pages/Preview";
import { Videopage } from "./pages/Videopage";
import { NotFoundpage } from "./pages/NotFound";
import { Header } from "./components/header";
import { InitialLoading } from "./components/loading";
import { ScrollToTopButton } from "./components/ScrollToTopBtn";
import ScrollToTop from "./components/ScrollToTop";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useState, useMemo, useEffect } from "react";
export const MyContext = createContext(null);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 750);

    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleSubmit = (query, order) => {
    setIsLoading(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setQuery(query);
    if (order !== "") setOrder(order);
  };

  const contextValue = useMemo(
    () => ({ handleSubmit, order, query }),
    [query, order]
  );

  return (
    <>
      <MyContext.Provider value={contextValue}>
        {<ScrollToTopButton />}
        {isLoading && <InitialLoading />}
        <ScrollToTop />
        <Header />

        <Routes>
          {/* <Route path="/" element={<Homepage />} /> */}
          <Route path="/photos" element={<Homepage />} />
          <Route path="/video" element={<Videopage />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/" element={<NotFoundpage />} />
        </Routes>
      </MyContext.Provider>
    </>
  );
}
