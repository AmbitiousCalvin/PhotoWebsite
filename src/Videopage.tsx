import { MainContent } from "./main";
import { useState, useEffect, useCallback, SetStateAction } from "react";

const apiKey = "47893918-d8d9d596b7cdac04fed7aca68";
const apiUrl = "https://pixabay.com/api/videos/";

function Homepage({ handleSubmit, query }) {
  const [page, setPage] = useState(1);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [prevQuery, setPrevQuery] = useState(query);

  useEffect(() => {
    if (query !== prevQuery) {
      setVideos([]);
      setPrevQuery(query);
    }
  });

  const observerCallback = useCallback(
    (entries: any, observer: { unobserve: (arg0: any) => void }) => {
      console.log("observer ", videos);

      for (let entry of entries) {
        if (entry.isIntersecting && !loading) {
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
      threshold: 1,
    };

    const observer = new IntersectionObserver(observerCallback, options);
    const lastItem = document.querySelector(".grid-item:nth-last-child(1)");

    if (lastItem) {
      observer.observe(lastItem);
    }

    return () => {
      if (lastItem) observer.unobserve(lastItem);
    };
  }, [query, page, observerCallback]);

  useEffect(() => {
    const fetchvideos = async (query: SetStateAction<string>, page) => {
      try {
        setLoading(true);
        const response = await fetch(
          `${apiUrl}?key=${apiKey}&q=${query}&page=${page}&per_page=15`
        );

        if (response.ok) {
          const data = await response.json();
          setVideos((prev) => {
            const existingIds = new Set(prev.map((photo) => photo.id));
            const uniquevideos = data.hits.filter(
              (photo) => !existingIds.has(photo.id)
            );
            return [...prev, ...uniquevideos];
          });
        } else {
          throw new Error("Failed to fetch videos");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchvideos(query, page);
  }, [page, query]);

  return (
    <>
      <MainContent
        videos={videos}
        query={query}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </>
  );
}

export { Homepage };
