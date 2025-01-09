import "./styles/styles.css";
import "./styles/loading.css";

import { Homepage } from "./Homepage";
import { Header } from "./header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, useCallback, SetStateAction } from "react";

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
  "business",
  "fitness",
  "art",
  "sports",
  "car",
  "interior design",
  "coffee",
  "desert",
  "vacation",
  "birthday",
  "wedding",
  "fitness",
  "mountain bike",
  "wildlife",
  "children",
  "hiking",
  "coffee shop",
  "summer",
  "winter",
  "black and white",
  "night",
  "nightlife",
  "street",
  "fashion",
  "romantic",
];

export default function App() {
  const randomQuery = Math.floor(Math.random() * popularPhotoQueries.length);
  const [query, setQuery] = useState(popularPhotoQueries[randomQuery]);

  function handleSubmit(query: SetStateAction<string>) {
    console.log("Called from App", query);
    setQuery(query);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      <Router>
        <Header onSubmit={handleSubmit} />
        <Routes>
          <Route
            path="/"
            element={<Homepage handleSubmit={handleSubmit} query={query} />}
          />
        </Routes>
      </Router>
    </>
  );
}
