import { MainContent } from "../main";
import { Icon } from "../components/general";
import { Slider } from "../components/slider";
import { MyContext } from "../App";
import "../styles/slider.css";
import { useState, useEffect, useCallback, useContext, memo } from "react";

function Homepage() {
  const { query, order } = useContext(MyContext);
  const [imageType, setImageType] = useState("all");

  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [prevQuery, setPrevQuery] = useState(query);
  const [prevOrder, setPrevOrder] = useState(order);
  const [prevType, setPrevType] = useState(imageType);

  const apiKey = "47893918-d8d9d596b7cdac04fed7aca68";
  const apiUrl = "https://pixabay.com/api/";

  useEffect(() => {
    if (query !== prevQuery) {
      setPhotos([]);
      setPrevQuery(query);
    }
    if (order !== prevOrder) {
      setPhotos([]);
      setPrevOrder(order);
    }
    if (imageType !== prevType) {
      setPhotos([]);
      setPrevType(imageType);
    }
  });

  const observerCallback = useCallback(
    (entries, observer) => {
      for (let entry of entries) {
        if (entry.isIntersecting && !loading) {
          setPage((prevPage) => prevPage + 1);
          observer.unobserve(entry.target);
        }
      }
    },
    [photos, loading, page, query]
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15,
    };

    setTimeout(() => {
      const observer = new IntersectionObserver(observerCallback, options);
      const lastItem = document.querySelector(".grid-item:last-child");

      if (lastItem) {
        observer.observe(lastItem);
      }
    }, 750);

    return () => {
      const observer = new IntersectionObserver(observerCallback, options);
      const lastItem = document.querySelector(".grid-item:last-child");
      if (lastItem) observer.unobserve(lastItem);
    };
  }, [photos, query, page, observerCallback]);

  useEffect(() => {
    const fetchPhotos = async (query, page) => {
      try {
        setError(false);
        setLoading(true);
        const response = await fetch(
          `${apiUrl}?key=${apiKey}&q=${query}&order=${order}&image_type=${imageType}&page=${page}&per_page=15`
        );

        if (response.ok) {
          const data = await response.json();
          if (data.totalHits > 0) {
            setPhotos((prev) => {
              const existingIds = new Set(prev.map((photo) => photo.id));
              const uniquePhotos = data.hits.filter(
                (photo) => !existingIds.has(photo.id)
              );
              return [...prev, ...uniquePhotos];
            });
          } else {
            setVideos([]);
            setError(true);
            throw new Error("no more photos");
          }
        } else {
          throw new Error("Failed to fetch photos");
        }
      } catch (error) {
        console.log(error.message);
        setError(true);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchPhotos(query, page);
  }, [page, query, imageType, order]);

  return (
    <>
      <Slider
        slider_items={[
          { text: "Photos" },
          { text: "Illustrations" },
          { text: "Vector" },
          { text: "Wallpapers" },
          { text: "Nature" },
          { text: "3D Renders" },
          {
            text: "Architecture & Interiors",
          },
          { text: "Film" },
          { text: "Experimental" },
          { text: "Fashion & Beauty" },
          { text: "People" },
          { text: "Food & Drink" },
          { text: "Archival" },
          { text: "Animals" },
          { text: "Textures & Patterns" },
          { text: "Health & Wellness" },
          { text: "Spirituality" },
          { text: "Sports" },
          { text: "Street Photography" },
          { text: "Business & Work" },
          { text: "Current Events" },
        ]}
      />
      <MainContent
        data={{ apiKey, apiUrl, page }}
        items={photos}
        type={"photo"}
        loading={loading}
        error={error}
      />
    </>
  );
}

const MemoizedHomepage = memo(Homepage);

export { MemoizedHomepage as Homepage };
