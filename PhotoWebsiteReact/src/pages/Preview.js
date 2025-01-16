import { MainContent } from "../main";
import defaultUserProfile from "../images/user.png";
import { Slider } from "../components/slider";
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

function Preview() {
  const { handleSubmit, query, order } = useContext(MyContext);

  const location = useLocation();
  const { username, userImage, src, alt, likes, index } = location.state || {};

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 435);
  const likeCount = likes;

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
    console.log(index);
    if (index !== undefined) {
      setPhotos((prevPhotos) => {
        const newArr = prevPhotos.slice(index + 1);
        return newArr;
      });
    }
  }, [index]);

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
      rootMargin: "100px",
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
        <ImgSlider alt={alt} src={imageSrc} />
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
            <IconButton iconClass="fa-solid fa-circle-info" text="More Info" />
            <IconButton
              iconClass="fa-regular fa-share-from-square"
              text="Share"
            />
          </div>
        </div>
      </div>

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
        items={photos}
        type={"photo"}
        loading={loading}
        error={error}
      />
    </div>
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
        <div
          className="text-section"
          onClick={() => alert("currently working")}
        >
          Download
        </div>
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
      <button className="icon slider-button left">
        <Icon class="fa-solid fa-chevron-left" />
      </button>
      {props.src && <img alt={props.alt} src={props.src} />}
      <button className="icon slider-button right">
        <Icon class="fa-solid fa-chevron-right" />
      </button>
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
