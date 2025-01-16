import { MainContent } from "../main";
import defaultUserProfile from "../images/user.png";
import { Slider } from "../components/slider";
import { InitialLoading } from "../components/loading";
import { NotFoundpage } from "./NotFound";
import ErrorComponent from "../components/ErrorPage";
import {
  InputContainer,
  DropDown,
  DropDownListItem,
  Icon,
} from "../components/general";
import { useState, useEffect, useContext, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import "../styles/preview-page.css";
import { MyContext } from "../App";
import { PhotoItem } from "../components/PhotoItem";

function Preview() {
  const { handleSubmit, query, order } = useContext(MyContext);

  const [isLoading, setIsLoading] = useState(true);
  const [isFalse, setIsFalse] = useState(false);

  const location = useLocation();
  const {
    type,
    username,
    userImage,
    alt,
    src,
    likes,
    videoSrc,
    data = {},
    index,
    item = {},
  } = location.state || {};

  const apiKey = "47893918-d8d9d596b7cdac04fed7aca68";
  let apiUrl;

  if (type === "photo") {
    apiUrl = `https://pixabay.com/api/`;
  } else if (type === "video") {
    apiUrl = `https://pixabay.com/api/videos/`;
  }

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 435);
  const [newPage, setNewPage] = useState(1);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 750);

    return () => clearTimeout(timer);
  }, [isLoading]);

  useEffect(() => {
    if (index !== undefined) {
      setIsLoading(true);
      setItems((prevItems) => {
        const newArr = prevItems.slice(index + 1);
        return newArr;
      });
    }
  }, [index]);

  const observerCallback = useCallback(
    (entries, observer) => {
      for (let entry of entries) {
        if (entry.isIntersecting && !loading) {
          console.log("page", newPage);
          setNewPage((prev) => prev + 1);
          observer.unobserve(entry.target);
        }
      }
    },
    [items, loading, newPage, query]
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "200px",
      threshold: 0,
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
  }, [items, query, newPage, observerCallback]);

  useEffect(() => {
    const fetchPhotos = async (query, newPage) => {
      try {
        setError(false);
        setLoading(true);
        const response = await fetch(
          `${apiUrl}?key=${apiKey}&q=${query}&order=${order}&page=${newPage}&per_page=15`
        );

        if (response.ok) {
          const data = await response.json();
          console.log("inside fetch, data= ", data);

          if (data.totalHits > 0) {
            setItems((prev) => {
              const existingIds = new Set(prev.map((Items) => Items.id));
              const uniqueItemss = data.hits
                .filter((Items) => !existingIds.has(Items.id))
                .slice(index + 1);
              return [...prev, ...uniqueItemss];
            });
          } else {
            setItems([]);
            setError(true);
            throw new Error(`no more ${type}s`);
          }
        } else {
          throw new Error(`Failed to fetch ${type}`);
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

    fetchPhotos(query, newPage);
  }, [newPage, query, order]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 435);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function formatLikes(likes) {
    if (likes > 1000000) return `${(likes / 1000000).toFixed(2)}m`;
    if (likes > 1000) return `${(likes / 1000).toFixed(1)}k`;
    return likes;
  }

  const likeCount = formatLikes(likes);
  const avatarImage = userImage || defaultUserProfile;
  const imageSrc = src;

  return (
    <>
      {isLoading && <InitialLoading />}
      {isFalse && (
        <NotFoundpage
          title={"No Image selected."}
          message={`Please head back to the homepage and pick an image to preview.`}
        />
      )}
      {!isLoading && !isFalse && (
        <div className="preview-page">
          <div className="preview-container">
            <div className="preview-header">
              {isMobile ? (
                <>
                  <IconContainer
                    type={type}
                    item={item}
                    likeCount={likeCount}
                    hideText={true}
                  />
                </>
              ) : (
                <>
                  <UserContainer avatar={avatarImage}>
                    <UserDetails username={username}></UserDetails>
                  </UserContainer>
                  <IconContainer
                    type={type}
                    item={item}
                    likeCount={likeCount}
                  />
                </>
              )}
            </div>
            <ImgSlider
              alt={alt}
              src={imageSrc}
              type={type}
              videoSrc={videoSrc}
            />
            {isMobile && (
              <div className="flex-row">
                <UserContainer avatar={avatarImage}>
                  <p className="user-name">{username}</p>{" "}
                </UserContainer>
                <div className="btn btn-square btn-white">Follow</div>
              </div>
            )}
            <div className="flex-row more-info-container">
              <div className="flex-column">
                <div className="flex-row display-flex more-info-text">
                  <Icon class="fa-regular fa-circle-check" />
                  Free to use
                </div>
                <div className="flex-row display-flex more-info-text">
                  Credit: Pixabay API.
                </div>
              </div>
              <div className="flex-row " style={{ gap: "1rem" }}>
                <IconButton
                  iconClass="fa-solid fa-circle-info"
                  text="More Info"
                />
                <IconButton
                  iconClass="fa-regular fa-share-from-square"
                  text="Share"
                />
              </div>
            </div>
            <div className="flex-row tags-container">
              <h1>Tags:</h1>
              <br />
              {alt &&
                alt.split(",").map((item, index) => (
                  <div
                    key={index}
                    className="btn btn-border btn-square btn-border-hover"
                  >
                    {item.trim()}
                  </div>
                ))}
            </div>
          </div>

          <Slider
            slider_items={[
              { text: `${type === "photo" ? "Photos" : "Videos"}` },
              { text: "Nature" },
              { text: "Travel" },
              { text: "Adventure" },
              { text: "Food" },
              { text: "Music" },
              { text: "Art" },
              { text: "Love" },
              { text: "Beauty" },
              { text: "Sports" },
              { text: "Fitness" },
              { text: "Technology" },
              { text: "Fashion" },
              { text: "Animals" },
              { text: "Architecture" },
              { text: "Landscape" },
              { text: "Nightlife" },
              { text: "Events" },
              { text: "Holidays" },
              { text: "Lifestyle" },
              { text: "Science" },
              { text: "History" },
              { text: "Family" },
              { text: "Culture" },
              { text: "People" },
              { text: "Urban" },
            ]}
          />
          <MainContent
            items={items}
            type={type}
            loading={loading}
            error={error}
          />
        </div>
      )}
    </>
  );
}

function UserContainer(props) {
  return (
    <div className="user-container">
      {props.avatar && (
        <div className="user-avatar-container">
          <img src={props.avatar} alt="User Avatar" className="user-avatar" />
        </div>
      )}
      {props.children}
    </div>
  );
}

function IconContainer(props) {
  async function downloadItem(url) {
    try {
      const res = await fetch(url);
      const blob = await res.blob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = crypto.randomUUID();
      link.click();
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  }

  const item = props.item;

  return (
    <div className="icon-container">
      <IconButton iconClass="fa-regular fa-bookmark" className="bookmark-btn" />
      <IconButton
        iconClass="fa-regular fa-heart"
        text="Like"
        count={props.likeCount}
        className="like-btn"
        hideText={props.hideText}
      />
      <div className="btn btn-square dropdown-item preview-download-btn">
        <div className="text-section">Download</div>
        <div className="display-flex text-section icon-section">
          <Icon class="fa-solid fa-angle-right" />
        </div>

        <DropDown default={true}>
          {props.type === "photo" && (
            <DropDownListItem onClick={() => downloadItem(item.fullHDURL)}>
              {item.imageWidth}x{item.imageHeight}
            </DropDownListItem>
          )}

          {props.type === "video" && (
            <>
              <DropDownListItem
                onClick={() => downloadItem(item.videos.large.url)}
              >
                Large: {item.videos.large.width}x{item.videos.large.height}
              </DropDownListItem>
              <DropDownListItem
                onClick={() => downloadItem(item.videos.medium.url)}
              >
                Medicum: {item.videos.medium.width}x{item.videos.medium.height}
              </DropDownListItem>
              <DropDownListItem
                onClick={() => downloadItem(item.videos.small.url)}
              >
                Small: {item.videos.small.width}x{item.videos.small.height}
              </DropDownListItem>
              <DropDownListItem
                onClick={() => downloadItem(item.videos.tiny.url)}
              >
                Tiny: {item.videos.tiny.width}x{item.videos.tiny.height}
              </DropDownListItem>
            </>
          )}
        </DropDown>
      </div>
    </div>
  );
}

function ImgSlider(props) {
  const videoRef = useRef(null);

  function handleLoadedData() {
    if (!videoRef.current) return;
    videoRef.current.play();
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!videoRef.current) return; // Ensure the video element exists

      const video = videoRef.current;

      switch (event.key.toLowerCase()) {
        case " ": // Spacebar
        case "k": // Toggle play/pause
          event.preventDefault(); // Prevent the default scroll action for Spacebar
          if (video.paused) {
            video.play();
          } else {
            video.pause();
          }
          break;

        default:
          break;
      }
    };

    // Add event listener for keydown
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={`img-slider`}>
      {/* <button className="icon slider-button left">
        <Icon class="fa-solid fa-chevron-left" />
      </button> */}
      {props.videoSrc && (
        <video
          ref={videoRef}
          onLoadedData={handleLoadedData}
          className="video-element"
          autoplay
          controls
          src={props.videoSrc}
        ></video>
      )}
      {props.src && <img alt={props.alt} src={props.src} />}
      {/* <button className="icon slider-button right">
        <Icon class="fa-solid fa-chevron-right" />
      </button> */}
    </div>
  );
}

function UserDetails({ username }) {
  function onFollow() {
    alert("This would allow you to follow the User");
  }

  function onDonate() {
    alert("This would allow you to donate to the User");
  }

  return (
    <div className="flex-column">
      <p className="user-name">{username}</p>
      <div className="links">
        <a href="#follow" className="link" onClick={onFollow}>
          Follow
        </a>
        <span className="circle">•</span>
        <a href="#donate" className="link" onClick={onDonate}>
          Donate
        </a>
      </div>
    </div>
  );
}

function IconButton({
  iconClass,
  text,
  count,
  hideText = false,
  className = "",
}) {
  return (
    <div className={`btn btn-border btn-square btn-border-hover ${className}`}>
      <Icon class={iconClass}></Icon>
      {!hideText && text && ` ${text}`} {count !== undefined && count}
    </div>
  );
}

export { Preview };
