import "./styles/styles.css";
import "./styles/loading.css";
import "./styles/error.css";

import { Homepage } from "./Homepage";
import { Videopage } from "./Videopage";
import { Header } from "./components/header";
import { InitialLoading } from "./components/loading";
import ScrollToTop from "./components/ScrollToTop";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  createContext,
  useState,
  SetStateAction,
  useMemo,
  useEffect,
} from "react";
export const MyContext = createContext(null);

const apiKey = "47893918-d8d9d596b7cdac04fed7aca68";
const apiUrl = "https://pixabay.com/api/";

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
        {isLoading && <InitialLoading />}
        <ScrollToTop />
        <Header />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/photos" element={<Homepage />} />

          <Route path="/video" element={<Videopage />} />
        </Routes>
      </MyContext.Provider>
    </>
  );
}
