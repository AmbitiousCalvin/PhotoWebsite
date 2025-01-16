import { Icon } from "./general";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function VideoItem({ videos, data }) {
  const navigate = useNavigate();

  const calculateSpan = (videoHeight, videoWidth, rowHeight = 10) => {
    const aspectRatio = videoHeight / videoWidth;
    return Math.ceil(aspectRatio * rowHeight);
  };

  function formatViews(views) {
    if (views > 1000000) return `${(views / 1000000).toFixed(2)}m`;
    if (views > 1000) return `${(views / 1000).toFixed(1)}k`;
    return views;
  }

  const downloadImage = async (url) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = crypto.randomUUID();
      link.click();
    } catch (error) {
      console.error("Error downloading the video:", error);
    }
  };

  function handleImageLoad(index) {
    const gridItem = document.querySelector(`.grid-item-${index}`);
    gridItem.classList.remove("loading");
  }

  function handleNavigate(
    type,
    username,
    userImage,
    alt,
    src,
    likes,
    videoSrc,
    index,
    video
  ) {
    let obj = {
      type,
      username,
      userImage,
      alt,
      src,
      likes,
      videoSrc,
      data,
      index,
      item: video,
    };
    navigate("/preview", { state: obj });
  }

  return (
    <div className="grid-container">
      {videos.map((video, index) => {
        const rowSpan = calculateSpan(
          video.videos.tiny.width,
          video.videos.tiny.height
        );
        return (
          <div
            onClick={() =>
              handleNavigate(
                "video",
                video.user,
                video.userImageURL,
                video.tags,
                "",
                video.likes,
                video.videos.large.url,
                index,
                video
              )
            }
            key={video.videos.tiny.thumbnail}
            className={`grid-item grid-item-${index} loading`}
            id={index}
          >
            <div className="author-info-mini">
              <div className="author-name-container">
                {video.userImageURL && (
                  <div className="image-container">
                    <img
                      className="author-image"
                      src={video.userImageURL}
                      alt={video.user}
                    />
                  </div>
                )}

                <a
                  href={`https://pixabay.com/users/${video.user}-${video.user_id}/`}
                  className="author-name"
                >
                  {video.user}
                </a>
              </div>
              <div className="photo-status">
                Views: {formatViews(video.views)}
              </div>
            </div>

            <img
              loading={index <= 15 ? "eager" : "lazy"}
              className="main-img"
              src={video.videos.tiny.thumbnail}
              alt={video.tags}
              onLoad={() => handleImageLoad(index)}
            />

            <Icon class={"fa-solid fa-video position-center icon play-icon"} />

            <div className="overlay">
              <div className="author-info">
                <div className="author-name-container">
                  {video.userImageURL && (
                    <div className="image-container">
                      <img
                        className="author-image"
                        src={video.userImageURL}
                        alt={video.user}
                      />
                    </div>
                  )}

                  <a
                    href={`https://pixabay.com/users/${video.user}-${video.user_id}/`}
                    className="author-name"
                  >
                    {video.user}
                  </a>
                </div>
                <div className="photo-status">
                  Views: {formatViews(video.views)}
                </div>
              </div>

              <div className="photo-info">
                <div className="photo-tags">
                  <p>{video.tags.split(",").splice(0, 3).join(", ")}</p>
                </div>
                <div
                  className="download-btn"
                  onClick={() => downloadImage(video.videos.large.url)}
                >
                  <Icon class={"fa-solid fa-download"} />
                  Download
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { VideoItem };
