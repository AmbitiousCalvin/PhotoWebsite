import { Icon } from "./general";
import { useNavigate } from "react-router-dom";

function PhotoItem({ photos, data }) {
  const navigate = useNavigate();

  // for (let photo of photos) {
  //   photo.tags = photo.tags.split(",").splice(0, 3).join(", ");
  // }

  const calculateSpan = (photoHeight, photoWidth, rowHeight = 10) => {
    const aspectRatio = photoHeight / photoWidth;
    return Math.ceil(aspectRatio * rowHeight);
  };

  const formatViews = (views) => {
    if (views > 1000000) return `${(views / 1000000).toFixed(2)}m`;
    if (views > 1000) return `${(views / 1000).toFixed(1)}k`;
    return views;
  };

  const downloadImage = async (url) => {
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
    photo
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
      item: photo,
    };
    navigate("/preview", { state: obj });
  }

  return (
    <div className="grid-container">
      {photos.map((photo, index) => {
        const rowSpan = calculateSpan(
          photo.webformatHeight,
          photo.webformatWidth
        );
        return (
          <div
            onClick={() =>
              handleNavigate(
                "photo",
                photo.user,
                photo.userImageURL,
                photo.tags,
                photo.webformatURL,
                photo.likes,
                false,
                index,
                photo
              )
            }
            key={photo.webformatURL}
            className={`grid-item grid-item-${index}`}
            id={index}
            style={{
              gridRowEnd: `span ${rowSpan}`,
              aspectRatio: `${photo.webformatWidth} / ${photo.webformatHeight}`,
            }}
          >
            <div className="author-info-mini">
              <div className="author-name-container">
                {photo.userImageURL && (
                  <div className="image-container">
                    <img
                      className="author-image"
                      src={photo.userImageURL}
                      alt={photo.user}
                    />
                  </div>
                )}

                <a
                  href={`https://pixabay.com/users/${photo.user}-${photo.user_id}/`}
                  className="author-name"
                >
                  {photo.user}
                </a>
              </div>
              <div className="photo-status">
                Views: {formatViews(photo.views)}
              </div>
            </div>

            <img
              loading={index <= 15 ? "eager" : "lazy"}
              className="main-img"
              src={photo.webformatURL}
              alt={photo.tags}
              onLoad={() => handleImageLoad(index)}
            />

            <div className="overlay">
              <div className="author-info">
                <div className="author-name-container">
                  {photo.userImageURL && (
                    <div className="image-container">
                      <img
                        className="author-image"
                        src={photo.userImageURL}
                        alt={photo.user}
                      />
                    </div>
                  )}

                  <a
                    href={`https://pixabay.com/users/${photo.user}-${photo.user_id}/`}
                    className="author-name"
                  >
                    {photo.user}
                  </a>
                </div>
                <div className="photo-status">
                  Views: {formatViews(photo.views)}
                </div>
              </div>

              <div className="photo-info">
                <div className="photo-tags">
                  <p>{photo.tags.split(",").splice(0, 3).join(", ")}</p>
                </div>
                <div
                  className="download-btn"
                  onClick={() => downloadImage(photo.fullHDURL)}
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

export { PhotoItem };
