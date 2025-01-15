import { MainContent } from "../main";
import { MyContext } from "../App";
import { Slider } from "../components/slider";
import "../styles/slider.css";
import { useState, useEffect, useCallback, useContext, memo } from "react";

function Videopage() {
  const { query, order } = useContext(MyContext);

  const [videoType, setVideoType] = useState("all");
  const [page, setPage] = useState(1);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [prevQuery, setPrevQuery] = useState(query);
  const [prevOrder, setPrevOrder] = useState(order);
  const [prevType, setPrevType] = useState(videoType);

  const apiKey = "47893918-d8d9d596b7cdac04fed7aca68";
  const apiUrl = "https://pixabay.com/api/videos/";

  useEffect(() => {
    if (query !== prevQuery) {
      setVideos([]);
      setPrevQuery(query);
    }
    if (order !== prevOrder) {
      setVideos([]);
      setPrevOrder(order);
    }
    if (videoType !== prevType) {
      setVideos([]);
      setPrevType(videoType);
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
    [videos, loading, page, query]
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
  }, [videos, query, page, observerCallback]);

  useEffect(() => {
    const fetchvideos = async (query, page) => {
      try {
        setError(false);
        setLoading(true);
        const response = await fetch(
          `${apiUrl}?key=${apiKey}&q=${query}&order=${order}&image_type=${videoType}&page=${page}&per_page=12`
        );

        if (response.ok) {
          const data = await response.json();
          if (data.totalHits > 0) {
            setVideos((prev) => {
              const existingIds = new Set(prev.map((video) => video.id));
              const uniquevideos = data.hits.filter(
                (video) => !existingIds.has(video.id)
              );
              return [...prev, ...uniquevideos];
            });
          } else {
            setVideos([]);
            setError(true);
            throw new Error("no more videos");
          }
        } else {
          throw new Error("Failed to fetch videos");
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

    fetchvideos(query, page);
  }, [page, query, videoType, order]);

  return (
    <>
      <Slider
        slider_items={[
          { text: "Videos" },
          { text: "Backgrounds" },
          { text: "Fashion" },
          { text: "Nature" },
          { text: "Science" },
          { text: "Education" },
          { text: "Feelings" },
          { text: "Health" },
          { text: "People" },
          { text: "Religion" },
          { text: "Places" },
          { text: "Animals" },
          { text: "Industry" },
          { text: "Computer" },
          { text: "Food" },
          { text: "Sports" },
          { text: "Transportation" },
          { text: "Travel" },
          { text: "Buildings" },
          { text: "Business" },
          { text: "Music" },
        ]}
      />
      <MainContent
        data={{ apiKey, apiUrl, page }}
        items={videos}
        type={"video"}
        loading={loading}
        error={error}
      />
    </>
  );
}

const MemoizedVideopage = memo(Videopage);

export { MemoizedVideopage as Videopage };
