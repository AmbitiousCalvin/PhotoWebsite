import "./styles/styles.css";
import { Header } from "./header";
import { MainContent } from "./main";
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
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(popularPhotoQueries[randomQuery]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleSubmit(query: SetStateAction<string>) {
    setQuery(query);
    setPhotos([]);
    setPage(1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const observerCallback = useCallback(
    (entries: any, observer: { unobserve: (arg0: any) => void }) => {
      console.log("observer ", photos);

      for (let entry of entries) {
        if (entry.isIntersecting && !loading) {
          console.log("Setting page to:", page + 1);
          setPage((prevPage) => prevPage + 1);
          observer.unobserve(entry.target);
        }
      }
    },
    [query, loading, page]
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, options);
    const lastItem = document.querySelector(".grid-item:nth-last-child(1)");

    if (lastItem) {
      observer.observe(lastItem);
    }

    return () => {
      if (lastItem) observer.unobserve(lastItem);
    };
  }, [photos, query, observerCallback]);

  useEffect(() => {
    const fetchPhotos = async (query: SetStateAction<string>, page) => {
      try {
        setLoading(true);
        const response = await fetch(
          `${apiUrl}?key=${apiKey}&q=${query}&image_type=photo&page=${page}&per_page=20`
        );

        if (response.ok) {
          const data = await response.json();
          setPhotos((prev) => {
            const existingIds = new Set(prev.map((photo) => photo.id));
            const uniquePhotos = data.hits.filter(
              (photo) => !existingIds.has(photo.id)
            );
            return [...prev, ...uniquePhotos];
          });
        } else {
          throw new Error("Failed to fetch photos");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    console.log(page);
    fetchPhotos(query, page);
  }, [page, query]);

  return (
    <>
      <Header onSubmit={handleSubmit} />
      <MainContent
        photos={photos}
        query={query}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </>
  );
}
