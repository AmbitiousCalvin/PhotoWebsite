import { MainContent } from "./main";
import "./styles/slider.css";
import {
  useState,
  useEffect,
  useCallback,
  SetStateAction,
  useRef,
} from "react";
import { InputContainer, DropDown, DropDownListItem, Icon } from "./components/general";

function Videopage({ handleSubmit, query, order }) {
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
    (entries: any, observer: { unobserve: (arg0: any) => void }) => {
      console.log("observer ", videos);

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
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(observerCallback, options);
    const lastItem = document.querySelector(".grid-item:nth-last-child(1)");

    if (lastItem) {
      observer.observe(lastItem);
    }

    return () => {
      if (lastItem) observer.unobserve(lastItem);
    };
  }, [videos, query, page, observerCallback]);

  useEffect(() => {
    const fetchvideos = async (query: SetStateAction<string>, page) => {
      try {
        setError(false);
        setLoading(true);
        const response = await fetch(
          `${apiUrl}?key=${apiKey}&q=${query}&order=${order}&image_type=${videoType}&page=${page}&per_page=15`
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
        handleSubmit={handleSubmit}
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
        items={videos}
        type={"video"}
        query={query}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </>
  );
}

function Slider(props: {
  slider_items: any[];
  handleSubmit: (arg0: any) => void;
}) {
  const sliderRef = useRef();
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const firstInputRef = useRef(null);

  // Automatically check the first input on render
  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.checked = true;
    }
  }, []);

  const updateButtonVisibility = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scrollableWidth = slider.scrollWidth - slider.clientWidth;
    setIsAtStart(slider.scrollLeft <= 0);
    setIsAtEnd(slider.scrollLeft >= scrollableWidth - 1);
  };

  const scrollLeft = () => {
    const slider = sliderRef.current;
    const scrollAmount = slider.clientWidth / 2;
    slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    const slider = sliderRef.current;
    const scrollAmount = slider.clientWidth / 2;
    slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  useEffect(() => {
    const handleResize = () => {
      updateButtonVisibility();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  return (
    <div className="slider-container">
      {!isAtStart && (
        <button
          className="icon slider-button left"
          id="left"
          onClick={scrollLeft}
        >
          <Icon class="fa-solid fa-chevron-left" />
        </button>
      )}

      <div
        className="slider-content"
        ref={sliderRef}
        onScroll={updateButtonVisibility}
      >
        {props.slider_items.map((item, index) => (
          <>


            <label
              onClick={() => item.value ? item.onClick(item.value) : props.handleSubmit(item.text)}
              htmlFor={`slider-item-${index}`}
              className="btn btn-border btn-square slider-item"
              key={index}
            >
              {item.text}
              <input
                ref={index === 0 ? firstInputRef : null} id={`slider-item-${index}`}
                type="radio"
                name="same-raido-btn"
                className="slider-radio"
                style={{ display: "none", }}
              />
            </label>

          </>
        ))}
      </div>

      {!isAtEnd && (
        <button
          className="icon slider-button right"
          id="right"
          onClick={scrollRight}
        >
          <Icon class="fa-solid fa-chevron-right" />
        </button>
      )}
    </div>
  );
}

export { Videopage };
