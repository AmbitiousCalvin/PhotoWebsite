import { MainContent } from "../main";
import defaultUserProfile from "../images/user.png";
import { Slider } from "../components/slider";
import { InitialLoading } from "../components/loading";

import {
  InputContainer,
  DropDown,
  DropDownListItem,
  Icon,
} from "../components/general";
import { useState, useEffect, useContext, useCallback } from "react";
import { useLocation } from "react-router-dom";
import "../styles/preview-page.css";
import { MyContext } from "../App";
import { PhotoItem } from "../components/PhotoItem";

function Preview() {
  const { handleSubmit, query, order } = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);

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
  } = location.state || {};

  const apiKey = "47893918-d8d9d596b7cdac04fed7aca68";
  let apiUrl =
    type === "photo"
      ? `https://pixabay.com/api/`
      : "https://pixabay.com/api/videos/";

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 435);
  const likeCount = likes;

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

  const avatarImage = userImage || defaultUserProfile;
  const imageSrc = src;

  return (
    <>
      {isLoading && <InitialLoading />}

      <div className="preview-page">
        <div className="preview-container">
          <div className="preview-header">
            {isMobile ? (
              <>
                <IconContainer likeCount={likeCount} hideText={true} />
              </>
            ) : (
              <>
                <UserContainer avatar={avatarImage}>
                  <UserDetails username={username}></UserDetails>
                </UserContainer>
                <IconContainer likeCount={likeCount} />
              </>
            )}
          </div>
          <ImgSlider alt={alt} src={imageSrc} type={type} videoSrc={videoSrc} />
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
      <div className="btn btn-square preview-download-btn">
        <div className="text-section">Download</div>
        <div className="display-flex text-section icon-section">
          <Icon class="fa-solid fa-angle-right" />
        </div>
      </div>
    </div>
  );
}

function ImgSlider(props) {
  return (
    <div className={`img-slider`}>
      {/* <button className="icon slider-button left">
        <Icon class="fa-solid fa-chevron-left" />
      </button> */}
      {props.videoSrc && (
        <video
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
